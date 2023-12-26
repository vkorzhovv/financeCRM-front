export const selectIsAuth = state => state.auth.isAuth || localStorage.getItem('isAuth');
export const selectFirstNameMe = state => state.auth.userData.firstName;
export const selectLastNameMe = state => state.auth.userData.lastName;
export const selectUsernameMe = state => state.auth.userData.username;
export const selectUserTypeMe = state => state.auth.userData.userType;
