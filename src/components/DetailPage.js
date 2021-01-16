import React, { useEffect, useState, useRef } from "react";
import "./DetailPage.css";
import PersonRow from "../components/PersonRow";
import ReactStarsRating from "react-awesome-stars-rating";
import CommentBox from "./CommentTextBox";
import axios from "axios";

function DetailPage(props) {
  var textBoxRef = useRef();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const SHOW_MORE_AFTER = 5;
  var currentShownMessages = SHOW_MORE_AFTER;

  const [messages, setMessages] = useState(null);
  const [messageInfo, setMessagesInfo] = useState([]);

  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      if (props.onBackPress) props.onBackPress();
    });

    if (props.item.messages && props.item.messages.length > 0) {
      setMessagesInfo(props.item.messages.reverse());
    }
  }, []);

  useEffect(() => {
    setMessages(getMessages());
  }, [messageInfo]);

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

  function getMessages() {
    let arrayOfMessageDiv = [];

    for (let i = 0; i < currentShownMessages; i++) {
      if (messageInfo.length <= i) {
        break;
      }
      arrayOfMessageDiv.push(getOneMessage(messageInfo[i]));
    }

    arrayOfMessageDiv.reverse();

    if (currentShownMessages < messageInfo.length) {
      arrayOfMessageDiv.unshift(getShowMoreMessages());
    }

    return messageInfo.length > 0 ? (
      <div id="detail_page_messages_holder">
        <div id="detail_page_message_title">
          <b>Comments ({messageInfo.length})</b>
        </div>
        {arrayOfMessageDiv}
      </div>
    ) : null;
  }

  function onShowMoreClicked() {
    currentShownMessages += SHOW_MORE_AFTER;
    setMessages(getMessages());
  }

  function getShowMoreMessages() {
    return (
      <div onClick={onShowMoreClicked} id="detail_page_show_more_holder">
        <div id="detail_page_show_more_text">
          <b>
            <u>Show older comments</u>
          </b>
        </div>
      </div>
    );
  }

  function onDeleteMessage(event) {
    var messageId = event.target.getAttribute("data-key");
    axios({
      method: "delete",
      url: "https://movie-test-app-2223.herokuapp.com/content/message",
      headers: { token: localStorage.getItem("user_token") },
      params: { content_id: props.item.content_id, message_id: messageId },
    })
      .then(function (response) {
        textBoxRef.current.hideSpinner();
        textBoxRef.current.setText("");
        setMessagesInfo(response.data.messages.reverse());
      })
      .catch(function (error) {
        console.log(error);
        textBoxRef.current.hideSpinner();
      });
  }

  function getOneMessage(item) {
    let date = new Date(parseInt(item.timestamp));
    return (
      <div id="detail_page_message_holder">
        <img
          id="detail_page_delete_button"
          src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1610811944/utils/delete_asset_button_reverted_axsax8.png"
          onClick={onDeleteMessage}
          data-key={item.message_id}
          style={{
            visibility:
              localStorage.getItem("user_username") === item.user
                ? "visible"
                : "hidden",
          }}
        ></img>
        <div id="detail_page_message_user_holder">
          <img id="detail_page_message_image" src={item.user_image}></img>
          <div id="detail_page_message_user">
            <u>
              <b>{item.user}</b>
            </u>
          </div>
        </div>
        <div id="detail_page_message_text">{item.message}</div>
        <div id="detail_page_message_timestamp">
          {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}{" "}
          {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </div>
      </div>
    );
  }

  function newComment(text) {
    axios({
      method: "post",
      url: "https://movie-test-app-2223.herokuapp.com/content/message",
      data: {
        message: text,
      },
      headers: { token: localStorage.getItem("user_token") },
      params: { content_id: props.item.content_id },
    })
      .then(function (response) {
        textBoxRef.current.hideSpinner();
        textBoxRef.current.setText("");
        setMessagesInfo(response.data.messages.reverse());
      })
      .catch(function (error) {
        console.log(error);
        textBoxRef.current.hideSpinner();
      });
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
        {messages}
        <CommentBox ref={textBoxRef} onEnterPressed={newComment}></CommentBox>
      </div>
    </div>
  );
}

export default DetailPage;
