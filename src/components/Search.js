import React, { Component } from 'react';
import axios from 'axios';

export default class SongAnalyser extends Component{
  constructor(props){
    super(props);
    this.state={
      search : "",
    };
  }
  handleInput(event){
    this.setState({
      'search' : event.target.value
    });
  }
  handleClick(event){
    this.props.getArtistTrackFeatures('artist', this.state.search);
  }
  render(){
    return(
      <div>
        <label>Artist</label>
        <input
          onChange={(event) => this.handleInput(event)}
          type='text'
          value={this.state.artist}
        />
        <button
          onClick={() => this.handleClick()}
        >
          Get Artist Song Data
        </button>
      </div>
    );
  }
}