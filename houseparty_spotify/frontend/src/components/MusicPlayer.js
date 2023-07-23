import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";

import { PlayArrow, Pause, SkipNext } from "@mui/icons-material";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }

  skipSong() {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        'Accept': 'application/json',
      };

      fetch("/spotify/skip-song", requestOptions);
  }

  pauseSong() {
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        'Accept': 'application/json',
      };

      fetch("/spotify/pause-song", requestOptions)
      .then(res => {
          console.log(res);
      });
  }

  playSong() {
    console.log("playing song");
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      'Accept': 'application/json',
    };

    fetch("/spotify/play-song", requestOptions);
  }

  render() {

    const songProgress = (this.props.song.time / this.props.song.duration) * 100;

    return (
      <Card>
        {this.props.song ?
        <>
          <Grid container alignItems="center">

            <Grid item align="center" xs={4}>
              <img src={this.props.song.image_url} height="100%" width="100%" />
            </Grid>

            <Grid item align="center" xs={8}>
              <Typography component="h5" variant="h5">
                {this.props.song.title}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                {this.props.song.artist}
              </Typography>

              <div>
                <IconButton onClick={() => {
                  this.props.song.is_playing ? this.pauseSong() : this.playSong()
                }}>
                {this.props.song.is_playing ? <Pause /> : <PlayArrow />}
              </IconButton>

              <IconButton onClick={() => this.skipSong()}>
                <SkipNext /> {this.props.song.votes} / {" "} {this.props.song.votes_required}
              </IconButton>

              </div>
            </Grid>

        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
        </>
          : <div></div>
        }
      </Card>
        );

    }

}