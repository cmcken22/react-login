import Actions from './Actions';

export const SET_FORM_VALUE = 'SET_FORM_VALUE';

export const init = () => (dispatch, getState) => {
  // dispatch(getCharacters());
}

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

export const commonImmutableActions = Actions.commonImmutable('form')
export const {
  set,
  setIn
} = commonImmutableActions