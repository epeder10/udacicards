import { getEntrys } from '../utils/api'
import { receiveEntries } from '../actions/index'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getEntrys()
      .then(({ state }) => {
        dispatch(receiveEntries(state))
        dispatch(hideLoading())
      })
  }
}