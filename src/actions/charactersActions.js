import Actions from './Actions';
const API_URL = 'https://swapi.co/api';

export const SET_CHARACTERS = 'SET_CHARACTERS';

export const init = () => (dispatch, getState) => {
  dispatch(getCharacters());
}

export const getCharacters = () => (dispatch, getState) => {
  return fetch(`${API_URL}/people`)
    .then(res => res.json())
    .then(res => res.results)
    .then(characters => {
      dispatch(setCharacters(characters));
    });
}

export const setCharacters = Actions.creator(
  SET_CHARACTERS,
  (type, value) => Actions.createAction(type, value)
)

export const commonImmutableActions = Actions.commonImmutable('characters')
export const {
  set,
  setIn
} = commonImmutableActions