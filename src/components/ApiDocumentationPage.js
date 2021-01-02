import React, { useEffect, useState } from "react";
import "./ApiDocumentationPage.css";
import page from "../utils/PageDocumentation.json";
import ReactJson from "react-json-view";

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
            <u>{item.name}</u>
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
        {[getParts(item)]}
      </div>
    );
  }

  function getParts(item) {
    let array = [];
    if (item.headers) {
      array.push(getheaders(item));
    }
    if (item.body) {
      array.push(getBodyExample(item));
    }
    if (item.response) {
      array.push(getResponseExample(item));
    }

    array.push(getBottomSpace());

    return array;
  }

  function getheaders(item) {
    return (
      <div id="page_item_body_holder">
        <div id="page_item_body_title">
          <b>
            <u>Headers</u>
          </b>
        </div>
        <div id="page_item_body_example_holder">
          <ReactJson
            src={item.headers}
            theme="ocean"
            displayObjectSize="true"
            displayDataTypes={false}
            displayObjectSize={false}
            name={false}
            style={{ backgroundColor: "#e23e57" }}
          ></ReactJson>
        </div>
      </div>
    );
  }

  function getBodyExample(item) {
    let bodyExample;
    if (item.body_type) {
      bodyExample = "Body example" + " (" + item.body_type + ")";
    } else {
      bodyExample = "Body example";
    }
    return (
      <div id="page_item_body_holder">
        <div id="page_item_body_title">
          <b>
            <u>{bodyExample}</u>
          </b>
        </div>
        <div id="page_item_body_example_holder">
          <ReactJson
            src={item.body}
            theme="ocean"
            displayObjectSize="true"
            displayDataTypes={false}
            displayObjectSize={false}
            name={false}
            style={{ backgroundColor: "#e23e57" }}
          ></ReactJson>
        </div>
      </div>
    );
  }

  function getBottomSpace() {
    return <div id="page_item_bottom_margin"></div>;
  }

  function getResponseExample(item) {
    return (
      <div id="page_item_body_holder">
        <div id="page_item_body_title">
          <b>
            <u>Response structure</u>
          </b>
        </div>
        <div id="page_item_body_example_holder">
          <ReactJson
            src={item.response}
            theme="ocean"
            displayObjectSize="true"
            displayDataTypes={false}
            displayObjectSize={false}
            name={false}
            style={{ backgroundColor: "#e23e57" }}
          ></ReactJson>
        </div>
      </div>
    );
  }

  return <div id="api_doc_content_holder">{divArray ? divArray : null}</div>;
}

export default ApiDocumentationPage;
