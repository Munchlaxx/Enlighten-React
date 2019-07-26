import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteWhisper from './DeleteWhisper';
import WhisperDialog from './WhisperDialog';
import LikeButton from './LikeButton';

// Mui Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";

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
          <LikeButton whisperId={whisperId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <WhisperDialog whisperId={whisperId} userHandle={userHandle}/>
        </CardContent>
      </Card>
    );
  }
}

Whisper.propTypes = {
  user: PropTypes.object.isRequired,
  whisper: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Whisper));