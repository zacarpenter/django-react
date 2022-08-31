import React, { Component } from "react";
import { Grid, Button, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this._getRoomDetails();
  }

  _getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (this.state.isHost) {
          this._authenticateSpotify();
        }
      });
  };

  _authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  _leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  };

  _updateShowSettings = (value) => {
    this.setState({
      showSettings: value,
    });
  };

  _renderSettings = () => {
    return (
      <Grid container spacing={1} alignItems="center" direction="column">
        <Grid item xs={12}>
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this._getRoomDetails}
          ></CreateRoomPage>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => this._updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  _renderSettingsButton = () => {
    return (
      <Grid item xs={12} alignItems="center" direction="column">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this._updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  render() {
    if (this.state.showSettings) {
      return this._renderSettings();
    }
    return (
      <Grid container spacing={1} alignItems="center" direction="column">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Votes: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Guest Can Pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        {this.state.isHost ? this._renderSettingsButton() : null}
        <Grid item xs={12}>
          <Button
            color="error"
            variant="contained"
            onClick={this._leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
