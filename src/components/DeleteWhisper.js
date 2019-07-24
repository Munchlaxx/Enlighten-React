import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteWhisper } from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
      position: 'absolute',
      left: '90%',
      top: '10%'
    }
  };

class DeleteWhisper extends Component {

    state={
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    deleteWhisper = () => {
        this.props.deleteWhisper(this.props.whisperId)
        this.setState({open: false});
    }

    render() {

        const { classes } = this.props

        return (
            <Fragment>
                <MyButton tip='Delete Whisper'
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color='secondary'/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        Are you sure you want to delete this whisper?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.deleteWhisper} color='secondary'>
                            Delete
                        </Button>
                    </DialogActions>

                </Dialog>
            </Fragment>
        )
    }
}

DeleteWhisper.propTypes = {
    deleteWhisper: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    whisperId: PropTypes.string.isRequired
}

export default connect(null, { deleteWhisper })(withStyles(styles)(DeleteWhisper))
