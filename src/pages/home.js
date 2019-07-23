import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Whisper from '../components/Whisper';

export class home extends Component {
    state = {
        whispers: null
    }

    // componentDidMount(){
    //     axios.get('/whispers')
    //         .then(res => {
    //             this.setState({
    //                 whispers: res.data
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }
    render() {
        let recentWhsipersMarkup = this.state.whispers ? (
            this.state.whispers.map(whisper => <Whisper key="whisper.whisperId" whisper={whisper}/>)
        ) : <p>Loading...</p>

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentWhsipersMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
          </Grid>
        )
    }
}

export default home
