export const selectInvoices = state => state.invoices.invoices;
export const selectFilteredInvoices = state => state.invoices.filteredInvoices;
// export const selectUserInvoices = state => state.invoices.userInvoices;
export const selectUnapprovedInvoices = state => state.invoices.unapprovedInvoices;
export const selectProjectInvoices = state => state.invoices.projectInvoices;
export const selectIsFetchingAddInvoice = state => state.invoices.isFetching;
