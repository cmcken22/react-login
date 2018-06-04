import { combineReducers } from 'redux';
import characters from './charactersReducer';
import form from './formReducer';
import location from './locationReducer';

export default combineReducers({
  location,
  characters,
  form,
});