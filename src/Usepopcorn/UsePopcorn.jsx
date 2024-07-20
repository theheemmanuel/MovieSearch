import { Nav } from "./Nav";
import { Main } from "./Main";
import { useEffect, useReducer, useState } from "react";
import { ListResult } from "./ListResult";
import { WatchedResult } from "./WatchedResult";
import Reducer from "../Reducer";
import axios from "axios";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Runtime: "148 min",
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Runtime: "116 min",
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const InitialItems = { search: "", clickedMovies: null, movies: [] };
  const [state, dispatch] = useReducer(Reducer, InitialItems);
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?apikey=fc1f9ee8&s=${state.search}`)
      .then((res) => {
        dispatch({ type: "movieList", payload: res.data.Search });
      })
      .catch((error) => console.log(error));
  }, [state.search]);

  const [watched, setWatched] = useState(tempWatchedData);
  console.log(watched);
  return (
    <div className=" bg-gray-900 min-h-[100vh]">
      <div className="bg-[#663377] mx-4 rounded-3xl">
        <Nav
          query={state.search}
          setQuery={(input) => dispatch({ type: "search", payload: input })}
          movies={state.movies}
        />
      </div>
      <div>
        <Main>
          <div className="flex-1 bg-gray-800 min-h-[100vh] m-6 rounded-3xl h-[fit-content]">
            <ListResult
              movies={state.movies}
              clickMovies={(id) =>
                dispatch({ type: "selectedID", payload: id })
              }
            />
          </div>
          <div className="flex-1 bg-gray-800 m-6 min-h-[100vh] rounded-3xl h-[fit-content]">
            <WatchedResult
              watched={watched}
              selectedID={state.clickedMovies}
              setwatched={(item) => {
                setWatched((prev) => [item, ...prev]);
                dispatch({ type: "selectedID", payload: null });
              }}
              handleClose={() =>
                dispatch({ type: "selectedID", payload: null })
              }
              deleteItem={(item) => {
                setWatched((prev) => prev.filter((id) => id.imdbID !== item));
              }}
            />
          </div>
        </Main>
      </div>
    </div>
  );
}
