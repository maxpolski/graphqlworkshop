export default (nextState, replaceLocation) => {
  if (!localStorage.getItem('token') && nextState.location.pathname !== '/auth') {
    replaceLocation('/auth');
  }
};
