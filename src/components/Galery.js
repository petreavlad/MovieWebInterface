import "./Galery.css";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

let is_user_interacting = false;

function Galery(props, ref) {
  const [content, setContent] = useState([]);
  const [dots, setDots] = useState([]);
  var contents = [];
  var height, width;
  var parentView = useRef();
  var interval;
  var resetAutoScrollInterva;
  var selected_position = 0;

  useEffect(() => {
    is_user_interacting = false;
  }, []);

  useEffect(() => {
    width = parentView.current.offsetWidth;
    height = parentView.current.offsetHeight;
  }, [content]);

  useImperativeHandle(ref, () => ({ addElements, scroll, startScrolling }));

  function addElements(items) {
    var divArray = [];

    for (var i = 0; i < items.length; i++) {
      divArray.push(addDiv(items[i]));
    }
    divArray.push(addExtraDiv(items[0]));

    setDots(getDotArray(items.length, 0));
    setContent(divArray);
    contents = divArray;
  }

  function getDotArray(size, selected_position) {
    let dotArray = [];
    for (var i = 0; i < size; i++) {
      if (i == size - 1) {
        dotArray.push(getDot(true, i, selected_position === i ? true : false));
      } else {
        dotArray.push(getDot(false, i, selected_position === i ? true : false));
      }
    }
    return dotArray;
  }

  function addDiv(color) {
    return (
      <img
        src={color}
        className="gallery_card"
        style={{
          minWidth: width,
          minHeight: height,
        }}
        key={color}
      />
    );
  }

  function addExtraDiv(color) {
    return (
      <img
        src={color}
        className="gallery_card"
        style={{
          backgroundColor: color,
          minWidth: width,
          minHeight: height,
        }}
        key={"extra"}
      />
    );
  }

  function onDotClick(event) {
    clearTimeout(resetAutoScrollInterva);
    is_user_interacting = true;
    selected_position = parseInt(event.target.getAttribute("data-key"));
    var size = contents.length > 0 ? contents.length : content.length;

    setDots(getDotArray(size - 1, selected_position));

    if (parentView && parentView.current) {
      parentView.current.scrollLeft = width * selected_position;
      if (props.newItemSelected) {
        props.newItemSelected(selected_position);
      }
    }

    resetAutoScrollInterva = setTimeout(restartAutomatScroling, 3000);
  }

  function restartAutomatScroling() {
    is_user_interacting = false;
  }

  function getDot(is_last, key, is_selected) {
    return (
      <div
        id="dot_stile"
        style={{
          width: props.dot_dimension,
          height: props.dot_dimension,
          borderRadius: props.dot_dimension,
          backgroundColor: is_selected
            ? props.dot_unselected_color
            : props.dot_selected_color,
          marginRight: is_last ? "0px" : props.dot_between_margin,
        }}
        onClick={onDotClick}
        key={key}
        data-key={key}
      ></div>
    );
  }

  function startScrolling(miliseconds) {
    if (interval) {
      stopScrolling();
    }

    interval = setInterval(automaticScroll, miliseconds);
  }

  function getDotsLeftMargin() {
    return (
      parseInt(props.marginLeft) +
      (parseInt(props.width) -
        parseInt(props.dot_dimension) * dots.length -
        parseInt(props.dot_between_margin) * (dots.length - 2)) /
        2
    );
  }

  function getDotsTopMargin() {
    return (
      parseInt(props.marginTop) +
      parseInt(props.height) -
      parseInt(props.dot_dimension) -
      parseInt(props.dot_marginBottom)
    );
  }

  function stopScrolling() {
    clearInterval(interval);
  }

  function automaticScroll() {
    if (is_user_interacting) {
      return;
    }

    if (selected_position < content.length) {
      selected_position++;
    } else {
      selected_position = 1;
      let items = content;
      setContent([]);
      setContent(items);
    }

    setSelectedDot();

    if (parentView && parentView.current) {
      parentView.current.scrollLeft = width * selected_position;
      if (props.newItemSelected) {
        props.newItemSelected(selected_position);
      }
    }
  }

  function setSelectedDot() {
    if (selected_position < content.length - 1) {
      setDots(getDotArray(content.length - 1, selected_position));
    } else {
      setDots(getDotArray(content.length - 1, 0));
    }
  }

  function scroll(position) {
    selected_position = position;
    if (parentView && parentView.current) {
      parentView.current.scrollLeft = width * position;
      if (props.newItemSelected) {
        props.newItemSelected(selected_position);
      }
    }
  }

  return (
    <div>
      <div
        ref={parentView}
        className="scrollable_view"
        style={{
          width: props.width,
          height: props.height,
          marginTop: props.marginTop,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
        }}
      >
        {content.length ? content : null}
      </div>
      <div
        id="dots_holder"
        style={{
          marginLeft: getDotsLeftMargin(),
          marginTop: getDotsTopMargin(),
        }}
      >
        {dots.length ? dots : null}
      </div>
    </div>
  );
}

export default forwardRef(Galery);
