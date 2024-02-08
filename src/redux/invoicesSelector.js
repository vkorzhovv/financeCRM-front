export const selectInvoices = state => state.invoices.invoices;
export const selectFilteredInvoices = state => state.invoices.filteredInvoices;
export const selectUnapprovedInvoices = state => state.invoices.unapprovedInvoices;
export const selectProjectInvoices = state => state.invoices.projectInvoices;
export const selectProjectReceipts = state => state.invoices.projectReceipts;
export const selectProjectExpenses = state => state.invoices.projectExpenses;
export const selectIsFetchingAddInvoice = state => state.invoices.isFetching;
