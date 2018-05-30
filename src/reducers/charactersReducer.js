import {fromJS, toJS, List, Map} from 'immutable';
import { handleActions } from 'redux-actions'
import * as charactersActions from './../actions/charactersActions';

const defaultState = fromJS({
  characters: [],
});

export const reducer = handleActions({

  [charactersActions.setCharacters]: (state, action) => {
    return state.set('characters', action.payload);
  }
  
}, defaultState)

export default reducer;