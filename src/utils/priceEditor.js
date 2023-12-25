export function editPrice(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
}
