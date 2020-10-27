import React from "react";

import "./EditDialog.css";

function ErrorDialog(props) {
  function onFirstButtonClick(event) {
    props.firstButtoonListener(event);
  }

  function onSecondButtonClick(event) {
    props.secondButtonListener(event);
  }

  var view;

  if (props.showSecondButton) {
    view = (
      <div
        style={{ visibility: props.isVisible ? "visible" : "hidden" }}
        className="error_holder"
      >
        <div className="error_overlay"></div>
        <div className="error_backgrouond">
          <div className="title_text">{props.title}</div>
          <div className="description">{props.message}</div>
          <div>
            <button className="error_button_text" onClick={onFirstButtonClick}>
              {props.firstButtonText}
            </button>
            <button
              className="secondary_error_button"
              onClick={onSecondButtonClick}
            >
              {props.secondButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    view = (
      <div
        style={{ visibility: props.isVisible ? "visible" : "hidden" }}
        className="error_holder"
      >
        <div className="error_overlay"></div>
        <div className="error_backgrouond">
          <div className="title_text">{props.title}</div>
          <div className="description">{props.message}</div>
          <div>
            <button className="error_button_text" onClick={onFirstButtonClick}>
              {props.firstButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return view;
}

export default ErrorDialog;
