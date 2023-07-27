import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

export default class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      audioSrc: null,
      audioType: "audio/wav"
    };
  }

  controlAudio(status) {
    if (status === "inactive") {
      this.setState({
        audioSrc: null
      });
    }
    if (status === "reload") {
      this.setState({
        audioSrc: null
      });
    }
    this.setState({
      status
    });
  }

  changeScheme(e) {
    this.setState({
      audioType: e.target.value
    });
  }

  stopCallback(e) {
    const audioBlob = new Blob([e], { type: "audio/wav" });
    this.props.pushRecorded(audioBlob);

    this.setState({
      audioSrc: window.URL.createObjectURL(e)
    });

    if (this.state.status !== "inactive") {
      this.setState({
        audioSrc: null
      });
    }
  }

  render() {
    const { status, audioSrc, audioType } = this.state;
    const audioProps = {
      audioType,
      status,
      audioSrc,
      timeslice: 1000,
      startCallback: e => {
        console.log("succ start", e);
      },
      pauseCallback: e => {
        console.log("succ pause", e);
      },
      stopCallback: e => {
        this.stopCallback(e);
        console.log("recording", audioSrc);
      },
      onRecordCallback: e => {
        console.log("recording", e);
      },
      errorCallback: err => {
        console.log("error", err);
      }
    };
    return (
      <Container>
        <AudioAnalyser {...audioProps}    strokeColor="white"
    backgroundColor="#FF4081" >
          <Stack direction="row" spacing={3} paddingLeft="110px">
            <IconButton
              className="btn"
              onClick={() => this.controlAudio("recording")}
              color={status === "recording" ? 'success' : 'primary'}
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              className="btn"
              onClick={() => this.controlAudio("paused")}
              color={status === "paused" ? 'success' : 'primary'}
            >
              <PauseIcon />
            </IconButton>
            <IconButton
              className="btn"
              onClick={() => this.controlAudio("inactive")}
              color={status === "inactive" ? 'success' : 'primary'}
            >
              <StopIcon />
            </IconButton>
            <IconButton
              onClick={() => this.controlAudio("reload")}
              variant="contained"
              color="secondary"
            >
              <ReplayIcon />
            </IconButton>
          </Stack>
        </AudioAnalyser>
      </Container>
    );
  }
}

const Container = styled.div`
  padding-left:360px;

`;
const AudioButtons = styled.div`
  display: flex;
  padding-left: 20px;
  width:450px;
  justify-content: space-between;
  margin-right: 10px;

  /* If you want equal space between buttons, uncomment the line below */
  /* > * { margin-right: 10px; } */
`;