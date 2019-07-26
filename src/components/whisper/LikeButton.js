import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likeWhisper, unlikeWhisper } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedWhisper = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.whisperId === this.props.whisperId
      )
    )
      return true;
    else return false;
  };
  likeWhisper = () => {
    this.props.likeWhisper(this.props.whisperId);
  };
  unlikeWhisper = () => {
    this.props.unlikeWhisper(this.props.whisperId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedWhisper() ? (
      <MyButton tip="Undo like" onClick={this.unlikeWhisper}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeWhisper}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  whisperId: PropTypes.string.isRequired,
  likeWhisper: PropTypes.func.isRequired,
  unlikeWhisper: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeWhisper,
  unlikeWhisper
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
