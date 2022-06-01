import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch'

const store=configureStore({
  reducer:{
    user:userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  enhancers:[reduxBatch]
});

export default store;