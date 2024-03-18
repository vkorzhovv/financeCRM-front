export function editFileName(string) {
  return string.slice(string.lastIndexOf('.'))
}

export function editFileNameFull(string) {
  const name = string.slice(string.lastIndexOf('/'));
  const result = name.includes('_') ? name.slice(1, name.lastIndexOf('_')) + name.slice(name.lastIndexOf('.')) : name.slice(1);

  return result;
}
