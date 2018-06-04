import {fromJS, toJS, List, Map} from 'immutable';
import { handleActions } from 'redux-actions'
import Actions from './../actions/Actions';
import * as locationActions from './../actions/locationActions';

const defaultState = fromJS({
  currentCity: '',
  cities: [
    {
      name: 'vancouver',
      long: -123.1207,
      lat: 49.2827,
    },
    {
      name: 'ottawa',
      long: -75.6972,
      lat: 45.4215,
    },
    {
      name: 'toronto',
      long: -79.3832,
      lat: 43.6532,
    },
    {
      name: 'edmonton',
      long: -113.4909,
      lat: 53.5444,
    }
  ]
});

export const reducer = handleActions({

  // ...Actions.commonImmutableHandlers(formActions.commonImmutableActions),

  [locationActions.setLocation]: (state, action) => {
    return state.set('currentCity', action.payload.value);
  }

}, defaultState)

export default reducer;