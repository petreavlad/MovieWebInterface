import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { getBackgroundListener } from "../utils/StateHandler";
import EditText from "../components/EditText";
import "./AddNewPersonDialog.css";
import axios from "axios";

function AddNewPersonDialog(props, ref) {
  const [dialogVisibility, setVisibility] = useState("hidden");
  const [image, setImage] = useState("");
  const [itemsToBeSent, setItemsToBeSent] = useState({});
  const [personType, setRequestType] = useState("ADD_BUTTON");
  const nameTextbox = useRef();

  let inputFileRef = useRef();

  useEffect(() => {
    if (dialogVisibility === "hidden") {
      setImage("");
      setItemsToBeSent({});
      nameTextbox.current.setText("");
    }
  }, [dialogVisibility]);
  useEffect(() => {}, []);
  useImperativeHandle(ref, () => ({ setDialogVisibility, setPersonType }));

  function setDialogVisibility(visibility) {
    setVisibility(visibility);
  }

  function setPersonType(personType) {
    setRequestType(personType);
  }

  function onSaveClicked() {
    if (personType === "ADD_NEW_STAR") {
      onNewStar();
    }

    if (personType === "ADD_NEW_CREATOR") {
      onNewCreator();
    }
  }

  function onNewCreator() {
    var bodyFormData = new FormData();
    bodyFormData.append("creator_name", itemsToBeSent.name);
    bodyFormData.append("creator_photo", itemsToBeSent.image);
    axios
      .post(
        "https://movie-test-app-2223.herokuapp.com/content/creator",
        bodyFormData,
        {
          params: {
            content_id: props.content_id,
          },
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("user_token"),
          },
        }
      )
      .then((response) => {
        if (props.onSaveListener) {
          props.onSaveListener(response.data.data, personType);
        }
        setVisibility("hidden");
        getBackgroundListener().setVisibility("hidden");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onNewStar() {
    var bodyFormData = new FormData();
    bodyFormData.append("star_name", itemsToBeSent.name);
    bodyFormData.append("star_photo", itemsToBeSent.image);
    axios
      .post(
        "https://movie-test-app-2223.herokuapp.com/content/star",
        bodyFormData,
        {
          params: {
            content_id: props.content_id,
          },
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("user_token"),
          },
        }
      )
      .then((response) => {
        if (props.onSaveListener) {
          props.onSaveListener(response.data.data, personType);
        }
        setVisibility("hidden");
        getBackgroundListener().setVisibility("hidden");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onImageChosen(event) {
    if (event.target.files[0]) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (response) => {
        itemsToBeSent.image = file;
        itemsToBeSent.image_file = response.target.result;
        setImage(response.target.result);
      };
    }
  }

  return (
    <div id="person_dialog_background" style={{ visibility: dialogVisibility }}>
      <div id="person_dialog_holder">
        <img
          id="person_dialog_image"
          src={
            image === ""
              ? "https://res.cloudinary.com/dodwfb1ar/image/upload/v1608407467/utils/Add_person_1_n9x8p3.png"
              : image
          }
          onClick={() => {
            inputFileRef.current.click();
          }}
        ></img>
        <EditText
          id="person_dialog_name"
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="1vh"
          padding_bottom="1vh"
          resetEditText="true"
          height="4vh"
          width="60vh"
          ref={nameTextbox}
          margin_left="2vh"
          placeholder="Name"
          onChange={(event) => {
            itemsToBeSent.name = event;
          }}
        ></EditText>
        <div>
          <button
            id="person_button_style"
            style={{ marginRight: "10vh" }}
            onClick={() => {
              setVisibility("hidden");
              getBackgroundListener().setVisibility("hidden");
            }}
          >
            Cancel
          </button>
          <button
            id="person_button_style"
            onClick={() => {
              onSaveClicked();
            }}
          >
            Save
          </button>
        </div>
        <input
          className="photo_file_manager_registration"
          type="file"
          accept="image/x-png,image/jpg,image/jpeg"
          ref={inputFileRef}
          onChange={onImageChosen}
          style={{ visibility: "hidden" }}
        />
      </div>
    </div>
  );
}

export default forwardRef(AddNewPersonDialog);
