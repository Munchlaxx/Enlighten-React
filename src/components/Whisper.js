import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteWhisper from './DeleteWhisper';

// Mui Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeWhisper, unlikeWhisper } from "../redux/actions/dataActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

// Added comments
class Whisper extends Component {
  likedWhisper = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.whisperId === this.props.whisper.whisperId
      )
    )
      return true;
    else return false;
  };
  likeWhisper = () => {
    this.props.likeWhisper(this.props.whisper.whisperId);
  };
  unlikeWhisper = () => {
    this.props.unlikeWhisper(this.props.whisper.screamId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      whisper: {
        body,
        createdAt,
        userImage,
        userHandle,
        whisperId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedWhisper() ? (
      <MyButton tip="Undo like" onClick={this.unlikeWhisper}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeWhisper}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteWhisper whisperId={whisperId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Whisper.propTypes = {
  likeWhisper: PropTypes.func.isRequired,
  unlikeWhisper: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  whisper: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeWhisper,
  unlikeWhisper
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Whisper));