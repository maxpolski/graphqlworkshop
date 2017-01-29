import {
  GET_USERS_LIST_PENDING,
  GET_USERS_LIST_RESOLVED,
  // GET_USERS_LIST_REJECTED,
} from '../constants/actions';

const defaultState = {
  pendingUsers: [],
  cachedUsers: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_USERS_LIST_PENDING:
      return {
        ...state,
        pendingUsers: [...state.pendingUsers, ...payload.ids],
      };

    case GET_USERS_LIST_RESOLVED:
      const resolvedUsersIds = payload.users.map(user => user._id);
      const newPendingUsers = state.pendingUsers.filter(pendingUser =>
        !resolvedUsersIds.find(resolvedUser =>
          resolvedUser === pendingUser));
      const requiredUsersIds = [
        ...resolvedUsersIds,
        ...state.cachedUsers.map(cachedUser => cachedUser._id),
      ];
      const newCachedUsers = requiredUsersIds.map(id =>
        payload.users.find(user => user._id === id)
        || state.cachedUsers.find(user => user._id === id));
      return {
        ...state,
        pendingUsers: newPendingUsers,
        cachedUsers: newCachedUsers,
      };

    default:
      return state;
  }
};

export const getPendingUsers = state =>
  state.pendingUsers;

export const getUserById = (state, id) =>
  state.cachedUsers.find(cachedUser => cachedUser._id === id);
