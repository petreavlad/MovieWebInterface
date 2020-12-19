import React, { useEffect } from "react";
import EditText from "./EditText";
import PersonRow from "../components/PersonRow";
import "./ItemEditableDetails.css";

function ItemEditableDetails(props) {
  useEffect(() => {
    console.log(props.itemDetails.title);
  }, []);

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
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
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
      <PersonRow
        height="25vh"
        width="600px"
        marginTop="20px"
        marginLeft="auto"
        marginRight="auto"
      ></PersonRow>
      <div id="class_button_holder">
        <button id="update_button_style">Update</button>
      </div>
    </div>
  );
}

export default ItemEditableDetails;
