export const selectAllUsers = state => state.users.allUsers;
export const selectClients = state => state.users.clients;
export const selectEmployees = state => state.users.employees;
export const selectContractors = state => state.users.contractors;
export const selectFilteredClients = state => state.users.filteredClients;
export const selectFilteredEmployees = state => state.users.filteredEmployees;
export const selectFilteredContractors = state => state.users.filteredContractors;
export const selectIsFetchingAddUser = state => state.users.isFetching;
