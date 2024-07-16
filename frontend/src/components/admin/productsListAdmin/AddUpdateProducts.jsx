import { Button, Checkbox, Label, Select, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminPageTitle from "../../comman/AdminPageTitle";
import MyInput from "../../comman/form/MyInput";
import MyTextarea from "../../comman/form/MyTextarea";
import MySelect from "../../comman/form/MySelect";
import MyMultiCheckboxes from "../../comman/form/MyMultiCheckboxes";
import MyImageUpload from "../../comman/form/MyImageUpload";

const genderOprtions = [
  { value: "men", text: "Men" },
  { value: "women", text: "Women" },
  { value: "kids", text: "Kids" },
];

const categoryOprtions = [
  { value: "t-shirts", text: "T-Shirts" },
  { value: "shirts", text: "Shirts" },
  { value: "jeans", text: "Jeans" },
];

const sizesOptions = [
  { name: "xs", checked: false },
  { name: "s", checked: false },
  { name: "m", checked: false },
  { name: "l", checked: false },
  { name: "xl", checked: false },
  { name: "xxl", checked: false },
  { name: "xxxl", checked: false },
];

const colorsOptions = [
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

const initialState = {
  name: "",
  desc: "",
  price: "",
  taxRate: "",
  deliveryCharges: "",
  stock: "",
  images: [],
  category: "",
  gender: "",
  sizes: sizesOptions,
  colors: colorsOptions,
};

function AddUpdateProducts() {
  const { id } = useParams();
  const [formState, setFormState] = useState(initialState);
  const isAdd = id === "add";

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleCheck(e, field) {
    const updatedField = formState[field].map((value) => {
      if (value.name === e.target.name) {
        return { ...value, checked: !value.checked };
      }
      return value;
    });

    setFormState({ ...formState, [field]: updatedField });
  }

  function handleUpload(e) {
    console.log(Array.from(e.target.files));
    setFormState({
      ...formState,
      images: [...formState.images, ...Array.from(e.target.files)],
    });
  }

  function handleRemove(index) {
    const updatedField = formState.images.filter((value, i) => {
      if (i === index) {
        return false;
      }
      return true;
    });
    setFormState({ ...formState, images: updatedField });
  }

  console.log("formState", formState);

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Product" : "Update Product"} />
      <div>
        <form className="flex flex-col gap-2">
          <MyInput name="name" value={formState.name} onChange={handleChange} />
          <MyTextarea
            name="desc"
            label="Description"
            value={formState.desc}
            onChange={handleChange}
          />
          <MyImageUpload
            name="images"
            multiple={true}
            onChange={handleUpload}
            remove={handleRemove}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MyInput
              name="price"
              type="number"
              value={formState.price}
              onChange={handleChange}
            />
            <MyInput
              name="taxRate"
              label="Tax"
              type="number"
              value={formState.taxRate}
              onChange={handleChange}
            />
            <MyInput
              name="deliveryCharges"
              label="Delivery Charges"
              type="number"
              value={formState.deliveryCharges}
              onChange={handleChange}
            />
            <MyInput
              name="stock"
              type="number"
              value={formState.stock}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MySelect
              name="gender"
              options={genderOprtions}
              value={formState.gender}
              onChange={handleChange}
            />
            <MySelect
              name="category"
              options={categoryOprtions}
              value={formState.category}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MyMultiCheckboxes
              label="Sizes"
              className="uppercase"
              options={formState.sizes}
              onChange={handleCheck}
            />
            <MyMultiCheckboxes
              label="Colors"
              options={formState.colors}
              onChange={handleCheck}
              className="capitalize"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AddUpdateProducts;
