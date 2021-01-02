import React from "react";
import "../pages/home.css";
import TopNavBar from "../components/TopNavBar";
import Galery from "../components/Galery";
import EditableCollection from "../components/EditableCollection";
import GalleryDetails from "../components/GalleryDetail";
import ContentStripe from "../components/ContentStripe";
import ItemEditableDetails from "../components/ItemEditableDetails";
import ApiDocumentationPage from "../components/ApiDocumentationPage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { setBackgroundListener } from "../utils/StateHandler";

var selectedItemData;

function HomePage() {
  const [darkBackgroundVisibility, setDarkBackgroundVisibility] = useState(
    "hidden"
  );
  const [pageNumber, setPageNumber] = useState(0);
  var galleryRef = useRef();
  var galleryContent;

  useEffect(() => {
    setBackgroundListener({ setVisibility });
  }, []);

  useEffect(() => {
    if (pageNumber === 0) {
      retrieveGalleryData(localStorage.getItem("user_token"));
    }
  }, [pageNumber]);

  function setVisibility(visible) {
    setDarkBackgroundVisibility(visible);
  }

  function retrieveGalleryData(token) {
    axios
      .get("https://movie-test-app-2223.herokuapp.com/content/", {
        headers: {
          token: token,
          limit: 10,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        galleryContent = response.data.response;
        var imageArray = [];

        for (let i = 0; i < galleryContent.length; i++) {
          imageArray.push(galleryContent[i].wide_cover_image);
        }

        galleryRef.current.addElements(imageArray);
        if (pageNumber === 0) setTimeout(startGalleryTimer, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function startGalleryTimer() {
    if (galleryRef && galleryRef.current)
      galleryRef.current.startScrolling(2000);
  }

  function onNavClicked(key) {
    switch (key) {
      case "HOME_MENU_KEY":
        setPageNumber(0);
        break;
      case "ADMIN_MENU_PAGE":
        setPageNumber(1);
        break;
      case "DOCUMENTATION_PAGE":
        setPageNumber(3);
        break;
    }
  }

  function onCollectionItemClicked(item) {
    selectedItemData = item;
    setPageNumber(2);
  }

  function getHomePage() {
    return (
      <div>
        <div id="home_gallery_holder">
          <Galery
            ref={galleryRef}
            height="450px"
            width="800px"
            marginTop="100px"
            marginLeft="100px"
            dot_dimension="15px"
            dot_marginBottom="10px"
            dot_between_margin="10px"
            dot_unselected_color="#E23E57"
            dot_selected_color="#88304E"
          ></Galery>
          <GalleryDetails
            height="450px"
            width="800px"
            marginTop="100px"
            marginLeft="1000px"
            backgroundColor="#E23E57"
          ></GalleryDetails>
        </div>
        <ContentStripe
          height="30vh"
          borderWidth="1vh"
          width="100%"
          cardWidth="18vh"
          paddingLeft="8vh"
          borderColor="#E23E57"
          titlePaddingLeft="12vh"
          title="Action"
          marginTop="1vh"
          filter="Action"
        ></ContentStripe>
        <ContentStripe
          height="30vh"
          borderWidth="1vh"
          width="100%"
          cardWidth="18vh"
          paddingLeft="8vh"
          borderColor="#E23E57"
          titlePaddingLeft="12vh"
          title="Drama"
          marginTop="1vh"
          filter="Drama"
        ></ContentStripe>
        <ContentStripe
          height="30vh"
          borderWidth="1vh"
          width="100%"
          cardWidth="18vh"
          paddingLeft="8vh"
          borderColor="#E23E57"
          titlePaddingLeft="12vh"
          title="Comedy"
          marginTop="1vh"
          filter="Comedy"
        ></ContentStripe>
        <ContentStripe
          height="30vh"
          borderWidth="1vh"
          width="100%"
          cardWidth="18vh"
          paddingLeft="8vh"
          borderColor="#E23E57"
          titlePaddingLeft="12vh"
          title="Animation"
          marginTop="1vh"
          filter="Animation"
        ></ContentStripe>
      </div>
    );
  }

  function getAddElements() {
    return (
      <EditableCollection
        maxItemsPerRow="6"
        width="200px"
        height="363px"
        inBetweenMargin="30px"
        rowMrginTop="50px"
        rowMarginLeft="25px"
        borderWidth="10"
        borderColor="#E23E57"
        cardRadius="30px"
        showPlusCard={true}
        onItemClicked={onCollectionItemClicked}
      ></EditableCollection>
    );
  }

  function getApiPage() {
    return <ApiDocumentationPage></ApiDocumentationPage>;
  }

  function getEditableDetailPage() {
    return (
      <ItemEditableDetails itemDetails={selectedItemData}></ItemEditableDetails>
    );
  }

  function getPage() {
    switch (pageNumber) {
      case 1:
        return getAddElements();
      case 2:
        return getEditableDetailPage();
      default:
      case 3:
        return getApiPage();
      case 0:
        return getHomePage();
    }
  }

  return (
    <div>
      <div
        id="dark_background"
        style={{ visibility: darkBackgroundVisibility }}
      ></div>
      <TopNavBar onMenuItemClicked={onNavClicked}></TopNavBar>
      <div>{getPage()}</div>
    </div>
  );
}

export default HomePage;
