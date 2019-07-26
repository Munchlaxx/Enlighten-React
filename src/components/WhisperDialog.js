import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ChatIcon from '@material-ui/icons/Chat';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
// Redux stuff
import { connect } from 'react-redux';
import { getWhisper } from '../redux/actions/dataActions';

const styles = (theme) => ({
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: '50%',
      objectFit: 'cover'
    },
    dialogContent: {
      padding: 20
    },
    closeButton: {
      position: 'absolute',
      left: '90%'
    },
    expandButton: {
      position: 'absolute',
      left: '90%'
    },
    spinnerDiv: {
      textAlign: 'center',
      marginTop: 50,
      marginBottom: 50
    }
  });
  
  class WhisperDialog extends Component {
    state = {
      open: false
    };
    handleOpen = () => {
      this.setState({ open: true });
      this.props.getWhisper(this.props.whisperId);
    };
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      const {
        classes,
        whisper: {
          whisperId,
          body,
          createdAt,
          likeCount,
          commentCount,
          userImage,
          userHandle
        },
        UI: { loading }
      } = this.props;
  
      const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
          <CircularProgress size={200} thickness={2} />
        </div>
      ) : (
        <Grid container spacing={16}>
          <Grid item sm={5}>
            <img src={userImage} alt="Profile" className={classes.profileImage} />
          </Grid>
          <Grid item sm={7}>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${userHandle}`}
            >
              @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{body}</Typography>
            <LikeButton whisperId={whisperId} />
            <span>{likeCount} likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
          </Grid>
        </Grid>
      );
      return (
        <Fragment>
          <MyButton
            onClick={this.handleOpen}
            tip="Expand whisper"
            tipClassName={classes.expandButton}
          >
            <UnfoldMore color="primary" />
          </MyButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
          >
            <MyButton
              tip="Close"
              onClick={this.handleClose}
              tipClassName={classes.closeButton}
            >
              <CloseIcon />
            </MyButton>
            <DialogContent className={classes.dialogContent}>
              {dialogMarkup}
            </DialogContent>
          </Dialog>
        </Fragment>
      );
    }
  }
  
  WhisperDialog.propTypes = {
    getWhisper: PropTypes.func.isRequired,
    whisperId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    whisper: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    whisper: state.data.whisper,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    getWhisper
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(WhisperDialog));