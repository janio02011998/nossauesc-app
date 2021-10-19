export function removeEmptyFields(data: {}) {
  const obj = Object.entries(data).forEach((item) => {
    const [key, value] = item;
    if (value === "") delete data[key];
  });
  return obj;
}
