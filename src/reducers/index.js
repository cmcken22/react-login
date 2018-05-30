import { combineReducers } from 'redux';
import characters from './charactersReducer';
import form from './formReducer';

export default combineReducers({
  characters,
  form
});