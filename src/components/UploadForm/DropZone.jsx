import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./style.scss";
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
  thumbsContainer,
  thumb,
  thumbInner,
  img
} from "./stylesVarsHooks";
export default function StyledDropzone(props) {
  const [files, setFiles] = useState([]);

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });
  const filesInfo = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragAccept, isDragActive, isDragReject]
  );

  return (
    <div className="dropzone-container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>{getInputProps}</div>
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <aside>
        <h4>Files details</h4>

        <ul>{filesInfo}</ul>
      </aside>
      <div className="button-container">
        <button
          onClick={() => {
            if (Array.isArray(files) && files.length) props.getImages(files[0]);
            else return <h1>please insert an image</h1>;
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
