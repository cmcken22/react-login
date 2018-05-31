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
  projects: {},
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

  [formActions.clearNewProject]: (state, action) => {
    return state.set('newProject', Map({
      name: "", 
      number: "",
      region: "",
      type: ""
    }));
  },

  [formActions.addProject]: (state, action) => {
    if(typeof state.get('projects') === 'string') {
      return state.set('projects', [action.payload.value]);
    } else {
      return state.set('projects', [...state.get('projects'), action.payload.value]);
    }
  },

  [formActions.removeProject]: (state, action) => {
    let tempArray = state.get('projects');
    let index = tempArray.indexOf(action.payload.value);
    if(index === -1) {
      return state;
    }
    tempArray.splice(index, 1);
    return state.set('projects', tempArray);
  }
  
}, defaultState)

export default reducer;