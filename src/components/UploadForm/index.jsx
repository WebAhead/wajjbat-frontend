import React from "react";
import axios from "axios";
import StyledDropzone from "./DropZone";
export default function UploadInput({ addUrl }) {
  const uploadFile = (file, signedRequest, url) => {
    console.log(signedRequest, "hello file");
    console.log(1);
    axios
      .put(signedRequest, file, {
        headers: {
          "Content-Type": file.type
        }
      })
      .then(res => {
        if (res.status === 200) {
          document.getElementById("preview").src = url;
          document.getElementById("avatar-url").value = url;
        } else {
          alert("Could not upload file.");
        }
      })
      .catch(error => console.log(error));
  };
  const getSignedRequest = file => {
    console.log(file.name, "file", file.type);
    axios
      .get(
        `http://192.168.0.87:8000/api/sign-s3?file-name=${file.name}&file-type=${file.type}`
      )
      .then(res => {
        if (res.status === 200) {
          uploadFile(file, res.data.signedRequest, res.data.url);
        } else {
          alert("Could not get signed URL.");
        }
      })
      .catch(error => error);
  };
  return (
    <div>
      <StyledDropzone getImages={getSignedRequest} />
    </div>
  );
}
