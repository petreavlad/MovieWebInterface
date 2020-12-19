import React from "react";
import "../pages/home.css";
import TopNavBar from "../components/TopNavBar";
import Galery from "../components/Galery";
import EditableCollection from "../components/EditableCollection";
import GalleryDetails from "../components/GalleryDetail";
import ItemEditableDetails from "../components/ItemEditableDetails";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

var selectedItemData;

function HomePage() {
  const [pageNumber, setPageNumber] = useState(0);
  var galleryRef = useRef();
  var galleryContent;

  useEffect(() => {
    if (pageNumber === 0) {
      retrieveGalleryData(localStorage.getItem("user_token"));
    }
  }, []);

  function retrieveGalleryData(token) {
    axios({
      method: "get",
      url: "https://movie-test-app-2223.herokuapp.com/content/",
      headers: { token: token, limit: 10 },
    }).then((response) => {
      galleryContent = response.data.response;
      var imageArray = [];

      for (let i = 0; i < galleryContent.length; i++) {
        imageArray.push(galleryContent[i].wide_cover_image);
      }

      galleryRef.current.addElements(imageArray);
      if (pageNumber === 0) setTimeout(startGalleryTimer, 1000);
    });
  }

  function startGalleryTimer() {
    if (galleryRef && galleryRef.current)
      galleryRef.current.startScrolling(2000);
  }

  function onNavClicked(key) {
    if (key === "MENU_KEY") {
      setPageNumber(1);
    }
  }

  function onCollectionItemClicked(item) {
    selectedItemData = item;
    setPageNumber(2);
  }

  function getHomePage() {
    return (
      <div>
        <Galery
          ref={galleryRef}
          height="450px"
          width="800px"
          marginTop="100px"
          marginLeft="100px"
          dot_dimension="15px"
          dot_marginBottom="10px"
          dot_between_margin="10px"
          dot_unselected_color="#3fa7b1"
          dot_selected_color="#FF003A"
        ></Galery>
        <GalleryDetails
          height="450px"
          width="800px"
          marginTop="100px"
          marginRight="100px"
          backgroundColor="#E23E57"
        ></GalleryDetails>
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
      case 0:
        return getHomePage();
    }
  }

  return (
    <div>
      <TopNavBar onClick={onNavClicked}></TopNavBar>
      <div>{getPage()}</div>
    </div>
  );
}

export default HomePage;
