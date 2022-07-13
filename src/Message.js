import React, { useEffect, useState } from "react";
import placeholdersDataAPI from "./placeholdersData.json";
import svg from "./delete_FILL0_wght400_GRAD0_opsz48.svg";
import "./Message.css";

function Message() {
  const [placeholdersData, setPlaceholdersData] = useState({});
  const [content, setContent] = useState("");
  useEffect(() => {
    setPlaceholdersData(placeholdersDataAPI);
  }, []);

  const preview = (text) => {
    Object.entries(placeholdersData).forEach(([key, value]) => {
      text = text.replaceAll("[" + key + "]", value.example);
    });
    return text;
  };

  const calcLength = (text) => {
    var sum = 0;
    Object.entries(placeholdersData).forEach(([key, value]) => {
      const searchKey = "[" + key + "]";
      while (text.includes(searchKey)) {
        text = text.replace(searchKey, "");
        sum += value.max_length;
      }
    });
    return sum + text.length;
  };

  const textareaBox = React.createRef();
  const addDataHandeler = (field) => {
    //Add field to content
    setContent(content + "[" + field + "]");
    //continue type in textarea
    textareaBox.current.focus();
  };
  return (
    <div className="message-cont">
      <div className="text-editor">
        <div className="empty-text-editor">
          <img src={svg} alt="empty text" onClick={() => setContent("")} />
        </div>

        <button>Variant1</button>
        <textarea
          value={content}
          ref={textareaBox}
          onChange={(e) => setContent(e.target.value)}
        />
        <p>
          Length <b>{calcLength(content)}</b> chars
        </p>
        <div className="placeholders">
          {Object.entries(placeholdersData).map(([key, value], i) => (
            <button key={i} onClick={() => addDataHandeler(key)}>
              {value.name}
            </button>
          ))}
        </div>
      </div>
      <div className="preview">
        <p>Preview</p>
        <div>{preview(content)}</div>
      </div>
    </div>
  );
}

export default Message;
