import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageTitle from "../../comman/AdminPageTitle";
import MyImageUpload from "../../comman/form/MyImageUpload";
import MyInput from "../../comman/form/MyInput";
import CategoryInput from "./CategoryInput";

const initialState = {
  name: "",
  carouselImages: [],
  categories: [{ id: Date.now(), name: "", displayName: "", image: "" }],
};

function AddUpdatePages() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [formState, setFormState] = useState(isAdd ? initialState : null);
  const navigate = useNavigate();

  console.log("formState", formState);

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let data = formState;

    const formData = new FormData();

    for (const key of data) {
      if (key === "carouselImages") {
        for (const value of data[key]) {
          formData.append("carouselImages", value);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    console.log("data", data);
  }

  function handleUpload(e) {
    setFormState({
      ...formState,
      carouselImages: [
        ...formState.carouselImages,
        ...Array.from(e.target.files),
      ],
    });
  }

  function handleRemove(index) {
    const updatedField = formState.carouselImages.filter((value, i) => {
      if (i === index) {
        return false;
      }
      return true;
    });
    setFormState({ ...formState, carouselImages: updatedField });
  }

  function handleAddCategory() {
    setFormState({
      ...formState,
      categories: [
        ...formState.categories,
        { id: Date.now(), name: "", displayName: "", image: "" },
      ],
    });
  }

  function handleRemoveCategory(id) {
    const newCategories = formState.categories.filter((value) => {
      if (value.id === id) {
        return false;
      }
      return true;
    });

    setFormState({ ...formState, categories: newCategories });
  }

  function handleCategoryChange(e, id) {
    const updatedCategories = formState.categories.map((value) => {
      if (value.id === id) {
        return { ...value, [e.target.name]: e.target.value };
      }
      return value;
    });
    setFormState({ ...formState, categories: updatedCategories });
  }

  function handleCategoryImageUpload(e, id) {
    const updatedCategories = formState.categories.map((value) => {
      if (value.id === id) {
        return { ...value, [e.target.name]: e.target.files };
      }
      return value;
    });
    setFormState({ ...formState, categories: updatedCategories });
  }

  function handleCategoryImageRemove(index, id) {
    const updatedCategories = formState.categories.map((value) => {
      if (value.id === id) {
        return { ...value, image: "" };
      }
      return value;
    });
    setFormState({ ...formState, categories: updatedCategories });
  }

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Page" : "Update Page"} />
      <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <MyInput name="name" value={formState.name} onChange={handleChange} />
          <MyImageUpload
            name="carouselImages"
            multiple={true}
            onChange={handleUpload}
            remove={handleRemove}
            images={formState.carouselImages}
          />
          <div className="flex justify-end">
            <Button onClick={handleAddCategory}>Add Category</Button>
          </div>
          {formState.categories.map((value) => {
            return (
              <CategoryInput
                onRemove={handleRemoveCategory}
                value={value}
                onChange={handleCategoryChange}
                onUpload={handleCategoryImageUpload}
                onImageRemove={handleCategoryImageRemove}
              />
            );
          })}

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AddUpdatePages;
