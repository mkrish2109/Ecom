import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPage,
  getSinglePage,
  updatePage,
} from "../../../services/apiServices";
import AdminPageTitle from "../../comman/AdminPageTitle";
import MyImageUpload from "../../comman/form/MyImageUpload";
import MyInput from "../../comman/form/MyInput";
import CategoryInput from "./CategoryInput";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  slug: "",
  carouselImages: [],
  categories: [{ id: Date.now(), name: "", displayName: "", image: "" }],
};

function AddUpdatePages() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [formState, setFormState] = useState(isAdd ? initialState : null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      getSinglePage(id).then((data) => {
        setFormState(data.data);
      });
    }
  }, []);

  if (!formState) return null;

  function handleNameChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
    });
  }

  function handleCarouselImagesUpload(e) {
    setFormState({
      ...formState,
      carouselImages: [
        ...formState.carouselImages,
        ...Array.from(e.target.files),
      ],
    });
  }

  function handleCarouselImagesRemove(deleteIndex) {
    const updatedCarouselImages = formState.carouselImages.filter(
      (value, index) => {
        if (index === deleteIndex) {
          return false;
        }
        return true;
      }
    );
    setFormState({ ...formState, carouselImages: updatedCarouselImages });
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

  function handleRemoveCategory(deleteId) {
    const updatedCategories = formState.categories.filter((value) => {
      if ((isAdd ? value.id : value._id) === deleteId) {
        return false;
      }
      return true;
    });

    setFormState({ ...formState, categories: updatedCategories });
  }

  function handleChangeCategory(e, updateId) {
    const updatedCategories = formState.categories.map((value) => {
      if ((isAdd ? value.id : value._id) === updateId) {
        return { ...value, [e.target.name]: e.target.value };
      }
      return value;
    });
    setFormState({ ...formState, categories: updatedCategories });
  }

  function handleCategoryImageUpload(e, updateId) {
    const updatedCategories = formState.categories.map((value) => {
      if ((isAdd ? value.id : value._id) === updateId) {
        return { ...value, [e.target.name]: e.target.files };
      }
      return value;
    });
    setFormState({ ...formState, categories: updatedCategories });
  }

  function handleCategoryImageRemove(e, deleteId) {
    const updatedCategories = formState.categories.map((value) => {
      if ((isAdd ? value.id : value._id) === deleteId) {
        return { ...value, image: "" };
      }
      return value;
    });
    setFormState({ ...formState, categories: updatedCategories });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = formState;

    const formData = new FormData();

    console.log("data", data);

    for (const key in data) {
      if (key === "carouselImages") {
        for (const value of data[key]) {
          formData.append("carouselImages", value);
        }
      } else if (key === "categories") {
        for (const value of data[key]) {
          if (typeof value.image === "string") {
            formData.append(value.name, value.image);
          } else {
            formData.append(value.name, Array.from(value.image)[0]);
          }
        }
        let updatedCategories = data[key].map((value) => {
          delete value.image;
          return value;
        });
        formData.append("categories", JSON.stringify(updatedCategories));
      } else {
        if (key === "name") {
          formData.append("name", data.name);
        }
        if (key === "slug") {
          formData.append("slug", data.slug);
        }
      }
    }

    // console.log("formData", Array.from(formData.entries()));

    if (isAdd) {
      const response = await addPage(formData);
      if (response.success === true) {
        toast.success(response.msg);
      }
    } else {
      const response = await updatePage(formState._id, formData);
      if (response.success === true) {
        toast.success(response.msg);
      }
    }

    navigate("/admin/pages");
  }

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Page" : "Update Page"} />
      <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <MyInput
            name="name"
            value={formState.name}
            onChange={handleNameChange}
          />
          <MyImageUpload
            name="carouselImages"
            multiple={true}
            onChange={handleCarouselImagesUpload}
            remove={handleCarouselImagesRemove}
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
                onChange={handleChangeCategory}
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
