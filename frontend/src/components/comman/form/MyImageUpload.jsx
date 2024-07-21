import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { getLabelFromName } from "../../../helpers/productsFormHelper";
import MyImagesPreview from "./MyImagesPreview";

function MyImageUpload({
  name,
  label,
  multiple = false,
  onChange,
  remove,
  images,
  ...others
}) {
  const labelText = label || getLabelFromName(name);
  const [urls, setUrls] = useState(images);

  function handleUpload(e) {
    const temp = [];
    for (const file of e.target.files) {
      temp.push(URL.createObjectURL(file));
    }
    setUrls([...urls, ...temp]);
  }

  function handleRemove(index) {
    const updatedUrls = urls.filter((value, i) => {
      if (i === index) {
        return false;
      }
      return true;
    });
    setUrls(updatedUrls);
  }

  return (
    <div>
      <Label htmlFor={name}>{labelText}</Label>
      <MyImagesPreview
        images={urls}
        remove={(index) => {
          remove(index);
          handleRemove(index);
        }}
      />
      <TextInput
        id={name}
        name={name}
        type="file"
        multiple={multiple}
        onChange={(e) => {
          onChange(e);
          handleUpload(e);
        }}
        {...others}
        className="[&>div>input]:py-0"
      />
    </div>
  );
}

export default MyImageUpload;
