import React, { useRef, useEffect } from "react";
import EditText from "./EditText";
import PersonRow from "../components/PersonRow";
import "./ItemEditableDetails.css";
import axios from "axios";

function ItemEditableDetails(props) {
  var starRowRef = useRef();
  var creatorRowRef = useRef();

  useEffect(() => {}, []);

  function onStarClicked(person) {
    if (person == "ADD_CARD") {
    }
  }

  function onxClickedStars(person) {
    axios
      .delete("https://movie-test-app-2223.herokuapp.com/content/star", {
        params: {
          person_id: person.person_id,
          content_id: props.itemDetails.content_id,
        },
        headers: {
          token: localStorage.getItem("user_token"),
        },
      })
      .then((response) => {
        if (starRowRef) {
          starRowRef.current.deleteItem(person.person_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onxClickedCreators(person) {
    axios
      .delete("https://movie-test-app-2223.herokuapp.com/content/creator", {
        params: {
          person_id: person.person_id,
          content_id: props.itemDetails.content_id,
        },
        headers: {
          token: localStorage.getItem("user_token"),
        },
      })
      .then((response) => {
        if (creatorRowRef) {
          creatorRowRef.current.deleteItem(person.person_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="detail_holder">
      <EditText
        id="title_container"
        margin_top="1vh"
        margin_right="2.5vh"
        padding_top="2vh"
        height="4vh"
        width="100vh"
        margin_left="2vh"
        text={props.itemDetails.title ? props.itemDetails.title : ""}
        placeholder="Title"
      ></EditText>
      <div id="portrait_image_title">Portrait Poster Image:</div>
      <img
        id="portrait_image"
        src={props.itemDetails.portrait_cover_image}
      ></img>
      <div id="wide_image_title">Wide Poster Image:</div>
      <img id="wide_image" src={props.itemDetails.wide_cover_image}></img>
      <EditText
        id="title_container"
        margin_top="1vh"
        margin_right="2.5vh"
        padding_top="2vh"
        height="4vh"
        width="100vh"
        margin_left="2vh"
        text={props.itemDetails.year ? props.itemDetails.year : ""}
        placeholder="Year"
      ></EditText>
      <EditText
        id="title_container"
        margin_top="1vh"
        margin_right="2.5vh"
        padding_top="2vh"
        height="4vh"
        width="100vh"
        margin_left="2vh"
        text={props.itemDetails.rating ? props.itemDetails.rating : ""}
        placeholder="Rating"
      ></EditText>
      <EditText
        id="title_container"
        margin_top="1vh"
        margin_right="2.5vh"
        padding_top="2vh"
        height="300px"
        width="100vh"
        margin_left="2vh"
        whiteSpace="none"
        resize="vertical"
        textAlign="start"
        text={
          props.itemDetails.description ? props.itemDetails.description : ""
        }
        placeholder="Description"
      ></EditText>
      <EditText
        id="title_container"
        margin_top="1vh"
        margin_right="2.5vh"
        padding_top="2vh"
        height="4vh"
        width="100vh"
        margin_left="2vh"
        textAlign="start"
        text={
          props.itemDetails.genres.toString()
            ? props.itemDetails.genres.toString()
            : ""
        }
        placeholder="Genres"
      ></EditText>
      <iframe
        width="507"
        height="300"
        src={props.itemDetails.youtube_link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <EditText
        id="title_container"
        margin_top="1vh"
        margin_right="2.5vh"
        padding_top="2vh"
        height="4vh"
        width="100vh"
        margin_left="2vh"
        textAlign="start"
        text={
          props.itemDetails.youtube_link ? props.itemDetails.youtube_link : ""
        }
        placeholder="Youtube Embeded Link"
      ></EditText>

      <div id="person_stripe_title">Stars:</div>
      <PersonRow
        height="150px"
        width="100%"
        personCardDimension="150px"
        marginInBetween="50px"
        marginTop="20px"
        marginLeft="auto"
        marginRight="auto"
        addIconImage="https://res.cloudinary.com/dodwfb1ar/image/upload/v1608407467/utils/Add_person_1_n9x8p3.png"
        xButtonDimmension="25px"
        addIconText="Add Star"
        xMarginStart="110px"
        onItemClicked={onStarClicked}
        ref={starRowRef}
        onxClick={onxClickedStars}
        personArray={props.itemDetails.stars}
      ></PersonRow>
      <div
        id="person_stripe_title"
        style={{
          marginTop: "40px",
        }}
      >
        Creators:
      </div>
      <PersonRow
        height="150px"
        width="100%"
        personCardDimension="150px"
        marginInBetween="50px"
        marginTop="20px"
        marginLeft="auto"
        marginRight="auto"
        xButtonDimmension="25px"
        onxClick={onxClickedCreators}
        addIconText="Add Creator"
        addIconImage="https://res.cloudinary.com/dodwfb1ar/image/upload/v1608407467/utils/Add_person_1_n9x8p3.png"
        xMarginStart="110px"
        ref={creatorRowRef}
        personArray={props.itemDetails.creators}
      ></PersonRow>
      <div id="class_button_holder">
        <button id="update_button_style">Update</button>
      </div>
    </div>
  );
}

export default ItemEditableDetails;
