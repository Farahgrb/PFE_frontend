import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import AudioFileIcon from '@mui/icons-material/AudioFile';

const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #aaa;
  padding: 2rem;
  cursor: pointer;
  height:40px
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
`;

export default function Drag({ pushFile }) {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: ".wav",
    onDrop: (files) => {      
   
      if (files.length > 0) {
        const selectedFile = files[0];

        if (selectedFile.name.endsWith(".wav")) {
          setFile(selectedFile);    

          setErrorMessage("");
          pushFile(selectedFile); // Call pushFile with the dropped file
          
        } else {
          setErrorMessage("Please upload a WAV file.");
        }
      }
    },
  });
  

  return (
    <Wrap1>
      <h4>Drag and drop a .WAV file or click to choose a file</h4>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <AudioFileIcon />
        <p>{isDragActive ? "Drop the file here" : "Drag and drop a WAV file here"}</p>
      </DropzoneContainer>
      {errorMessage && <p>{errorMessage}</p>}
      <p>{file ? `File name: ${file.name}` : "No files uploaded yet"}</p>
    </Wrap1>
  );
}
const Wrap1 =styled.div`
   color: #78C1F3;
   width: 900px;
   padding-left:10%;
   

   
`