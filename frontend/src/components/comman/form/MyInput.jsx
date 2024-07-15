import { Label, TextInput } from "flowbite-react";
import React from "react";
import { getLabelFromName } from "../../../helpers/productsFormHelper";

function MyInput({
  name,
  label,
  type = "text",
  value = "",
  onChange,
  ...others
}) {
  const labelText = label || getLabelFromName(name);
  return (
    <div>
      <Label htmlFor={name}>{labelText}</Label>
      <TextInput
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...others}
      />
    </div>
  );
}

export default MyInput;
