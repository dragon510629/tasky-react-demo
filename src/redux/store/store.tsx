import { createStore, combineReducers } from 'redux';
import mainReducers from '../reducers/main';

const reducer = combineReducers({
  main : mainReducers,
})

export default createStore(reducer);