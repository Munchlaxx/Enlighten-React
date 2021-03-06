import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import WhisperSkeleton from '../util/WhisperSkeleton';

import Whisper from "../components/whisper/Whisper";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getWhispers } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getWhispers();
  }
  render() {
    const { whispers, loading } = this.props.data;
    let recentWhispersMarkup = !loading ? (
      whispers.map(whisper => (
        <Whisper key={whisper.whisperId} whisper={whisper} />
      ))
    ) : (
      <WhisperSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentWhispersMarkup}
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
