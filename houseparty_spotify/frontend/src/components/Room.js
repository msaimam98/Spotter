import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";

import { Grid, Button, Typography } from '@mui/material';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";


export default function Room(props) {
    
    const[votesToSkip,setVotesToSkip] = useState(0);
    const[guestCanPause,setGuestCanPause] = useState(false);
    const[isHost,setIsHost] = useState(false);
    const[spotifyAuthenticated,setSpotifyAuthenticated] = useState(false);
    const [song, setSong] = useState({});
    const[showSettings,setShowSettings] = useState(false);
    
    const { roomCode } = useParams();

    let navigate = useNavigate();

      useEffect(() => {
        const interval = setInterval(() => {
          getCurrentSong();
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    const getCurrentSong = () => {
        fetch('/spotify/current-song').then(response => {
            if (!response.ok) {
                return {};
            } else {
                return response.json();               
            }
        })
        .then(data => {
            setSong(data);
        })
    }

    const authenticateSpotify = () => {
        fetch('/spotify/is-authenticated').then(response => response.json())
        .then(data => {
            setSpotifyAuthenticated(data.status);

            if (!data.status) {
                fetch('/spotify/get-auth-url').then(response => response.json())
                .then(data => {
                    window.location.replace(data.url);
                })
            }
        });
    }

    const leaveRoom = () => {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
    
        fetch('/api/leave-room', requestOptions)
        .then(response => {
            props.leaveRoomCallback();
            navigate('/');
        });
    };

    const updateShowSettings = value => {
        setShowSettings(value);
    };

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>Settings</Button>
            </Grid>
        );
    };

    const renderSettings = () => {
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <CreateRoomPage update={true} roomCode={roomCode} 
                    votesToSkip={votesToSkip} guestCanPause={guestCanPause} updateCallback={getRoomDetails} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>Close</Button>
                </Grid>
            </Grid>
        );
    };

    const getRoomDetails = () => {
        fetch('/api/get-room?code=' + roomCode)
        .then((response) => {
            if (!response.ok) {
                props.leaveRoomCallback();
                navigate('/');
            }
            return response.json();
        })
        .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);

            if (isHost) {
                authenticateSpotify();
            }
        });
    }


    getRoomDetails();
    getCurrentSong();

    if (showSettings) {
        return renderSettings();
    } else {
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Code: {roomCode}
                    </Typography>
                </Grid> 

                <MusicPlayer song={song} />

                {isHost ? renderSettingsButton() : null} 
    
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={leaveRoom}>
                        Leave Room
                    </Button>
                </Grid> 
            </Grid>
        )
    }

}