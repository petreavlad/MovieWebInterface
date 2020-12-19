import React from "react";
import "./TopNavBar.css";
import EditText from "../components/EditText";

function TopNavBar(props) {
  function onItemClick() {
    if (props.onClick) {
      props.onClick("MENU_KEY");
    }
  }

  return (
    <div className="nav_bar_holder">
      <img
        className="menu_icon"
        onClick={onItemClick}
        src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1605190472/utils/menu_icon_e6qdx4.png"
      ></img>
      <img
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
        height="5vh"
      ></EditText>
      <img
        className="user_round_image"
        src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1601644311/utils/download_xlauab.jpg"
      ></img>
    </div>
  );
}

export default TopNavBar;
