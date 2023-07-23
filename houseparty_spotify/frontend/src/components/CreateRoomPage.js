import React, { Component } from 'react';
import { Grid, Collapse, Button, FormControl, FormHelperText, TextField, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import {withRouter} from './withRouter';
import Alert from '@mui/material/Alert';

class CreateRoomPage extends Component {

    static defaultProps = {
        votesToSkip: 5,
        guestCanPause: true,
        roomCode: null,
        update: false,
        updateCallback: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            successMessage: '',
            errorMessage: '',
        };

        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestPauseChange = this.handleGuestPauseChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false,
        });
    }

    handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };


        fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            this.props.navigate('/room/' + data.code);
        });

    }

    handleUpdateButtonPressed() {

        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            })
        };


        fetch("/api/update-room", requestOptions)
        .then((response) => {
            if (response.ok) {
                this.setState({
                    successMessage: "Room updated successfully!"
                });
            } else {
                this.setState({
                    errorMessage: "Room failed to update!"
                });
            }

            this.props.updateCallback();
        });

    }

    renderUpdateButtons() {
        return (
            <Grid item xs={12}>
            <   Button color="primary" variant="contained" onClick={this.handleUpdateButtonPressed}>Update Room</Button>
            </Grid>
        );
        
    }

    renderCreateButtons() {
        return (
            <Grid container spacing={1} align="center">

                {/* the button to submit form */}
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={this.handleSubmit}>Create A Room</Button>
                </Grid>
            
                {/* the button to go back */} 
                <Grid item xs={12}>
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
                
            </Grid>
        );
    }

    render() {

        const label = this.props.update ? "Update Room" : "Create A Room";

        return (
            <Grid container spacing={1} align="center">

                <Grid item xs={12}>
                    <Collapse in={this.state.successMessage != "" || this.state.errorMessage != ""}>
                        {this.state.successMessage != "" ? 
                        <Alert severity="success" onClose={() => {this.setState({successMessage: ""})}}>{this.state.successMessage}</Alert>
                        :
                        <Alert severity="error" onClose={() => {this.setState({errorMessage: ""})}}>{this.state.errorMessage}</Alert>}
                    </Collapse>
                </Grid>

                <Grid item xs={12}>
                    <Typography component='h4' variant='h4'>
                        {label}
                    </Typography>
                </Grid>
                
                {/* the guest control playback state form */}
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormHelperText component="span">
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>

                        <RadioGroup row defaultValue={this.state.guestCanPause.toString() ?? " "} onChange={this.handleGuestPauseChange}>

                            <FormControlLabel value="true" 
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom" />
                            
                            <FormControlLabel value="false" 
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom" />

                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* the number of votes state form */}
                <Grid item xs={12}>
                    <FormControl>

                        <TextField required={true} type="number" defaultValue={this.state.votesToSkip}
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"},
                            }}
                            onChange={this.handleVotesChange} />

                        <FormHelperText component="span">
                            <div align="center">Votes Required to Skip</div>
                        </FormHelperText>

                    </FormControl>
                </Grid>

                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
                
            </Grid>
        );

    }

}

export default withRouter(CreateRoomPage);