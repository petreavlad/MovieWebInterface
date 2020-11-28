import React from "react";
import "./GalleryDetail.css";

function GalleryDetails(props) {
  return (
    <div
      id="gallery_details_holder"
      style={{
        width: props.width,
        height: props.height,
        marginTop: props.marginTop,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginBottom: props.marginBottom,
        backgroundColor: props.backgroundColor,
      }}
    ></div>
  );
}

export default GalleryDetails;
