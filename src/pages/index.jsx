import React, { useState } from "react";
import "../pages/main_page.css";
import EditText from "../components/EditText.js";
import ErrorDialog from "../components/ErrorDialog.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

var state = {
  username: "",
  password: "",
};

function MainPage() {
  const [is_error_visible, setErrorVisibility] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [show_second_button, showSeccondButton] = useState(false);
  const [show_register_error_button, showRegisterButton] = useState(false);
  let history = useHistory();

  function buttonClick() {
    axios({
      method: "post",
      url: "https://movie-test-app-2223.herokuapp.com/user/login",
      data: state,
    })
      .then((response) => {
        localStorage.setItem("user_token", response.data.response.token);
        localStorage.setItem("user_username", response.data.response.username);
        localStorage.setItem("user_image", response.data.response.user_image);

        console.log(response.data.response);
        history.push("/home");
      })
      .catch((error) => {
        setErrorVisibility(true);
        setErrorMessage(error.response.data.message);

        switch (error.response.data.code) {
          case 301:
            showSeccondButton(true);
            showRegisterButton(true);
            break;

          case 303:
            showSeccondButton(true);
            showRegisterButton(false);
            break;

          default:
            showSeccondButton(false);
            break;
        }
      });
  }

  function onTryAgainClick(event) {
    setErrorVisibility(false);
    setErrorMessage("");
  }

  function onRegisterButtonCLick(event) {
    history.push("/register");
  }

  return (
    <div className="browser_holder">
      <div className="content_holder">
        <div className="circle_holder">
          <img
            className="user_image"
            src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1601644311/utils/download_xlauab.jpg"
          ></img>
        </div>
        <EditText
          margin_top="3vh"
          margin_right="2.5vh"
          padding_top="2vh"
          height="5.5vh"
          margin_left="2vh"
          placeholder="Username"
          onChange={(value) => {
            state.username = value;
          }}
        ></EditText>
        <EditText
          margin_top="2vh"
          margin_right="2.5vh"
          padding_top="2vh"
          height="5.5vh"
          margin_left="2vh"
          placeholder="Password"
          isPassword="true"
          onChange={(value) => {
            state.password = value;
          }}
        ></EditText>
        <div className="register_text">
          <Link to="/register" className="register_link">
            <u>You don’t have an account yet? Click here to make one :*</u>
          </Link>
        </div>
        <div className="button_holder">
          <button className="login_button" onClick={buttonClick}>
            Login
          </button>
        </div>

        <div className="forgot_password_text">
          <Link to="/resetpassword" className="register_link">
            <u>Forgot password? Click here</u>
          </Link>
        </div>
      </div>
      <ErrorDialog
        title="Something went wrong"
        message={error_message}
        isVisible={is_error_visible}
        showSecondButton={show_second_button}
        firstButtonText="Try again"
        secondButtonText={
          show_register_error_button ? "Register" : "I forgot my password"
        }
        firstButtoonListener={onTryAgainClick}
        secondButtonListener={onRegisterButtonCLick}
      ></ErrorDialog>
    </div>
  );
}

export default MainPage;
