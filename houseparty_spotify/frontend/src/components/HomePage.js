import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Navigate, Routes } from 'react-router-dom';
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';

import { Grid, Typography, Button, ButtonGroup } from '@mui/material';


export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };

        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch('/api/user-in-room')
        .then(response => response.json())
        .then(data => {
            this.setState({
                roomCode: data.code
            });
        });
    }    

    clearRoomCode() {
        this.setState({
            roomCode: null,
        });
    }

    renderHomePage() {

        return (
            <Grid container spacing={3} align="center">

                <Grid item xs={12}>
                    <Typography variant="h3" compact="h3">Controlify</Typography>
                </Grid>

                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button variant="contained" color="primary" to="/join" component={Link}>Join a Room</Button>
                    <Button variant="contained" color="secondary" to="/create" component={Link}>Create a Room</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>
            );
    }

    render() {

        return (
            <Router>
                <Routes>
                <Route exact path="/" element={this.state.roomCode ? 
                    (<Navigate replace to={`/room/${this.state.roomCode}`} />) : this.renderHomePage()} />
                    <Route path="/join" element={<JoinRoomPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/room/:roomCode" element={<Room leaveRoomCallback={this.clearRoomCode} />} />
                </Routes>
            </Router>
        );

    }

}