export default function Reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "search":
      return { ...state, search: action.payload };
    case "hide":
      return { ...state, status: !state.status };
    case "toggle":
      return { ...state, loading: action.payload };
    case "movieView":
      return { ...state, movieView: action.payload };
    case "selectedID":
      return { ...state, clickedMovies: action.payload };
    case "movieList":
      return { ...state, movies: action.payload };
    case "updateMovie":
      return { ...state, watched: [action.payload, ...state.watched] };
    case "remove":
      return {
        ...state,
        watched: state.watched.filter((item) => item.imdbID !== action.payload),
      };
  }
  return state;
}
