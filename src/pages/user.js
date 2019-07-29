import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Whisper from "../components/whisper/Whisper";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import WhisperSkeleton from '../util/WhisperSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    whisperIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const whisperId = this.props.match.params.whisperId;

    if (whisperId) this.setState({ whisperIdParam: whisperId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { whispers, loading } = this.props.data;
    const { whisperIdParam } = this.state;

    const whispersMarkup = loading ? (
      <WhisperSkeleton />
    ) : whispers === null ? (
      <p>No whispers from this user</p>
    ) : !whisperIdParam ? (
      whispers.map(whisper => (
        <Whisper key={whisper.whisperId} whisper={whisper} />
      ))
    ) : (
      whispers.map((whisper) => {
        if (whisper.whisperId !== whisperIdParam)
          return <Whisper key={whisper.whisperId} whisper={whisper} />;
        else return <Whisper key={whisper.whisperId} whisper={whisper} openDialog />;
      })
    );

    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {whispersMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
