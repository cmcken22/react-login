import Actions from './Actions';

export const SET_LOCATION = 'SET_LOCATION';

export const setLocation = Actions.creator(
  SET_LOCATION,
  (type, value) => Actions.createAction(type, {value})
)

// export const commonImmutableActions = Actions.commonImmutable('form')
// export const {
//   set,
//   setIn
// } = commonImmutableActions