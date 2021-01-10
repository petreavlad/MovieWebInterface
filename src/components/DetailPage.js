import React, { useEffect } from "react";
import "./DetailPage.css";
import PersonRow from "../components/PersonRow";
import ReactStarsRating from "react-awesome-stars-rating";

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

  function getStars() {
    return props.item.stars.length > 0 ? (
      <div>
        <div id="detail_page_stars_title">
          <b>Stars:</b>
        </div>
        <PersonRow
          height="150px"
          width="100%"
          personCardDimension="150px"
          marginInBetween="50px"
          marginLeft="auto"
          resetEditText="true"
          marginRight="auto"
          marginBottom="60px"
          addIconText="Add Star"
          personArray={props.item ? props.item.stars : []}
        ></PersonRow>
      </div>
    ) : null;
  }

  function getCreators() {
    return props.item.creators.length > 0 ? (
      <div>
        <div id="detail_page_stars_title">
          <b>Creators:</b>
        </div>
        <PersonRow
          height="150px"
          width="100%"
          personCardDimension="150px"
          marginInBetween="50px"
          marginTop="20px"
          marginLeft="auto"
          resetEditText="true"
          marginRight="auto"
          marginBottom="60px"
          addIconText="Add Star"
          personArray={props.item.creators ? props.item.creators : []}
        ></PersonRow>
      </div>
    ) : null;
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
        <div id="detail_page_rating_holder">
          <ReactStarsRating count="10" value={parseFloat(props.item.rating)} />
          <div id="detail_page_rating_text">
            {parseFloat(props.item.rating)}
          </div>
        </div>
        <div id="detail_page_description">{props.item.description}</div>
        {getStars()}
        {getCreators()}
      </div>
    </div>
  );
}

export default DetailPage;
