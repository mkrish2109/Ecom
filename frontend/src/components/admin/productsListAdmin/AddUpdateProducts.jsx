import { Button, Checkbox, Label, Select, Textarea } from "flowbite-react";
import React from "react";
import { useParams } from "react-router-dom";
import AdminPageTitle from "../../comman/AdminPageTitle";
import MyInput from "../../comman/form/MyInput";
import MyTextarea from "../../comman/form/MyTextarea";
import MySelect from "../../comman/form/MySelect";
import MyMultiCheckboxes from "../../comman/form/MyMultiCheckboxes";

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

function AddUpdateProducts() {
  const { id } = useParams();

  const isAdd = id === "add";

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Product" : "Update Product"} />
      <div>
        <form className="flex flex-col gap-2">
          <MyInput name="name" />
          <MyTextarea name="desc" label="Description" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MyInput name="price" type="number" />
            <MyInput name="taxRate" label="Tax" type="number" />
            <MyInput
              name="deliveryCharges"
              label="Delivery Charges"
              type="number"
            />
            <MyInput name="stock" type="number" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MySelect name="gender" options={genderOprtions} />
            <MySelect name="category" options={categoryOprtions} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MyMultiCheckboxes
              label="Sizes"
              options={sizesOptions}
              className="uppercase"
            />
            <MyMultiCheckboxes label="Colors" options={colorsOptions} className="capitalize" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AddUpdateProducts;
