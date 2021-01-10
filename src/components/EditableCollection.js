import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./EditableCollection.css";
import axios from "axios";

function EditableCollection(props, ref) {
  const [content, setContent] = useState([]);
  var items;
  const [items_to_be_displayed, setItemsToBeDisplayed] = useState([]);

  useImperativeHandle(ref, () => ({ getItemsByFilter }));

  function getItemsByFilter(filter) {
    setContent(null);
    axios({
      method: "get",
      url: "https://movie-test-app-2223.herokuapp.com/content/get",
      headers: {
        token: localStorage.getItem("user_token"),
        filter: filter ? getSearchFilter(filter) : "",
      },
    }).then((response) => {
      console.log(response);
      if (response.data.response.length === 0) {
        setItemsToBeDisplayed([getNoSuchMovie()]);
      } else {
        setItemsToBeDisplayed(getCardsForItem(response.data.response));
      }
      items = response.data.response;
      setContent(response.data.response);
    });
  }

  useEffect(() => {
    getAllItems(localStorage.getItem("user_token"));
  }, []);

  function getNoSuchMovie() {
    return (
      <div id="editable_collection_no_items">
        No such movie found in our database.
      </div>
    );
  }

  function getCardsForItem(items) {
    let finalArray = [];
    let arrayOfdivs = [];
    let position_in_row = 0;

    for (let i = 0; i < items.length; i++) {
      if (position_in_row < parseInt(props.maxItemsPerRow)) {
        position_in_row++;
        arrayOfdivs.push(getCard(items[i].portrait_cover_image, i));
      } else {
        finalArray.push(
          <div
            id="rowHolder"
            key={"position " + i}
            style={{
              marginLeft: props.rowMarginLeft,
              height: props.height + props.marginTop,
            }}
          >
            {arrayOfdivs}
          </div>
        );
        position_in_row = 1;
        arrayOfdivs = [];
        arrayOfdivs.push(getCard(items[i].portrait_cover_image, i));
      }

      if (i === items.length - 1) {
        if (props.showPlusCard === true) {
          arrayOfdivs.push(
            getCard(
              "https://res.cloudinary.com/dodwfb1ar/image/upload/v1607446225/utils/Group_20_qymhs3.png",
              i + 1
            )
          );
        }

        finalArray.push(
          <div
            id="rowHolder"
            key={"position " + i}
            style={{ marginLeft: props.rowMarginLeft }}
          >
            {arrayOfdivs}
          </div>
        );
      }
    }

    return finalArray;
  }

  function getHolderWidth() {
    return parseInt(props.width) - props.borderWidth + "px";
  }

  function getHolderHeight() {
    return parseInt(props.height) - props.borderWidth + "px";
  }

  function onItemClick(event) {
    if (props.onItemClicked && items)
      props.onItemClicked(items[event.target.getAttribute("data-key")]);
  }

  function getCard(image_url, position) {
    return (
      <div
        id="cardHolder"
        data-key={position}
        onClick={onItemClick}
        style={{
          width: props.width,
          height: props.height,
          marginLeft: props.inBetweenMargin,
          marginTop: props.rowMrginTop,
          backgroundColor: props.borderColor,
          borderRadius: props.cardRadius,
        }}
      >
        <img
          id="portrait_holder"
          src={image_url}
          data-key={position}
          style={{
            width: getHolderWidth(),
            height: getHolderHeight(),
            marginLeft: props.borderWidth / 2 + "px",
            marginTop: props.borderWidth / 2 + "px",
            borderRadius: props.cardRadius,
          }}
        ></img>
      </div>
    );
  }

  function getAllItems(token) {
    axios({
      method: "get",
      url: "https://movie-test-app-2223.herokuapp.com/content/get",
      headers: {
        token: token,
        filter: props.searchValue ? getSearchFilterprops() : "",
      },
    }).then((response) => {
      if (response.data.response.length === 0) {
        items_to_be_displayed.push([getNoSuchMovie()]);
      } else {
        items_to_be_displayed.push(getCardsForItem(response.data.response));
      }
      items = response.data.response;
      setContent(response.data.response);
    });
  }

  function getSearchFilterprops() {
    console.log(props.searchValue);
    return (
      '{"title": { "$regex": "' + props.searchValue + '", "$options": "i" }}'
    );
  }

  function getSearchFilter(filter) {
    return '{"title": { "$regex": "' + filter + '", "$options": "i" }}';
  }

  return (
    <div>
      <div>
        {items_to_be_displayed.length > 0 ? items_to_be_displayed : null}
      </div>
    </div>
  );
}

export default forwardRef(EditableCollection);
