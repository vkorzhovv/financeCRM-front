export const selectPayments = state => state.payments.payments;
export const selectFilteredPayments = state => state.payments.filteredPayments;
export const selectUserPayments = state => state.payments.userPayments;
export const selectPaymentsInInvoice = state => state.payments.paymentsInInvoice;
export const selectIsFetchingAddPayment = state => state.payments.isFetching;
