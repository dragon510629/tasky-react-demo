import { createStore, combineReducers } from 'redux';
import mainReducers from '../reducers/main';
import workspaceReducers from '../reducers/workspace';
import clientReducers from '../reducers/client';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
  main : mainReducers,
  workspace : workspaceReducers,
  client: clientReducers,
})

const persistConfig = {
  key: 'root',
  storage: storage,
};

const pReducer = persistReducer(persistConfig, reducer);

export const store =  createStore(pReducer);
export const persistor = persistStore(store);

export default {store, persistor};