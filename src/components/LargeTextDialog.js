import React from "react";

import "./LargeTextDialog.css";

function LargeTextDialog(props) {
  return (
    <div
      className="large_dialog_holder"
      style={{ visibility: props.visibility }}
    >
      <div className="large_dialog_background"></div>
      <div className="content_holder_dialog">
        <div className="large_dialog_title">
          <b>{props.title}</b>
        </div>
        <div className="message_holder_large_dialog">{props.message}</div>
        <div className="buttons_holder_large_dialog">
          <button
            className="first_dialog_button"
            onClick={props.onFirstButtonClick}
          >
            {props.first_button_text}
          </button>
          <button
            className="first_dialog_button"
            onClick={props.onSecondButtonClick}
            style={{ marginLeft: "20vh" }}
          >
            {props.second_button_text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LargeTextDialog;
