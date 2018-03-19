import axios from 'axios';
import { splitArrIntoLengths } from '../methods.js';

export function getArtistTrackFeatures(type, keyword){
  return (dispatch) => {
    axios.request({
      url : "/api/search",
      params : {
        type,
        q : keyword.replace(" ", "+"),
        limit : 1,
      }
    })
    .catch(err => {
      if (err) throw err;
    })
    .then(res => {
      dispatch({
        type : "SET_ARTIST",
        payload : res.data
      });
      
      //TODO: work around limits by sending multiple requests
      
      axios.request({
        url : '/api/artist/' + res.data.id + '/albums',
        params : {
          'album_type' :  'album',
          'limit' :  '20'
        }
      })
      .catch(err => {
        if(err) throw err;
      })
      .then(res => {
        //TODO: work around limits by sending multiple requests
        let albumIds = res.data.items.map(item => item.id).toString();
        axios.request({
          url : '/api/albums',
          params : {
            ids : albumIds
          }
        })
        .catch(err => {
          if(err) throw err;
        })
        .then(res => {
          dispatch({
            type : "SET_TRACKS",
            payload : {
              albums : res.data.albums,
            }
          });
          
          let trackIds = [];
          res.data.albums.forEach(album => {
            const albumTrackIds = album.tracks.items.map(track => track.id);
            trackIds = trackIds.concat(albumTrackIds);
          });
          const limitedTrackIds = splitArrIntoLengths(trackIds, 100);
          limitedTrackIds.forEach((trackIds, index) => {
            axios.request({
              url : '/api/audio-features',
              params : {
                ids : trackIds.toString()
              }
            })
            .catch(err => {
              if (err) throw err;
            })
            .then(res => {
              dispatch({
                type : "SET_TRACK_AUDIO_FEATURES",
                payload : {
                  audio_features : res.data.audio_features,
                  index : index,
                  isFinal : index === limitedTrackIds.length - 1,
                }
              });
            });
          });
        });
      });
    });
  };
}