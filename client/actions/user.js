import {
  GET_USERS_LIST_PENDING,
  GET_USERS_LIST_RESOLVED,
  GET_USERS_LIST_REJECTED,
} from '../constants/actions';
import { getUsersList as getUsersListCall } from '../apiCalls/userCalls';

export const getUsersList = dispatch => (ids) => {
  const idsClone = [];
  ids.map(id => idsClone.includes(id) ? '' : idsClone.push(id));
  dispatch({ type: GET_USERS_LIST_PENDING, payload: { ids: idsClone } });
  getUsersListCall(idsClone)
    .then(users => dispatch({ type: GET_USERS_LIST_RESOLVED, payload: users }))
    .catch(err => dispatch({ type: GET_USERS_LIST_REJECTED, payload: err }));
};
