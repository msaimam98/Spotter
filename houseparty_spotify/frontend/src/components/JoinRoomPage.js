import React, { Component } from 'react';
import { Grid, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {withRouter} from './withRouter';


class JoinRoomPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roomCode: "",
            error: ""
        }

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleEnterRoomButton = this.handleEnterRoomButton.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value,
        });
    }

    handleEnterRoomButton() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };

        fetch("/api/join-room", requestOptions)
        .then((response) => {
            if (response.ok) {
                this.props.navigate(`/room/${this.state.roomCode}`);
            } else {
                this.setState({
                    error: "Room not found."
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        return (
            <Grid container spacing={1} align="center">
                
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">Join A Room</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        error={!!this.state.error}
                        label="Code"
                        placeholder="Enter Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this.handleTextFieldChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={this.handleEnterRoomButton}>Enter Room</Button>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
                </Grid>

            </Grid>
        );

    }

}

export default withRouter(JoinRoomPage);