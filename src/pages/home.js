import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Whisper from "../components/Whisper";
import Profile from "../components/Profile";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getWhispers } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getWhispers();
  }
  render() {
    const { whispers, loading } = this.props.data;
    let recentWhsipersMarkup = !loading ? (
      whispers.map(whisper => (
        <Whisper key="whisper.whisperId" whisper={whisper} />
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentWhsipersMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  getWhispers: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getWhispers }
)(home);
