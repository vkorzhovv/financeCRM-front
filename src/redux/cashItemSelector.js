export const selectAllItems = state => state.cashItems.items;
export const selectFilteredItems = state => state.cashItems.filteredItems;
export const selectPaymentTypes = state => state.cashItems.types;
export const selectSubtypes = state => state.cashItems.subtypes;
export const selectIsFetchingCash = state => state.cashItems.isFetching;
