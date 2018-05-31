import Actions from './Actions';

export const SET_FORM_VALUE = 'SET_FORM_VALUE';
export const FORM_SET_IN = 'FORM_SET_IN';
export const CLEAR_NEW_PROJECT = 'CLEAR_NEW_PROJECT';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export const setFormByValue = (key, value) => (dispatch, getState) => {
  return new Promise(function(resolve, reject) {
    try {
      dispatch(setFormValue(key, value));
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
}

export const setFormValue = Actions.creator(
  SET_FORM_VALUE,
  (type, key, value) => Actions.createAction(type, {key, value})
)

export const formSetIn = Actions.creator(
  FORM_SET_IN,
  (type, keys, value) => Actions.createAction(type, {keys, value})
)

export const clearNewProject = Actions.creator(
  CLEAR_NEW_PROJECT
)

export const addProject = Actions.creator(
  ADD_PROJECT,
  (type, key, value) => Actions.createAction(type, {key, value})
)

export const removeProject = Actions.creator(
  REMOVE_PROJECT,
  (type, key, value) => Actions.createAction(type, {key, value})
)

// export const commonImmutableActions = Actions.commonImmutable('form')
// export const {
//   set,
//   setIn
// } = commonImmutableActions