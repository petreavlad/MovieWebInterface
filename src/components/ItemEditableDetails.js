import React, { useRef, useEffect, useState } from "react";
import EditText from "./EditText";
import PersonRow from "../components/PersonRow";
import "./ItemEditableDetails.css";
import axios from "axios";
import AddNewPersonDialog from "../components/AddNewPersonDialog";
import { getBackgroundListener } from "../utils/StateHandler";

function ItemEditableDetails(props) {
  const [content, setContent] = useState({});

  var photo_type = "";
  var pageReferences = {
    dialog: useRef(),
    starRowRef: useRef(),
    creatorRowRef: useRef(),
    inputFileRef: useRef(),
    titleEditText: useRef(),
    yearEditText: useRef(),
    ratingEditText: useRef(),
    decriptionEditText: useRef(),
    genresEditText: useRef(),
    youtubeEditText: useRef(),
  };

  useEffect(() => {
    if (props.itemDetails) {
      pageReferences.titleEditText.current.setText(props.itemDetails.title);
      pageReferences.yearEditText.current.setText(props.itemDetails.year);
      pageReferences.ratingEditText.current.setText(props.itemDetails.rating);
      pageReferences.decriptionEditText.current.setText(
        props.itemDetails.description
      );
      pageReferences.genresEditText.current.setText(props.itemDetails.genres);
      pageReferences.youtubeEditText.current.setText(
        props.itemDetails.youtube_link
      );
      setContent(props.itemDetails);
    }
  }, []);

  function onPhotoChosen(event) {
    if (event.target.files[0]) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (response) => {
        setContent(
          getNewContentItems(file, response.target.result, photo_type)
        );
      };
    }
  }

  function getNewContentItems(file, result, photo_type) {
    return {
      title: content.title,
      description: content.description,
      year: content.year,
      rating: content.rating,
      youtube_link: content.youtube_link,
      genres: content.genres,
      stars: content.stars,
      creators: content.creators,
      portrait_cover_image:
        photo_type === "portrait_image" ? result : content.portrait_cover_image,
      portrait_cover_image_file:
        photo_type === "portrait_image"
          ? file
          : content.portrait_cover_image_file,
      wide_cover_image:
        photo_type === "wide_image" ? result : content.wide_cover_image,
      wide_cover_image_file:
        photo_type === "wide_image" ? file : content.wide_cover_image_file,
    };
  }

  function onStarClicked(person) {
    var listener = getBackgroundListener();
    if (listener && listener.setVisibility) {
      if (person === "ADD_NEW_STAR") {
        pageReferences.dialog.current.setPersonType("ADD_NEW_STAR");
      }

      if (person === "ADD_NEW_CREATOR") {
        pageReferences.dialog.current.setPersonType("ADD_NEW_CREATOR");
      }
      listener.setVisibility("visible");
      pageReferences.dialog.current.setDialogVisibility("visible");
    }
  }

  function onxClickedStars(person) {
    axios
      .delete("https://movie-test-app-2223.herokuapp.com/content/star", {
        params: {
          person_id: person.person_id,
          content_id: content.content_id,
        },
        headers: {
          token: localStorage.getItem("user_token"),
        },
      })
      .then((response) => {
        if (pageReferences.starRowRef) {
          pageReferences.starRowRef.current.deleteItem(person.person_id);
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
          content_id: content.content_id,
        },
        headers: {
          token: localStorage.getItem("user_token"),
        },
      })
      .then((response) => {
        if (pageReferences.creatorRowRef) {
          pageReferences.creatorRowRef.current.deleteItem(person.person_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateContentItem() {
    var bodyFormData = new FormData();
    bodyFormData.append("genres", content.genres);
    bodyFormData.append("title", content.title);
    bodyFormData.append("description", content.description);
    bodyFormData.append("rating", content.rating);
    bodyFormData.append("year", content.year);
    bodyFormData.append("youtube_link", content.youtube_link);
    bodyFormData.append(
      "portrait_cover_image",
      content.portrait_cover_image_file
    );
    bodyFormData.append("wide_cover_image", content.wide_cover_image_file);
    if (props.itemDetails && props.itemDetails.content_id) {
      axios({
        method: "post",
        url: "https://movie-test-app-2223.herokuapp.com/content/update",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("user_token"),
        },
        params: { content_id: props.itemDetails.content_id },
      })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "post",
        url: "https://movie-test-app-2223.herokuapp.com/content/add",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("user_token"),
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onNewPersonAdded(data, type) {
    if (type === "ADD_NEW_STAR") {
      pageReferences.starRowRef.current.replaceItems(data.stars);
    }
    if (type === "ADD_NEW_CREATOR") {
      pageReferences.creatorRowRef.current.replaceItems(data.creators);
    }
  }

  return (
    <div>
      <AddNewPersonDialog
        content_id={props.itemDetails ? props.itemDetails.content_id : ""}
        ref={pageReferences.dialog}
        onSaveListener={onNewPersonAdded}
      ></AddNewPersonDialog>
      <div className="detail_holder">
        <EditText
          id="title_container"
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          resetEditText="true"
          height="4vh"
          width="100vh"
          margin_left="2vh"
          ref={pageReferences.titleEditText}
          text={content.title ? content.title : ""}
          onChange={(text) => {
            let item = content;
            item.title = text;
            setContent(item);
          }}
          placeholder="Title"
        ></EditText>
        <div id="portrait_image_title">Portrait Poster Image:</div>
        <img
          id="portrait_image"
          onClick={(event) => {
            photo_type = "portrait_image";
            pageReferences.inputFileRef.current.click();
          }}
          data-key={"portrait_image"}
          src={
            content.portrait_cover_image
              ? content.portrait_cover_image
              : "http://res.cloudinary.com/dodwfb1ar/image/upload/v1608481487/utils/Group_36_1_ppwgei.png"
          }
        ></img>
        <div id="wide_image_title">Wide Poster Image:</div>
        <img
          id="wide_image"
          onClick={(event) => {
            photo_type = "wide_image";
            pageReferences.inputFileRef.current.click();
          }}
          src={
            content.wide_cover_image
              ? content.wide_cover_image
              : "http://res.cloudinary.com/dodwfb1ar/image/upload/v1608481259/utils/Group_36_o1ypmn.png"
          }
        ></img>
        <EditText
          id="title_container"
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          resetEditText="true"
          height="4vh"
          width="100vh"
          ref={pageReferences.yearEditText}
          margin_left="2vh"
          onChange={(text) => {
            let item = content;
            item.year = text;
            setContent(item);
          }}
          text={content.year ? content.year : ""}
          placeholder="Year"
        ></EditText>
        <EditText
          id="title_container"
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          resetEditText="true"
          height="4vh"
          width="100vh"
          margin_left="2vh"
          ref={pageReferences.ratingEditText}
          text={content.rating ? content.rating : ""}
          onChange={(text) => {
            let item = content;
            item.rating = text;
            setContent(item);
          }}
          placeholder="Rating"
        ></EditText>
        <EditText
          id="title_container"
          margin_top="1vh"
          margin_right="2.5vh"
          resetEditText="true"
          padding_top="2vh"
          height="300px"
          width="100vh"
          margin_left="2vh"
          whiteSpace="none"
          resize="vertical"
          textAlign="start"
          ref={pageReferences.decriptionEditText}
          text={content.description ? content.description : ""}
          onChange={(text) => {
            let item = content;
            item.description = text;
            setContent(item);
          }}
          placeholder="Description"
        ></EditText>
        <EditText
          id="title_container"
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          resetEditText="true"
          height="4vh"
          width="100vh"
          margin_left="2vh"
          textAlign="start"
          ref={pageReferences.genresEditText}
          text={
            content.genres && content.genres.toString()
              ? content.genres.toString()
              : ""
          }
          onChange={(text) => {
            let item = content;
            item.genres = text.split(",");
            setContent(item);
          }}
          placeholder="Genres"
        ></EditText>
        <iframe
          width="507"
          height="300"
          src={content.youtube_link}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            background: "#88304E",
          }}
        ></iframe>
        <EditText
          id="title_container"
          margin_top="1vh"
          margin_right="2.5vh"
          resetEditText="true"
          padding_top="2vh"
          height="4vh"
          width="100vh"
          margin_left="2vh"
          textAlign="start"
          ref={pageReferences.youtubeEditText}
          text={content.youtube_link ? content.youtube_link : ""}
          onChange={(text) => {
            let item = content;
            item.youtube_link = text;
            setContent(item);
          }}
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
          resetEditText="true"
          marginRight="auto"
          addIconImage="http://res.cloudinary.com/dodwfb1ar/image/upload/v1608407467/utils/Add_person_1_n9x8p3.png"
          xButtonDimmension="25px"
          addIconText="Add Star"
          personType="ADD_NEW_STAR"
          xMarginStart="110px"
          onItemClicked={onStarClicked}
          ref={pageReferences.starRowRef}
          onxClick={onxClickedStars}
          personArray={props.itemDetails ? props.itemDetails.stars : []}
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
          resetEditText="true"
          marginLeft="auto"
          marginRight="auto"
          personType="ADD_NEW_CREATOR"
          xButtonDimmension="25px"
          onItemClicked={onStarClicked}
          onxClick={onxClickedCreators}
          addIconText="Add Creator"
          addIconImage="http://res.cloudinary.com/dodwfb1ar/image/upload/v1608407467/utils/Add_person_1_n9x8p3.png"
          xMarginStart="110px"
          ref={pageReferences.creatorRowRef}
          personArray={props.itemDetails ? props.itemDetails.creators : []}
        ></PersonRow>
        <div>
          <button
            id="update_button_style"
            onClick={() => {
              updateContentItem();
            }}
          >
            {props.itemDetails ? "Update" : "Add new content"}
          </button>
        </div>
        <input
          className="photo_file_manager_registration"
          type="file"
          accept="image/x-png,image/jpg,image/jpeg"
          ref={pageReferences.inputFileRef}
          onChange={onPhotoChosen}
          style={{ visibility: "hidden" }}
        />
      </div>
    </div>
  );
}

export default ItemEditableDetails;
