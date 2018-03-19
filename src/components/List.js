import React, { Component } from 'react';

import styles from './List.css';
import { round, ellipses } from '../methods.js';

export default class List extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let tracks = this.props.tracks;
    if(this.props.filter.reverse){
      tracks = this.props.tracks.slice(0).reverse();
    }
    return(
      <div className={styles.list}>
        <div className={styles.flexContainerLabel}>
          <div className={styles.trackLabel}>
            Track
          </div>
          <div
            className={styles.trackLabel}
            style={this.props.filter.sortBy === "ALBUM" ? {color : 'red'} : {}}
            onClick={() => this.props.setFilter("ALBUM")}
          >
            Album
          </div>
          <div
            className={styles.featureLabel}
            style={this.props.filter.sortBy === "ACOUSTICNESS" ? {color : 'red'} : {}}
            onClick={() => this.props.setFilter("ACOUSTICNESS")}
          >
            Acousticness
          </div>
          <div
            className={styles.featureLabel}
            style={this.props.filter.sortBy === "INSTRUMENTALNESS" ? {color : 'red'} : {}}
            onClick={() => this.props.setFilter("INSTRUMENTALNESS")}
          >
            Instrumentalness</div>
          <div
            className={styles.featureLabel}
            style={this.props.filter.sortBy === "DANCEABILITY" ? {color : 'red'} : {}}
            onClick={() => this.props.setFilter("DANCEABILITY")}
          >
            Danceability</div>
          <div
            className={styles.featureLabel}
            style={this.props.filter.sortBy === "ENERGY" ? {color : 'red'} : {}}
            onClick={() => this.props.setFilter("ENERGY")}
          >
            Energy</div>
          <div
            className={styles.featureLabel}
            style={this.props.filter.sortBy === "VALENCE" ? {color : 'red'} : {}}
            onClick={() => this.props.setFilter("VALENCE")}
          >
            Valance</div>
        </div>
        {tracks.map((track, index) => {
          return(
            <Track
              key={index}
              track={track}
            />
          );
        })}
      </div>
    );
  }
}

const Track = (props) => {
  const { track } = props;
  const hasAudioFeatures = (track.hasOwnProperty('audio_features'));
  const features = track.audio_features;
  return(
    <div className={styles.flexContainer}>
      <div className={styles.track}>
        {ellipses(track.name, 25)}
      </div>
      <div className={styles.track}>
        {ellipses(track.album.name, 25)}
      </div>
      <div className={styles.feature}>
        {hasAudioFeatures ? round(features.acousticness * 10, 3) : ""} 
      </div>
      <div className={styles.feature}>
        {hasAudioFeatures ? round(features.instrumentalness * 10, 3) : ""}
      </div>
      <div className={styles.feature}>
        {hasAudioFeatures ? round(features.danceability * 10, 3) : ""}
      </div>
      <div className={styles.feature}>
        {hasAudioFeatures ? round(features.energy * 10, 3) : ""} 
      </div>
      <div className={styles.feature}>
        {hasAudioFeatures ? round(features.valence * 10, 3) : ""} 
      </div>
    </div>
  );
};