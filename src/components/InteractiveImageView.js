import React, { useEffect, useState } from "react";
import "./InteractiveImageView.css";

function InteractiveImageView(props) {
  const [shownPhoto, setShownPhoto] = useState("");

  useEffect(() => {
    setShownPhoto(props.defaultPhoto);
  }, []);

  return (
    <img
      id="interactive_image_holder"
      src={shownPhoto}
      style={{ width: props.width, height: props.height }}
    ></img>
  );
}

export default InteractiveImageView;
