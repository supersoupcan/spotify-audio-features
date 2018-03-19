import {createStore, combineReducers, applyMiddleware} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { authenticated, artist, tracks, filter } from './reducers';


export default createStore(
  combineReducers(
    {authenticated, artist, tracks, filter}
  ),
  {
    filter : {
      sortBy : "ALBUM",
      reverse : false,
    },
    authenticated : false,
    artist : null,
    tracks : [],
  },
  applyMiddleware(thunk, logger)
);