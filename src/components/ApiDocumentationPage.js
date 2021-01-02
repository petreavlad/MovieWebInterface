import React, { useEffect, useState } from "react";
import "./ApiDocumentationPage.css";
import page from "../utils/PageDocumentation.json";

function ApiDocumentationPage(props) {
  const [divArray, setDivArray] = useState([]);

  useEffect(() => {
    let array = [];
    for (let pageItem of page.pagecontent) {
      array.push(getPageItem(pageItem));
    }
    setDivArray(array);
  }, []);

  function getPageItem(item) {
    return (
      <div id="page_item_holder">
        <div id="page_item_title">
          <b>
            <u>Registration</u>
          </b>
        </div>
        <div id="page_header_holder">
          <div id="page_item_type">
            <b>{item.type}</b>
          </div>
          <div id="page_item_url">
            <b>{item.url}</b>
          </div>
        </div>
      </div>
    );
  }

  return <div id="api_doc_content_holder">{divArray ? divArray : null}</div>;
}

export default ApiDocumentationPage;
