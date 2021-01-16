import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./GalleryDetail.css";

function GalleryDetails(props, ref) {
  const [content, setContent] = useState(null);
  useImperativeHandle(ref, () => ({ setCurrentItem }));

  function setCurrentItem(item) {
    setContent(item);
  }

  function getGenresAndYear(genres, year) {
    var finalvalue = "";
    var i = 0;

    for (let genre of genres) {
      finalvalue += genre;
      if (i < genres.length - 1) {
        finalvalue += ",";
      }
      i++;
    }
    finalvalue += " | ";
    finalvalue += year;

    return finalvalue;
  }

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
    >
      <div id="gallery_details_title">
        <u>
          <b>{content != null ? content.title : ""}</b>
        </u>
      </div>
      <div id="gallery_details_subtitle">
        {content != null ? getGenresAndYear(content.genres, content.year) : ""}
      </div>
      <div id="gallery_details_description">
        {content != null ? content.description : ""}
      </div>
    </div>
  );
}

export default forwardRef(GalleryDetails);
