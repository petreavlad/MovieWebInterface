import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import "./DetailPage.css";
import ItemEditableDetails from "./ItemEditableDetails";

function DetailPage(props) {
  useEffect(() => {
    BackHandler.handleBackButtonClick = onBackPressed;
  }, []);

  function onBackPressed() {}

  return (
    <div id="detail_page_holder">
      <div id="detail_page_background">
        <iframe
          id="youtube_video"
          width="700"
          height="400"
          src={props.item.youtube_link}
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        ></iframe>
        <div id="detail_page_title">
          <u>{props.item.title}</u>
        </div>
        <div id="detail_page_subtitle"></div>
      </div>
    </div>
  );
}

export default DetailPage;
