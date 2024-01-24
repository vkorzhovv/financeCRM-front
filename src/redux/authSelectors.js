export const selectIsAuth = state => state.auth.isAuth || localStorage.getItem('isAuth');
export const selectMe = state => state.auth.userData;
