import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get movie genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // *Get movies by [type]
    getMovies: builder.query({
      query: ({ genreOrCategory, page, searchQuery }) => {
        // Get movies by search

        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get movies by category
        if (genreOrCategory && typeof genreOrCategory === 'string') {
          return `movie/${genreOrCategory}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get movies by genre
        if (genreOrCategory && typeof genreOrCategory === 'number') {
          return `discover/movie?with_genres=${genreOrCategory}&page=${page}&api_key=${tmdbApiKey}`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    //* Get user specific list
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    //* Get individual movie
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    //* Get user specific movies
    getRecommendations: builder.query({
      query: ({ movieId, list }) => `movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),
    //* Get actor information
    getActor: builder.query({
      query: (actorId) => `person/${actorId}?api_key=${tmdbApiKey}`,
    }),

    //* Get actor movies
    getActorMovies: builder.query({
      query: ({ actorId, page }) => `discover/movie?api_key=${tmdbApiKey}&with_cast${actorId}&page=${page}`,

    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorMoviesQuery,
  useGetListQuery,
} = tmdbApi;
