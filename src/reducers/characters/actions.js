// import { API_URL } from '../../constants';
const API_URL = "https://swapi.co/api";

export const SET_CHARACTERS = 'SET_CHARACTERS';

export function getCharacters() {
  return dispatch =>
    fetch(`${API_URL}/people`)
      .then(res => res.json())
      .then(res => res.results)
      .then(characters =>
        dispatch(setCharacters(characters))
      );
}

export function setCharacters(characters) {
  return {
    type: SET_CHARACTERS,
    characters,
  };
}