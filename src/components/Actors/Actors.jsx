import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Box, Grid, CircularProgress, Typography } from '@mui/material';
import { Movie as MovieIcon, ArrowBack } from '@mui/icons-material';
import { Pagination, MovieList } from '..';
import { useGetActorQuery, useGetActorMoviesQuery } from '../../services/TMDB';

import useStyles from './styles';

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data: actor, isFetching, error } = useGetActorQuery(id);
  const { data: movies, isFetching: isFetchingMovies, error: moviesError } = useGetActorMoviesQuery({ id, page });
  const classes = useStyles();
  const history = useHistory();

  console.log(actor);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (isFetchingMovies) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (moviesError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong. Please go back</Link>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`} alt={actor.name} />
      </Grid>
      <Grid item container direction="column" lg={7} style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3" align="left" gutterBottom>
          {actor.name}
        </Typography>
        <Typography variant="h4" align="left" gutterBottom>Born: {new Date(actor?.birthday).toDateString()}</Typography>
        <Typography variant="body1" align="left" gutterBottom>
          {actor?.biography}
        </Typography>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${actor?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {movies ? <MovieList movies={movies} numberOfMovies={12} /> : <Box>Sorry nothing was found</Box>}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
    </Grid>
  );
};

export default Actors;
