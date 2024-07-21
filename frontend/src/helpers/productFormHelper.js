export const genderOprtions = [
  { value: "", text: "Select Gender" },
  { value: "men", text: "Men" },
  { value: "women", text: "Women" },
  { value: "kids", text: "Kids" },
];

export const categoryOprtions = [
  { value: "", text: "Select Category" },
  { value: "t-shirts", text: "T-Shirts" },
  { value: "shirts", text: "Shirts" },
  { value: "jeans", text: "Jeans" },
];

export const sizesOptions = [
  { name: "xs", checked: false },
  { name: "s", checked: false },
  { name: "m", checked: false },
  { name: "l", checked: false },
  { name: "xl", checked: false },
  { name: "xxl", checked: false },
  { name: "xxxl", checked: false },
];

export const colorsOptions = [
  { name: "red", checked: false },
  { name: "yellow", checked: false },
  { name: "blue", checked: false },
  { name: "purple", checked: false },
  { name: "green", checked: false },
  { name: "orange", checked: false },
  { name: "crimson", checked: false },
  { name: "turquoise", checked: false },
  { name: "lavender", checked: false },
  { name: "navy", checked: false },
];

export function getValuesArray(array) {
  return array
    .filter((value, index, array) => {
      if (value.checked) {
        return true;
      }
      return false;
    })
    .map((value, index, array) => {
      return value.name;
    });
}

export function getOptionsArray(array, field) {
  let options;
  if (field === "sizes") {
    options = sizesOptions;
  } else {
    options = colorsOptions;
  }

  return options.map((value) => {
    if (array.includes(value.name)) {
      return { ...value, checked: true };
    }
    return value;
  });
}
