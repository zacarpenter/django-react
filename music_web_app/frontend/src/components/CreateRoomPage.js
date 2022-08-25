import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

    // bind method to class to use this keyword
    this._handleVotesChange = this._handleVotesChange.bind(this);
    this._handleGuestCanPauseChange =
      this._handleGuestCanPauseChange.bind(this);
    this._handleRoomButtonPressed = this._handleRoomButtonPressed.bind(this);
  }

  _handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }
  /*
    handleVotesChange = (e) => {
        this.setState({
            votesToSkip: e.target.value
        });
    }
  */

  _handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  _handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="error" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={this.defaultVotes}
              onChange={this._handleVotesChange}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required to Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this._handleRoomButtonPressed}
          >
            Create a Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="error" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
