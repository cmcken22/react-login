import {fromJS, toJS, List, Map} from 'immutable';
import { handleActions } from 'redux-actions'
import Actions from './../actions/Actions';
import * as formActions from './../actions/formActions';

const defaultState = fromJS({
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  newEmail: "",
  company: "",
  role: "",
  password: "",
  confirmedPassword: "",
  projects: "",
  newProject: {
    name: "",
    number: "",
    region: "",
    type: ""
  }
});

export const reducer = handleActions({

  // ...Actions.commonImmutableHandlers(formActions.commonImmutableActions),

  [formActions.formSetIn]: (state, action) => {
    return state.setIn(action.payload.keys, action.payload.value);
  },

  [formActions.setFormValue]: (state, action) => {
    return state.set(action.payload.key, action.payload.value);
  },

  [formActions.clearNewProject]: (state, actions) => {
    return state.set('newProject', Map({
      name: "", 
      number: "",
      region: "",
      type: ""
    }));
  }
  
}, defaultState)

export default reducer;