import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DescriptionIcon from '@mui/icons-material/Description';
import MicIcon from '@mui/icons-material/Mic';
import TextField from '@mui/material/TextField';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import Drag from './Drag';
import AudioRecorder from './AudioRecorder';
import axios from 'axios';
import styled from 'styled-components';

export default function Form() {
  const [formData, setFormData] = useState({
    inputtype: '',
    text: '',
    audioFile: null,
  });
  const [draggedAudioFile, setDraggedAudioFile] = useState(null);
  const [files, setFiles] = useState([]);
 
  const [apiResponse, setApiResponse] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  const pushFile = (file) => {
    setDraggedAudioFile(file);
    setFiles([...files, file]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      audioFile: file,
    }));
  };

  const pushRecord = (blob) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      audioFile: blob,
    }));
  };

  useEffect(() => {}, [formData]);

  function handleChange(inputtype) {
    setIsSubmitted(false); // Reset isSubmitted state
    setFormData((prevFormData) => ({
      ...prevFormData,
      inputtype: inputtype,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:9000/classifytext', formData);
      setApiResponse(response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAudioSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.audioFile !== null) {
        setIsLoading(true);

        const formDt = new FormData();
        formDt.append('file', formData.audioFile, 'audio.wav');
        const response = await axios.post('http://127.0.0.1:9000/transcribe', formDt, config);

        setApiResponse(response.data);
        setIsSubmitted(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (apiResponse) {
      console.log(apiResponse.Transcription);
    }
  }, [apiResponse]);

  function renderFormFields() {
    switch (formData.inputtype) {
      case 'record':
        return (
          <>
            <AudioRecorder pushRecorded={pushRecord} />
            <SubmitButton>
              {isLoading ? (
                <LoadingImage src="loading.webp" alt="Loading..." />
              ) : (
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  onClick={handleAudioSubmit}
                >
                  Submit
                </Button>
              )}
            </SubmitButton>
          </>
        );
      case 'audio':
        return (
          <>
            <Drag pushFile={pushFile} />
            <SubmitButton>
              {isLoading ? (
                <LoadingImage src="loading.webp" alt="Loading..." />
              ) : (
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  onClick={handleAudioSubmit}
                >
                  Submit
                </Button>
              )}
            </SubmitButton>
          </>
        );
      case 'text':
        return (
          <>
            <TextInput>
              <Label>
                <h4>Write your text below:</h4>
              </Label>
              <StyledTextField
                id="text"
                name="text"
                value={formData.text}
                onChange={(event) => setFormData({ ...formData, text: event.target.value })}
              />
            </TextInput>
            <SubmitButton>
              {isLoading ? (
                <LoadingImage src="loading.webp" alt="Loading..." />
              ) : (
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </SubmitButton>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Wrap>
      <form onSubmit={handleSubmit}>
        <Title>
          <h3>Please choose your input type:</h3>
        </Title>
        <ButtonGroup>
          <Tooltip title="Input Text">
            <AudioButton>
              <Button
                onClick={() => handleChange('text')}
                variant={formData.inputtype === 'text' ? 'contained' : 'outlined'}
                startIcon={<DescriptionIcon/>}
                className="styled-button"
              >
                Text input
              </Button>
            </AudioButton>
          </Tooltip>
          <Tooltip title="Input Audio">
            <AudioButton>
              <Button
                onClick={() => handleChange('audio')}
                variant={formData.inputtype === 'audio' ? 'contained' : 'outlined'}
                startIcon={<AudioFileIcon />}
                className="styled-button"
              >
                Audio file
              </Button>
            </AudioButton>
          </Tooltip>
          <Tooltip title="Record Audio">
            <AudioButton>
              <Button
                onClick={() => handleChange('record')}
                variant={formData.inputtype === 'record' ? 'contained' : 'outlined'}
                startIcon={<MicIcon></MicIcon>}
                className="styled-button"
              >
                Record audio
              </Button>
            </AudioButton>
          </Tooltip>
        </ButtonGroup>

        {renderFormFields()}

        {isSubmitted && (
       <Output>
       <p>Transcription:</p>
       <Transcription>{apiResponse?.Transcription}</Transcription>
       <p>Label:</p>
       <p>{apiResponse?.label}</p>
     </Output>
        )}
      </form>
    </Wrap>
  );
}

const AudioButton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  margin-right: 5px;
  justify-content: center;
  margin-left: 40px;
  height: 40px;
  width: 200px;
  align-items: center;
  border-radius: 100px;
  opacity: 0.85;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

const Wrap = styled.div`
  border-radius: 25%;
  width: 70vw;
  height: 550px;
  justify-content: space-between;
  margin-left: 15%;
`;

const Label = styled.h4`
  padding-left: 2%;
`;

const SubmitButton = styled.div`
  display: flex;
  margin-left: 41%;
  margin-top: 2%;
  width: 170px;
`;

const Title = styled.div`
  margin-left: 20%;
  font-family: sans-serif;
  color: #068fff;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 215px;
  margin-bottom: 30px;
`;

const TextInput = styled.div`
  padding-left: 23%;
`;

const Output = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 20px;
  margin-right:200px;
  p {
    margin-bottom: 10px;
  }
`;

const StyledTextField = styled(TextField)`
  width: 600px;
  height: 40px;
`;

const LoadingImage = styled.img`
  width: 200px;
  height: 180px;
  margin-right:300px;
`;

const Transcription = styled.span`
  direction: rtl;
  unicode-bidi: bidi-override;
  font-family: Arial, sans-serif; 
  text-rendering: optimizeLegibility;
`;
