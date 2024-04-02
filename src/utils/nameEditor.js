export function editName(string) {
  if(string) {
    return `${string && string.slice(0, 1)}.`
  } else {
    return ''
  }
}
