import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./PersonRow.css";

function PersonRow(props, ref) {
  const [persons, setPersons] = useState([]);
  const [content, setContent] = useState([]);

  useImperativeHandle(ref, () => ({ deleteItem }));

  useEffect(() => {
    setPersons(props.personArray);
  }, []);

  useEffect(() => {
    createAllPersonDivs(persons);
  }, [persons]);

  function onItemClicked(event) {
    if (props.onItemClicked) {
      props.onItemClicked(
        persons[event.target.getAttribute("data-key")]
          ? persons[event.target.getAttribute("data-key")]
          : "ADD_CARD"
      );
    }
  }

  function createAllPersonDivs(array) {
    var divArray = [];
    var lastIndex = 0;
    array.map((value, index) => {
      lastIndex = index;
      divArray.push(createPersonDiv(index, value.photo_url, value.name, false));
    });
    divArray.push(
      createPersonDiv(++lastIndex, props.addIconImage, props.addIconText, true)
    );
    setContent(divArray);
  }

  function deleteItem(person_id) {
    let personArray = persons.filter(function (item) {
      return !(item.person_id === person_id);
    });

    setPersons(personArray);
  }

  function onXClick(event) {
    if (props.onxClick) {
      props.onxClick(persons[event.target.getAttribute("data-key")]);
    }
  }

  function createPersonDiv(index, image, text, isLast) {
    let isLastVisibility;
    if (isLast) {
      isLastVisibility = "hidden";
    } else {
      isLastVisibility = props.visibility;
    }
    console.log(index);
    return (
      <div
        id="person_holder"
        style={{
          width: props.personCardDimension,
          marginRight: isLast ? "0px" : props.marginInBetween,
        }}
        data-key={index}
        key={"person_holder_" + index}
      >
        <img
          id="x_button_person_stripe"
          src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1608404156/utils/delete_asset_button_xznfax.png"
          style={{
            width: props.xButtonDimmension,
            height: props.xButtonDimmension,
            marginStart: props.xMarginStart,
            visibility: isLastVisibility,
          }}
          key={"x_button_person_stripe_" + index}
          data-key={index}
          onClick={onXClick}
        ></img>
        <img
          id="person_image"
          src={image}
          data-key={index}
          key={"person_image" + index}
          style={{
            width: props.personCardDimension,
            height: props.personCardDimension,
            borderRadius: props.personCardDimension,
          }}
          onClick={onItemClicked}
        ></img>
        <div
          id="person_name"
          onClick={onItemClicked}
          key={"person_name_" + index}
          data-key={index}
        >
          <b data-key={index} key={"b_" + index}>
            {text}
          </b>
        </div>
      </div>
    );
  }

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
      key={"person_row_holder"}
    >
      {content}
    </div>
  );
}

export default forwardRef(PersonRow);
