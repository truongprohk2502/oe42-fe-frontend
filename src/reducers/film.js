import { createSlice } from "@reduxjs/toolkit";

export const filmSlice = createSlice({
  name: "film",
  initialState: {
    movies: [],
    playingMovies: [],
    ongoingMovies: [],
    selectedMovie: {},
    currentPage: 1,
    totalPage: 0,
    pending: false,
    error: null,
    pendingOngoingMovies: false,
    errorOngoingMovies: null,
    pendingPlayingMovies: false,
    errorPlayingMovies: null,
  },
  reducers: {
    getPlayingMovies: (state) => {
      state.pendingPlayingMovies = true;
      state.errorPlayingMovies = null;
    },
    getPlayingMoviesSuccess: (state, action) => {
      state.playingMovies = action.payload;
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = null;
    },
    getPlayingMoviesFailed: (state, action) => {
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = action.payload;
    },
    getOngoingMovies: (state) => {
      state.pendingOngoingMovies = true;
      state.errorOngoingMovies = null;
    },
    getOngoingMoviesSuccess: (state, action) => {
      state.ongoingMovies = action.payload;
      state.pendingOngoingMovies = false;
      state.errorOngoingMovies = null;
    },
    getOngoingMoviesFailed: (state, action) => {
      state.pendingOngoingMovies = false;
      state.errorOngoingMovies = action.payload;
    },
    getScreeningMovies: (state) => {
      state.pending = true;
      state.error = null;
    },
    getScreeningMoviesSuccess: (state, action) => {
      state.movies = action.payload;
      state.pending = false;
      state.error = null;
    },
    getScreeningMoviesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getPlayingHottestMovies: (state) => {
      state.pendingPlayingMovies = true;
      state.errorPlayingMovies = null;
    },
    getPlayingHottestMoviesSuccess: (state, action) => {
      state.playingMovies = action.payload;
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = null;
    },
    getPlayingHottestMoviesFailed: (state, action) => {
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = action.payload;
    },
    getDetailMovie: (state) => {
      state.pending = true;
      state.error = null;
    },
    getDetailMovieSuccess: (state, action) => {
      state.selectedMovie = action.payload;
      state.pending = false;
      state.error = null;
    },
    getDetailMovieFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getSearchMovies: (state) => {
      state.pending = true;
      state.error = null;
    },
    getSearchMoviesSuccess: (state, action) => {
      const { movies, currentPage, totalPage } = action.payload;
      state.movies = movies;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getSearchMoviesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getFilterMovies: (state) => {
      state.pending = true;
      state.error = null;
    },
    getFilterMoviesSuccess: (state, action) => {
      const { movies, currentPage, totalPage } = action.payload;
      state.movies = movies;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getFilterMoviesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getMovies: (state) => {
      state.pending = true;
      state.error = null;
    },
    getMoviesSuccess: (state, action) => {
      const { movies, currentPage, totalPage } = action.payload;
      state.movies = movies;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getMoviesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    postMovie: (state) => {
      state.pending = true;
      state.error = null;
    },
    postMovieSuccess: (state) => {
      state.pending = false;
      state.error = null;
    },
    postMovieFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putMovie: (state) => {
      state.pending = true;
      state.error = null;
    },
    putMovieSuccess: (state, action) => {
      const movie = action.payload;
      state.movies = state.movies.map((item) =>
        item.id === movie.id ? movie : item
      );
      state.pending = false;
      state.error = null;
    },
    putMovieFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putRating: (state) => {
      state.pending = true;
      state.error = null;
    },
    putRatingSuccess: (state, action) => {
      if (action.payload) {
        state.selectedMovie = action.payload;
      }
      state.pending = false;
      state.error = null;
    },
    putRatingFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPlayingMovies,
  getPlayingMoviesSuccess,
  getPlayingMoviesFailed,
  getOngoingMovies,
  getOngoingMoviesSuccess,
  getOngoingMoviesFailed,
  getScreeningMovies,
  getScreeningMoviesSuccess,
  getScreeningMoviesFailed,
  getPlayingHottestMovies,
  getPlayingHottestMoviesSuccess,
  getPlayingHottestMoviesFailed,
  getDetailMovie,
  getDetailMovieSuccess,
  getDetailMovieFailed,
  getSearchMovies,
  getSearchMoviesSuccess,
  getSearchMoviesFailed,
  getFilterMovies,
  getFilterMoviesSuccess,
  getFilterMoviesFailed,
  getMovies,
  getMoviesSuccess,
  getMoviesFailed,
  postMovie,
  postMovieSuccess,
  postMovieFailed,
  putMovie,
  putMovieSuccess,
  putMovieFailed,
  putRating,
  putRatingSuccess,
  putRatingFailed,
} = filmSlice.actions;

export default filmSlice.reducer;
