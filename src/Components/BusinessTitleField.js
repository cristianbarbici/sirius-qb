import React from "react";
import TextField from './TextField'

export default function BusinessTitleField(props) {
  return (
    <div>
      <TextField
        id="MainClassOfBusiness"
        label="Business Title"
        variant="filled"
      />
    </div>
  );
}
