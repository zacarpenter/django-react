import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
  Route,
} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  _renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} alignItems="center" direction="column">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              to="/create"
              component={Link}
            >
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this._renderHomePage()}
          </Route>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/room/:roomCode" component={Room} />
        </Switch>
      </Router>
    );
  }
}
