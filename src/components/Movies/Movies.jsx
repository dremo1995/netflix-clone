import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();
  if (isFetching) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  } if (!data.results.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="20px"
      >
        <Typography variant="h5">No movies found <br /> Please Search for something else</Typography>
      </Box>
    );
  } if (error) return 'An error occurred';

  return (
    <div><MovieList movies={data} /></div>
  );
};

export default Movies;
