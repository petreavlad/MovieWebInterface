import React from "react";
import "./PersonRow.css";

function PersonRow(props) {
  return (
    <div
      id="person_row_holder"
      style={{
        height: props.height,
        width: props.width,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
      }}
    ></div>
  );
}

export default PersonRow;
