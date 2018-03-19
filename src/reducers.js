import { audioFeatureSort } from './methods';

export const authenticated = (state={}, action) => {
  switch(action.type){
    case "AUTHENTICATE" : {
      state = true;
      break;
    }
    case "UNAUTHENTICATE" : {
      state = false;
      break;
    }
  }
  return state;
};

export const artist = (state={}, action) => {
  switch(action.type){
    case "SET_ARTIST" : {
      state = action.payload;
      break;
    }
  }
  return state;
};

export const filter = (state=[], action) => {
  switch(action.type){
    case "SET_FILTER" : {
      if(state.sortBy === action.payload){
        state = {
          sortBy : state.sortBy,
          reverse : !state.reverse
        };
      }else{
        state = {
          sortBy : action.payload,
          reverse : false
        };
      }
    }
    break;
  }
  return state;
};

export const tracks = (state=[], action) => {
  switch(action.type){
    case "SET_TRACKS" : {
      const albums = action.payload.albums;
      let trackData = [];
      albums.forEach(album => {
        const albumData = {
          name : album.name,
          release_date : album.release_date,
          image : album.images[2],
        };
        let albumTrackData = album.tracks.items.map(track => {
          return {
            album : albumData,
            id : track.id,
            name : track.name,
            track_number : track.track_number,
            disc_number : track.disc_number,
          };
        });
        trackData = trackData.concat(albumTrackData);
      });
      
      state = trackData;
      break;
    }
    case "SET_TRACK_AUDIO_FEATURES" : {
      let startIndex = action.payload.index * 100;
      let endIndex = startIndex + action.payload.audio_features.length;

      const addAudioFeatures = [...state.slice(startIndex, endIndex)].map((track, index) => {
        return(
          Object.assign(track, { audio_features : action.payload.audio_features[index]})  
        );
      });
      
      state = [
        ...state.slice(0, startIndex),
        ...addAudioFeatures,
        ...state.slice(endIndex)
      ];
      break;
    }
    case "SET_FILTER" : {
      let clone = Object.create(state);
      switch(action.payload){
        case "ALBUM" : {
          state = clone.sort((a, b) => {
            const dateDifference = 
              new Date(a.album.release_date).getTime() 
              - new Date(b.album.release_date).getTime();
              
            if(dateDifference === 0){
              const trackDifference = a.track_number - b.track_number;
              if(trackDifference === 0){
                return a.disc_number - b.disc_number;
              }else{
                return trackDifference;
              }
            }else{
              return dateDifference;
            }
          });
          break;
        }
        default : {
          state = audioFeatureSort(clone, action.payload.toLowerCase());
          break;
        }
      }
      break;
    }
  }
  return state;
};