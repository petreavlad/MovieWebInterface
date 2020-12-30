import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./EditText.css";

function EditText(props, ref) {
  const [actual_text, setActualText] = useState("");
  const [hidden_text, setHiddenText] = useState("");

  useImperativeHandle(ref, () => ({ setText }));

  var selection = {
    selection_start: 0,
    selection_end: 0,
  };

  function setText(text) {
    setActualText(text);
  }

  useEffect(() => {
    if (props.text) setActualText(props.text);
  }, []);

  function onNewText(event) {
    if (event.nativeEvent.inputType === "insertLineBreak") {
      return;
    }

    if (event.nativeEvent.inputType === "deleteContentBackward") {
      deleteAction();
      return;
    }

    insertAction(event);
  }

  function insertAction(event) {
    var text;
    if (event.target.value.length - 1 === actual_text.length) {
      if (!props.isPassword) {
        text = event.target.value;
      } else {
        text = actual_text + event.target.value.slice(-1);
      }

      setActualText(text);
      if (props.onChange) {
        props.onChange(text);
      }
    } else {
      text = event.target.value.replace(/(\r\n|\n|\r)/gm, "");
      setActualText(text);
      if (props.onChange) {
        props.onChange(text);
      }
    }
    setHiddenText("*".repeat(text.length));
  }

  function deleteAction() {
    if (selection.selection_start !== selection.selection_end) {
      var text = actual_text.replace(
        actual_text.substring(
          selection.selection_start,
          selection.selection_end
        ),
        ""
      );
      setActualText(text);
      setHiddenText("*".repeat(text.length));
      if (props.onChange) {
        props.onChange(text);
      }
    } else {
      setActualText(actual_text.substring(0, actual_text.length - 1));
      setHiddenText("*".repeat(actual_text.length - 1));
      if (props.onChange) {
        props.onChange(actual_text.substring(0, actual_text.length - 1));
      }
    }
  }

  function onSelect(event) {
    selection.selection_start = event.target.selectionStart;
    selection.selection_end = event.target.selectionEnd;
  }

  return (
    <div
      className="edit_text_holder"
      style={{
        marginLeft: props.margin_left,
        marginRight: props.margin_right,
        marginTop: props.margin_top,
        marginBottom: props.margin_bottom,
      }}
    >
      <textarea
        style={{
          paddingTop: props.padding_top,
          paddingBottom: props.padding_bottom,
          height: props.height,
          width: props.width,
          whiteSpace: props.whiteSpace ? props.whiteSpace : "nowrap",
          resize: props.resize ? props.resize : "none",
          textAlign: props.textAlign ? props.textAlign : "center",
        }}
        placeholder={props.placeholder}
        className="text_input_area"
        value={props.isPassword ? hidden_text : actual_text}
        spellCheck="false"
        onChange={onNewText}
        onSelect={onSelect}
      >
        {}
      </textarea>
    </div>
  );
}

export default forwardRef(EditText);
