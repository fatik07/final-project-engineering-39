import React from "react";
import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";
import "./login.css";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    const { email, password } = this.state;
    return (
      <container>
        <Grid Container style={{ justifyContent: "center" }}>
          <Grid xs="4">
            <form>
              <TextField variant="outlined" size="small" value={email} label="email" required />
              <TextField variant="outlined" size="small" value={password} label="Password" required />
              <Button variant="contained" color="primary">
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </container>
    );
  }
}
