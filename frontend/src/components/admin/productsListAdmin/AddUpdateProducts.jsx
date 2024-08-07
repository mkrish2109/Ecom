import { Button, Checkbox, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  colorsOptions,
  getOptionsArray,
  getValuesArray,
  sizesOptions,
} from "../../../helpers/productFormHelper";
import {
  addProduct,
  getAllPages,
  getSingleProduct,
  updateProduct,
} from "../../../services/apiServices";
import AdminPageTitle from "../../comman/AdminPageTitle";
import MyImageUpload from "../../comman/form/MyImageUpload";
import MyInput from "../../comman/form/MyInput";
import MyMultiCheckboxes from "../../comman/form/MyMultiCheckboxes";
import MySelect from "../../comman/form/MySelect";
import MyTextarea from "../../comman/form/MyTextarea";
import { toast } from "react-toastify";

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
  isTrending: false,
};

function AddUpdateProducts() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [formState, setFormState] = useState(isAdd ? initialState : null);
  const [pages, setPages] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      getSingleProduct(id).then((data) => {
        data.data.sizes = getOptionsArray(data.data.sizes, "sizes");
        data.data.colors = getOptionsArray(data.data.colors, "colors");
        setFormState(data.data);
      });
    }
  }, []);

  useEffect(() => {
    getAllPages().then((data) => {
      setPages(data.data);
    });
  }, []);

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

  function handleTrendingChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.checked });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = formState;
    data.sizes = getValuesArray(data.sizes);
    data.colors = getValuesArray(data.colors);

    const formData = new FormData();

    for (const key in data) {
      if (typeof data[key] === "object") {
        for (const value of data[key]) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    if (isAdd) {
      const response = await addProduct(formData);
      if (response.success === true) {
        navigate("/admin/products");
        toast.success(response.msg);
      }
    } else {
      const response = await updateProduct(formState._id, formData);
      if (response.success === true) {
        navigate("/admin/products");
        toast.success(response.msg);
      }
    }
  }
  console.log("formState", formState);

  if (!formState) return null;
  if (!pages) return null;

  const genderOptions = pages.map((v) => {
    return { value: v.slug, text: v.name };
  });

  const allCategoryOptions = pages.map((v) => {
    return {
      page: v.slug,
      options: v.categories.map((c) => {
        return { value: c.name, text: c.displayName };
      }),
    };
  });

  const categoryOptions =
    allCategoryOptions.find((v) => v.page === formState.gender)?.options;
  // console.log("genderOptions", genderOptions);
  // console.log("formState", formState);
  // console.log("allCategoryOptions", allCategoryOptions);

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Product" : "Update Product"} />
      <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
            images={formState.images}
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
              options={genderOptions}
              value={formState.gender}
              onChange={handleChange}
            />
            <MySelect
              name="category"
              options={categoryOptions}
              value={formState.category}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MyMultiCheckboxes
              label="Sizes"
              options={formState.sizes}
              onChange={handleCheck}
            />
            <MyMultiCheckboxes
              label="Colors"
              options={formState.colors}
              onChange={handleCheck}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="isTrending">Is Trending</Label>
            <Checkbox
              id="isTrending"
              name="isTrending"
              checked={formState.isTrending}
              onChange={handleTrendingChange}
            />
          </div>
          <Button  color="primary" type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AddUpdateProducts;
