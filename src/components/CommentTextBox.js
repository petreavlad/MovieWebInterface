import React, { useEffect, useState } from "react";
import EditText from "./EditText";
import "./CommentTextBox.css";

function CommentTextBox(props) {
  const [spinnerVisibilitty, setSpinnerVisibility] = useState("hidden");

  useEffect(() => {}, []);

  function createSpinner() {
    return (
      <div
        id="comment_loading_background"
        style={{ visibility: spinnerVisibilitty }}
      >
        <img
          id="comment_loading_spinner"
          src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1610383508/utils/Spinner-1s-200px_spruu3.gif"
        ></img>
      </div>
    );
  }

  function onKeyDown(event, text) {
    if (event.key === "Enter") {
      setSpinnerVisibility("visible");
      event.target.blur();
    }
  }

  return (
    <div>
      {createSpinner()}
      <EditText
        resetEditText="true"
        height="300px"
        width="600px"
        margin_bottom="30px"
        whiteSpace="none"
        textAlign="start"
        placeholder="Add Comment"
        onKeyDown={onKeyDown}
      ></EditText>
    </div>
  );
}

export default CommentTextBox;
