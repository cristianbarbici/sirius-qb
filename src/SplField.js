import React from 'react';

export default function SplField(props) {
  return (
    <div>
      {props.field.Path}: {props.field.Value}
    </div>
  );
}
