import React, { Component } from 'react';
import axios from 'axios';

import styles from './App.css';

import { connect } from 'react-redux';

import { authenticate } from './actions/authenticated'; 
import { getArtistTrackFeatures } from './actions/api';
import { setFilter } from './actions/filter';

import Search from './components/Search';
import List from './components/List';
import { SignIn, ArtistTitle } from './components/stateless';

class App extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.authenticate();
  }
  render(){
    return(
      <div >
        {!this.props.authenticated &&
          <SignIn />
        }
        {this.props.authenticated && 
          <Search 
            getArtistTrackFeatures={this.props.getArtistTrackFeatures}
          />
        }
        {this.props.artist &&
          <ArtistTitle 
            artist={this.props.artist}
          />
        }
        {this.props.tracks.length > 0 && 
          <List
            setFilter={this.props.setFilter}
            filter={this.props.filter}
            tracks={this.props.tracks}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    authenticated : state.authenticated,
    artist : state.artist,
    tracks : state.tracks,
    filter : state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate : () => {
      dispatch(authenticate());
    },
    getArtistTrackFeatures : (type, keyword) => {
      dispatch(getArtistTrackFeatures(type, keyword));
    },
    setFilter : (sortBy) => {
      dispatch(setFilter(sortBy));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);