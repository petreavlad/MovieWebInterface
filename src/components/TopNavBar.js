import React, { useState } from "react";
import "./TopNavBar.css";
import EditText from "../components/EditText";

function TopNavBar(props) {
  const [show_menu, setShowMenu] = useState("hidden");

  function onItemClick() {
    setShowMenu(show_menu === "hidden" ? "visible" : "hidden");
  }

  function onMenuItemClicked(event) {
    if (props.onMenuItemClicked) {
      props.onMenuItemClicked(event.target.getAttribute("data-key"));
      setShowMenu("hidden");
    }
  }

  function getMenuItems(imageUrl, text, key, first, last) {
    return (
      <div key={key + "holder"} data-key={key}>
        <div
          key={key + "menu_item_holder"}
          data-key={key}
          id="menu_item_holder"
          style={{
            borderTopLeftRadius: first ? "20px" : "0 px",
            borderTopRightRadius: first ? "20px" : "0px",
            borderBottomLeftRadius: last ? "20px" : "0px",
            borderBottomRightRadius: last ? "20px" : "0px",
          }}
          onClick={onMenuItemClicked}
        >
          <img
            key={key + "menu_item_image"}
            data-key={key}
            id="menu_item_image"
            src={imageUrl}
          ></img>
          <div key={key + "menu_item_text"} data-key={key} id="menu_item_text">
            <b key={key + "_b"} data-key={key}>
              {text}
            </b>
          </div>
        </div>
      </div>
    );
  }

  function getAllMenuItems() {
    let array = [];
    array.push(
      getMenuItems(
        "https://res.cloudinary.com/dodwfb1ar/image/upload/v1609265714/utils/home_nwb94j.png",
        "Home",
        "HOME_MENU_KEY",
        true
      )
    );
    array.push(
      getMenuItems(
        "https://res.cloudinary.com/dodwfb1ar/image/upload/v1609544670/utils/document_koy9po.png",
        "API documentation",
        "DOCUMENTATION_PAGE",
        false,
        false
      )
    );
    array.push(
      getMenuItems(
        "https://res.cloudinary.com/dodwfb1ar/image/upload/v1609269156/utils/admin-with-cogwheels_wo6bcc.png",
        "Admin collection",
        "ADMIN_MENU_PAGE",
        false,
        true
      )
    );

    return array;
  }

  function onKeyDown(event, text) {
    if (props.onEnterPressed && event.key === "Enter") {
      props.onEnterPressed(text);
    }
  }

  return (
    <div key="top_nav_bar">
      <div key="nav_bar_holder" className="nav_bar_holder">
        <img key="menu_icon" id="menu_icon" onClick={onItemClick}></img>
        <img
          key="filter_icon"
          className="filter_icon"
          src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1605191504/utils/filter_icon_zyoxnv.png"
        ></img>
        <EditText
          className="search_edit_text"
          width="60vh"
          margin_top="1.5vh"
          margin_left="2.5vh"
          padding_top="1vh"
          placeholder="Search"
          onKeyDown={onKeyDown}
          height="5vh"
        ></EditText>
        <img
          className="user_round_image"
          src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1601644311/utils/download_xlauab.jpg"
        ></img>
      </div>
      <div id="menu_dropdown" style={{ visibility: show_menu }}>
        {getAllMenuItems()}
      </div>
    </div>
  );
}

export default TopNavBar;
