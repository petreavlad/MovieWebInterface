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
import DetailPage from "../components/DetailPage";

var selectedItemData;

function HomePage() {
  const [darkBackgroundVisibility, setDarkBackgroundVisibility] = useState(
    "hidden"
  );
  const [pageNumber, setPageNumber] = useState(0);
  var galleryRef = useRef();
  var searchRef = useRef();
  var galleryContent;

  useEffect(() => {
    setBackgroundListener({ setVisibility });
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  useEffect(() => {
    if (pageNumber === 0) {
      retrieveGalleryData(localStorage.getItem("user_token"));
    }
    console.log(pageNumber);
  }, [pageNumber]);

  function setVisibility(visible) {
    setDarkBackgroundVisibility(visible);
  }

  function retrieveGalleryData(token) {
    axios
      .get("https://movie-test-app-2223.herokuapp.com/content/get", {
        headers: {
          token: token,
          limit: 10,
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

  function onStripeElementClicked(item) {
    selectedItemData = item;
    setPageNumber(4);
  }

  function onSearcTriggered(value) {
    selectedItemData = value;
    if (pageNumber === 5) {
      searchRef.current.getItemsByFilter(value);
    } else if (pageNumber !== 1) {
      setPageNumber(5);
    } else {
      searchRef.current.getItemsByFilter(value);
    }
  }

  function getHomePage() {
    return (
      <div>
        <div id="home_gallery_holder">
          <Galery
            ref={galleryRef}
            height="350px"
            width="600px"
            marginTop="70px"
            marginLeft="100px"
            dot_dimension="15px"
            dot_marginBottom="10px"
            dot_between_margin="10px"
            dot_unselected_color="#E23E57"
            dot_selected_color="#88304E"
          ></Galery>
          <GalleryDetails
            height="350px"
            width="600px"
            marginTop="70px"
            marginLeft="800px"
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
          onClick={onStripeElementClicked}
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
          onClick={onStripeElementClicked}
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
          onClick={onStripeElementClicked}
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
          onClick={onStripeElementClicked}
        ></ContentStripe>
      </div>
    );
  }

  function getAddElements() {
    return (
      <EditableCollection
        key="admin_page"
        maxItemsPerRow="6"
        width="200px"
        height="363px"
        inBetweenMargin="30px"
        rowMrginTop="50px"
        rowMarginLeft="25px"
        borderWidth="10"
        borderColor="#E23E57"
        cardRadius="30px"
        ref={searchRef}
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

  function getDetailPage() {
    return (
      <DetailPage
        onBackPress={() => {
          setPageNumber(0);
        }}
        item={selectedItemData}
      ></DetailPage>
    );
  }

  function getSearchCollection() {
    return (
      <EditableCollection
        searchValue={selectedItemData}
        maxItemsPerRow="6"
        width="200px"
        height="363px"
        inBetweenMargin="30px"
        rowMrginTop="50px"
        rowMarginLeft="25px"
        borderWidth="10"
        borderColor="#E23E57"
        cardRadius="30px"
        ref={searchRef}
        onItemClicked={onStripeElementClicked}
      ></EditableCollection>
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
      case 4:
        return getDetailPage();
      case 5:
        return getSearchCollection();
      case 0:
        return getHomePage();
      case 6:
        return <div></div>;
    }
  }

  return (
    <div>
      <div
        id="dark_background"
        style={{ visibility: darkBackgroundVisibility }}
      ></div>
      <TopNavBar
        onEnterPressed={onSearcTriggered}
        onMenuItemClicked={onNavClicked}
      ></TopNavBar>
      <div>{getPage()}</div>
    </div>
  );
}

export default HomePage;
