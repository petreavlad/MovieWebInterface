import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Checkbox.css";

function Checkbox(props, ref) {
  const [is_checked, setIsChecked] = useState(props.isSelected);

  useImperativeHandle(ref, () => ({ setChecked, isChecked }));

  function setChecked(checked) {
    setIsChecked(checked);
  }

  function isChecked() {
    return is_checked;
  }

  function onCheckboxClicked() {
    setIsChecked(!is_checked);
    if (props.onChecked) {
      props.onChecked();
    }
  }

  return (
    <div
      className="checkbox_holder"
      style={{
        width: props.width,
        height: props.height,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
      }}
    >
      <img
        onClick={onCheckboxClicked}
        className="checkbox_image"
        src={is_checked ? props.checked_src : props.unchecked_src}
      ></img>
    </div>
  );
}

export default forwardRef(Checkbox);
