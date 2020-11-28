import React from "react";
import "../pages/home.css";
import TopNavBar from "../components/TopNavBar";
import Galery from "../components/Galery";
import GalleryDetails from "../components/GalleryDetail";
import { useEffect, useRef } from "react";
import axios from "axios";

function HomePage() {
  var galleryRef = useRef();
  var galleryContent;

  useEffect(() => {
    retrieveGalleryData(localStorage.getItem("user_token"));
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

      setTimeout(startGalleryTimer, 1000);
    });
  }

  function startGalleryTimer() {
    galleryRef.current.startScrolling(2000);
  }

  return (
    <div>
      <TopNavBar></TopNavBar>
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
          backgroundColor="#117A65"
        ></GalleryDetails>
      </div>
    </div>
  );
}

export default HomePage;
