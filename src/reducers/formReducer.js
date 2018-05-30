import {fromJS, toJS, List, Map} from 'immutable';
import { handleActions } from 'redux-actions'
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
  projects: ""
});

export const reducer = handleActions({

  [formActions.setFormValue]: (state, action) => {
    return state.set(action.payload.key, action.payload.value);
  }
  
}, defaultState)

export default reducer;