import React, { useEffect } from "react";
import EditText from "../components/EditText";
import "./AddNewPersonDialog.css";

function AddNewPersonDialog(props) {
  useEffect(() => {}, []);

  return (
    <div id="person_dialog_background">
      <div id="person_dialog_holder">
        <img
          id="person_dialog_image"
          src="https://res.cloudinary.com/dodwfb1ar/image/upload/v1608407467/utils/Add_person_1_n9x8p3.png"
        ></img>
        <EditText
          id="person_dialog_name"
          margin_top="1vh"
          margin_right="2.5vh"
          padding_top="2vh"
          margin_bottom="2vh"
          resetEditText="true"
          height="4vh"
          width="60vh"
          margin_left="2vh"
          placeholder="Name"
        ></EditText>
      </div>
    </div>
  );
}

export default AddNewPersonDialog;
