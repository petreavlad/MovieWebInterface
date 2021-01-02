import React, { useEffect, useState, useRef } from "react";
import "./ContentStripe.css";
import axios from "axios";

function ContentStripe(props) {
  var holderRef = useRef();

  const [content, setContent] = useState([]);
  const [divArray, setDivArray] = useState([]);
  const [leftArrowVisibility, setLeftArrowVisibility] = useState("hidden");
  const [rightArrowVisibility, setRightArrowVisibility] = useState("hidden");

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    let array = [];
    var i = 0;
    for (let item of content) {
      array.push(getCardDiv(i++, item));
    }
    array.push(getEmptyCardSpace());
    setDivArray(array);
  }, [content]);

  function getContent() {
    axios({
      method: "GET",
      url: "https://movie-test-app-2223.herokuapp.com/content",
      headers: {
        token: localStorage.getItem("user_token"),
        filter:
          '{ "genres": { "$regex": "' + props.filter + '", "$options": "i" } }',
      },
    })
      .then((response) => {
        if (response.data.code === 200) setContent(response.data.response);
      })
      .catch((error) => console.log(error));
  }

  function getCardDiv(index, image) {
    return (
      <div
        id="content_card_holder"
        key={index}
        style={{
          height: props.height,
          minWidth: props.cardWidth,
          marginLeft: "20px",
          backgroundColor: props.borderColor,
        }}
      >
        <img
          id="content_card_imge"
          src={image.portrait_cover_image}
          style={{
            height: getImageHeight(),
            width: getImageWidth(),
            minWidth: getImageWidth(),
            marginTop: parseInt(props.borderWidth) / 2 + "vh",
            marginLeft: parseInt(props.borderWidth) / 2 + "vh",
          }}
        ></img>
      </div>
    );
  }
  function getEmptyCardSpace() {
    return (
      <div
        id="content_card_holder"
        key={"extra_card"}
        style={{
          height: props.height,
          minWidth: props.cardWidth,
          marginLeft: "20px",
        }}
      ></div>
    );
  }

  function getImageHeight() {
    return parseInt(props.height) - parseInt(props.borderWidth) + "vh";
  }

  function getImageWidth() {
    return parseInt(props.cardWidth) - parseInt(props.borderWidth) + "vh";
  }

  return (
    <div
      onMouseEnter={(event) => {
        if (
          holderRef.current.scrollLeft <
          holderRef.current.scrollWidth - holderRef.current.clientWidth
        ) {
          setLeftArrowVisibility("visible");
        }

        if (holderRef.current.scrollLeft > 0) {
          setRightArrowVisibility("visible");
        }
      }}
      onMouseLeave={(event) => {
        setLeftArrowVisibility("hidden");
        setRightArrowVisibility("hidden");
      }}
    >
      <div
        id="stripe_title_holder"
        style={{ marginLeft: props.titlePaddingLeft }}
      >
        <u>
          <b> {props.title}</b>
        </u>
      </div>
      <img
        onClick={() => {
          holderRef.current.scrollLeft += 1600;
          if (
            holderRef.current.scrollLeft + 1600 >
            holderRef.current.scrollWidth - holderRef.current.clientWidth
          ) {
            setLeftArrowVisibility("hidden");
          }

          setRightArrowVisibility("visible");
        }}
        id="content_stripe_right_arrow"
        style={{
          height: parseInt(props.height) / 2 + "vh",
          minHeight: parseInt(props.height) / 2 + "vh",
          marginTop: parseInt(props.height) / 4 + 2.5 + "vh",
          minWidth: parseInt(props.cardWidth) / 2,
          visibility: leftArrowVisibility,
        }}
      ></img>
      <img
        id="content_stripe_left_arrow"
        style={{
          height: parseInt(props.height) / 2 + "vh",
          minHeight: parseInt(props.height) / 2 + "vh",
          marginTop: parseInt(props.height) / 4 + 2.5 + "vh",
          minWidth: parseInt(props.cardWidth) / 2,
          visibility: rightArrowVisibility,
        }}
        onClick={(event) => {
          holderRef.current.scrollLeft -= 1600;
          if (
            holderRef.current.scrollLeft + 1600 <
            holderRef.current.scrollWidth - holderRef.current.clientWidth
          ) {
            setLeftArrowVisibility("visible");
          }

          if (holderRef.current.scrollLeft - 1600 <= 0) {
            setRightArrowVisibility("hidden");
          }
        }}
      ></img>
      <div
        id="content_stripe_holder"
        style={{
          height: props.width,
          width: props.width,
          paddingLeft: props.paddingLeft,
        }}
        ref={holderRef}
      >
        {divArray ? divArray : null}
      </div>
    </div>
  );
}

export default ContentStripe;
