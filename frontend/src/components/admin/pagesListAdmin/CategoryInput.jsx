import React from "react";
import MyImageUpload from "../../comman/form/MyImageUpload";
import MyInput from "../../comman/form/MyInput";
import { Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi";
import { useParams } from "react-router-dom";

function CategoryInput({ value, onRemove, onChange, onUpload, onImageRemove }) {
  const { id } = useParams();
  const isAdd = id === "add";

  return (
    <div className="flex items-end gap-4">
      <MyImageUpload
        name="image"
        containerClassName="grow-[1]"
        onChange={(e) => {
          onUpload(e, isAdd ? value.id : value._id || value.id);
        }}
        remove={(e) => {
          onImageRemove(e, isAdd ? value.id : value._id || value.id);
        }}
        images={[value.image]}
      />
      <MyInput
        name="name"
        containerClassName="grow-[1]"
        value={value.name}
        onChange={(e) => {
          onChange(e, isAdd ? value.id : value._id || value.id);
        }}
      />
      <MyInput
        name="displayName"
        containerClassName="grow-[1]"
        value={value.displayName}
        onChange={(e) => {
          onChange(e, isAdd ? value.id : value._id || value.id);
        }}
      />
      <Button
        color="primary"
        className="h-fit"
        onClick={() => {
          onRemove(isAdd ? value.id : value._id || value.id);
        }}>
        <HiTrash />
      </Button>
    </div>
  );
}

export default CategoryInput;
