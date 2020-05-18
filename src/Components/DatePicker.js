import React from "react";

export default function DatePicker(props) {
  return (
    <div>
      {props.label}:<input id={props.id} onChange={props.onChange} value={props.value}></input>
    </div>
  );
}
