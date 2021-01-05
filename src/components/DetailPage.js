import React, { useEffect } from "react";
import "./DetailPage.css";

function DetailPage(props) {
  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      if (props.onBackPress) props.onBackPress();
    });
  }, []);

  function getSubtitle() {
    var subtitle = "";

    for (let genre of props.item.genres) {
      subtitle += genre + ",";
    }
    subtitle = subtitle.slice(0, -1) + " | " + props.item.year;

    return subtitle;
  }

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
          <u>
            <b>{props.item.title}</b>
          </u>
        </div>
        <div id="detail_page_subtitle_text">{getSubtitle()}</div>
        <div id="detail_page_description">{props.item.description}</div>
      </div>
    </div>
  );
}

export default DetailPage;
