import React from "react";
import axios from "axios";
import Dropzone from "../Dropzone";
export default function UploadInput({ onChange, onError, height, width }) {
  const uploadFile = (file, signedRequest, url) =>
    axios
      .put(signedRequest, file, {
        headers: {
          "Content-Type": file.type
        }
      })
      .then(res => {
        if (res.status === 200) {
          onChange(url);
        } else {
          onError("Could not upload file.");
        }
      })
      .catch(error => console.log(error));

  const getSignedRequest = file =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/sign-s3?file-name=${file.name}&file-type=${file.type}`
      )
      .then(res => {
        if (res.status === 200) {
          uploadFile(file, res.data.signedRequest, res.data.url);
        } else {
          onError("Could not get signed URL.");
        }
      })
      .catch(error => error);

  return (
    <div>
      <Dropzone width={width} height={height} getSignedRequest={getSignedRequest} />
    </div>
  );
}
