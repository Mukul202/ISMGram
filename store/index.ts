import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import logger from 'redux-logger';

// const logger = require('redux-logger');

import { reduxBatch } from '@manaflair/redux-batch'

const store=configureStore({
  reducer:{
    user:userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  enhancers:[reduxBatch]
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch