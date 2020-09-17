import { createStore, combineReducers, applyMiddleware } from 'redux';
import mainReducers from '../reducers/main';
import workspaceReducers from '../reducers/workspace';
import clientReducers from '../reducers/client';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../sagas';

const reducer = combineReducers({
  main : mainReducers,
  workspace : workspaceReducers,
  client: clientReducers,
})

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage: storage,
};

const pReducer = persistReducer(persistConfig, reducer);

export const store =  createStore(
  pReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga)

export const persistor = persistStore(store);

export default {store, persistor};