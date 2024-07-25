import React from "react";
import MyImageUpload from "../../comman/form/MyImageUpload";
import MyInput from "../../comman/form/MyInput";
import { Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

function CategoryInput({ value, onRemove, onChange, onUpload, onImageRemove }) {
  return (
    <div className="flex items-end gap-4">
      <MyImageUpload
        name="image"
        containerClassName="grow-[1]"
        onChange={(e) => {
          onUpload(e, value.id);
        }}
        remove={(e) => {
          onImageRemove(e, value.id);
        }}
        // images={formState.carouselImages}
      />
      <MyInput
        name="name"
        containerClassName="grow-[1]"
        value={value.name}
        onChange={(e) => {
          onChange(e, value.id);
        }}
      />
      <MyInput
        name="displayName"
        containerClassName="grow-[1]"
        value={value.displayName}
        onChange={(e) => {
          onChange(e, value.id);
        }}
      />
      <Button
        className="h-fit"
        onClick={() => {
          onRemove(value.id);
        }}>
        <HiTrash />
      </Button>
    </div>
  );
}

export default CategoryInput;
