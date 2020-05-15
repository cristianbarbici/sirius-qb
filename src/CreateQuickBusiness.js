import React, { useContext } from "react";
import SplField from "./SplField";
import { SplProcessCtx } from "./SplProcess"

export default function CreateQuickBusiness(props) {
  const context = useContext(SplProcessCtx);

  const navigate = (path, obj) => {
    let current = path.split(".", 1)[0];
    if(current === path) {
      return obj[path];
    } else {
      let remaining = path.substr(current.length + 1)
      return navigate(remaining, obj[current]);
    }
  }

  const get = (path) => ({
    Path: path,
    Value: navigate(path, context),
  });

  return (
    <div>
      <SplField field={get("process_BusinessLayer.BusinessTitle")} />
    </div>
  );
}
