import {
  GET_USER_EXPENSES,
  ADD_USER_EXPENSE,
  SELECT_USER_EXPENSE,
  UPDATE_USER_EXPENSE,
  DELETE_USER_EXPENSE,
  CLEAR_USER_EXPENSES
} from '../types'

const INITIAL_STATE = {
  all: [],
  selected: null
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_USER_EXPENSES:
      return { ...state, all: payload }
    case ADD_USER_EXPENSE:
      return { ...state, all: [ ...state.all, payload ] }
    case SELECT_USER_EXPENSE:
      return { ...state, selected: payload }
    case UPDATE_USER_EXPENSE:
      const updated = state.all.map(e => { 
        if (e.id === payload.id) return payload
        return e
      })
      return { all: updated, selected: payload }
    case DELETE_USER_EXPENSE:
      return { all: state.all.filter(e => e.id !== payload), selected: null }
    case CLEAR_USER_EXPENSE:
    default:
      return state
  }
}
