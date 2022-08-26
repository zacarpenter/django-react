import React, { Component } from "react";
import { Grid, Button, Typography } from "@mui/material";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this._getRoomDetails();
    this._leaveButtonPressed = this._leaveButtonPressed.bind(this);
  }

  _getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  _leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) =>
      this.props.history.push("/")
    );
  }

  render() {
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

      // <div>
      //   <h3>{this.roomCode}</h3>
      //   <p>Votes: {this.state.votesToSkip}</p>
      //   <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
      //   <p>Host: {this.state.isHost.toString()}</p>
      // </div>
    );
  }
}
