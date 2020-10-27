import React, { useState, useEffect, useRef } from "react";
import "../pages/registration.css";
import EditText from "../components/EditText.js";
import Checkbox from "../components/Checkbox.js";
import { getComponentState } from "../utils/StateHandler";
import LargeTextDialog from "../components/LargeTextDialog.js";
import ErrorDialog from "../components/ErrorDialog.js";
import axios from "axios";
import FormData from "form-data";
import { useHistory } from "react-router-dom";

var register_data = {
  is_agreement_red: false,
  username: "",
  password: "",
  second_password: "",
  email: "",
  file: "",
};

var error_message = {
  message: "",
  title: "",
};

function Registration() {
  const checkBoxRef = useRef();
  const history = useHistory();

  const [selected_image, setSelectedImage] = useState(
    "https://res.cloudinary.com/dodwfb1ar/image/upload/v1601644311/utils/download_xlauab.jpg"
  );
  const [show_terms, showTerms] = useState("hidden");
  const [terms_text, setTermsText] = useState("");
  const [show_error, setShowError] = useState(false);

  var inputFileRef = React.createRef();

  useEffect(() => {
    if (terms_text === undefined || terms_text === "") {
      getTermsAndConditionText();
    }
    var state = getComponentState(Registration.name);
    if (state) {
      setSelectedImage(state.state.selected_image);
      checkBoxRef.current.setChecked();
    }
  });

  function onPhotoClick() {
    inputFileRef.current.click();
  }

  function onCheckboxClick() {
    if (!checkBoxRef.current.isChecked()) {
      showTerms("visible");
    }
  }

  function onPhotoChosen(event) {
    if (event.target.files[0]) {
      var file = event.target.files[0];
      register_data.file = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (response) => {
        setSelectedImage(response.target.result);
      };
    }
  }

  function getTermsAndConditionText() {
    axios({
      method: "get",
      url: "https://movie-test-app-2223.herokuapp.com/user/agreement",
    })
      .then((response) => {
        setTermsText(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function register() {
    if (!checkBoxRef.current.isChecked()) {
      error_message.message =
        "Please read terms of agreement before registering.";
      error_message.title = "Terms of agreement";
      setShowError(true);
      return;
    }

    if (register_data.password !== register_data.second_password) {
      error_message.title = "Password don't match";
      error_message.message =
        "The two passwords that you entered are not identical.";
      setShowError(true);
      return;
    }

    var bodyFormData = new FormData();
    bodyFormData.append("username", register_data.username);
    bodyFormData.append("password", register_data.password);
    bodyFormData.append("email", register_data.email);
    bodyFormData.append("user_image", register_data.file);

    axios({
      method: "post",
      url: "https://movie-test-app-2223.herokuapp.com/user/register",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        history.goBack();
      })
      .catch((error) => {
        switch (error.response.data.code) {
          case 301:
            error_message.title = "Username empty or used";
            error_message.message =
              "Please don't forget to enter a valid username.";
            setShowError(true);
            break;

          case 302:
            error_message.title = "Password empty";
            error_message.message =
              "Please don't forget to enter a valid password.";
            setShowError(true);
            break;

          case 303:
            error_message.title = "Email incorrect or empty";
            error_message.message = "Please enter a valid email.";
            setShowError(true);
            break;

          case 305:
            error_message.title = "Username or email used";
            error_message.message =
              "Please enter another username or email.If you already registered with this email please use another one.";
            setShowError(true);
            break;

          default:
            error_message.title = "Something went wrong.";
            error_message.message = "Something went wrong, please try again.";
            setShowError(true);
            break;
        }
      });
  }

  return (
    <div className="browser_holder">
      <div className="content_holder_registration">
        <div className="circle_holder_registration">
          <input
            className="photo_file_manager_registration"
            type="file"
            accept="image/x-png,image/jpg,image/jpeg"
            ref={inputFileRef}
            onChange={onPhotoChosen}
            style={{ visibility: "hidden" }}
          />
          <img
            onClick={onPhotoClick}
            className="user_image_registration"
            src={selected_image}
          ></img>
        </div>
        <EditText
          margin_top="3vh"
          margin_right="2.5vh"
          padding_top="2vh"
          height="5.5vh"
          margin_left="2vh"
          placeholder="Email"
          onChange={(email) => {
            register_data.email = email;
          }}
        ></EditText>
        <EditText
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          height="5.5vh"
          margin_left="2vh"
          placeholder="Username"
          onChange={(username) => {
            register_data.username = username;
          }}
        ></EditText>
        <EditText
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          height="5.5vh"
          margin_left="2vh"
          isPassword="true"
          placeholder="Password"
          onChange={(password) => {
            register_data.password = password;
          }}
        ></EditText>
        <EditText
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          height="5.5vh"
          margin_left="2vh"
          isPassword="true"
          placeholder="Re-enter password"
          onChange={(password) => {
            register_data.second_password = password;
          }}
        ></EditText>

        <div className="agree_holder">
          <div className="agree_textbox_text">
            Please read and check if you agree with the terms and conditions
          </div>
          <Checkbox
            ref={checkBoxRef}
            width="3.5vh"
            height="3.5vh"
            marginTop="3.2vh"
            marginLeft="2vh"
            onChecked={onCheckboxClick}
            unchecked_src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1602690191/utils/unchecked_checkbox_dn8w4a.png"
            checked_src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1602691846/utils/checked_box_zakwptchecked_box_cpwd2l.png"
          ></Checkbox>
        </div>
        <div className="button_holder_registration">
          <button
            className="first_dialog_button"
            onClick={() => {
              register();
            }}
          >
            Register
          </button>
        </div>
      </div>

      <LargeTextDialog
        visibility={show_terms}
        onFirstButtonClick={() => {
          showTerms("hidden");
          checkBoxRef.current.setChecked();
        }}
        onSecondButtonClick={() => {
          showTerms("hidden");
          checkBoxRef.current.setChecked(true);
          register_data.is_agreement_red = true;
        }}
        second_button_text="Agree"
        first_button_text="Close"
        title={"Terms of agreement"}
        message={terms_text}
      ></LargeTextDialog>
      <ErrorDialog
        title={error_message.title}
        message={error_message.message}
        firstButtonText="Close"
        isVisible={show_error}
        firstButtoonListener={() => {
          setShowError(false);
        }}
      ></ErrorDialog>
    </div>
  );
}

export default Registration;
