import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { FeaturedMovie, MovieList, Pagination } from '..';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreOrCategory, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreOrCategory, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numOfMovies = lg ? 16 : 18;

  if (isFetching) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <CircularProgress size="4rem" />
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
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
