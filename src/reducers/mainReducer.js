import {fromJS, Map} from 'immutable'
import {handleActions} from 'redux-actions'
// import Actions from 'frontend-g3-common-ui/actions/Actions'
import * as billingActions from '../actions/billingActions'
import { OpeningModeEnum } from 'frontend-g3-common/constants/enums';

const initialState = fromJS({
  readMode: true
})

export const reducer = handleActions({

  ...Actions.commonImmutableHandlers(billingActions.commonImmutableActions),

}, initialState)

export default reducer
