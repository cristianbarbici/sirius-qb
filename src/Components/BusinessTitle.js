import React from "react";
import { useSplatField } from "../SplatComponents/SplField";
import SirTextField from "./common/SirTextField";

export default function BusinessTitle(props) {
  const label = 'Business title';
  const [value, setValue] = useSplatField("process_BusinessLayer.BusinessTitle");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <SirTextField
      label={label}
      value={value || ""}
      onChange={handleChange}
    />
  );
}
