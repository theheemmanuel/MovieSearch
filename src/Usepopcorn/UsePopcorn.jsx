import { Nav } from "./Nav";
import { Main } from "./Main";
import { useEffect, useReducer, useState } from "react";
import { ListResult } from "./ListResult";
import { WatchedResult } from "./WatchedResult";
import Reducer from "../Reducer";
import axios from "axios";

export default function App() {
  const InitialItems = {
    search: "",
    clickedMovies: null,
    movies: [],
    watched: JSON.parse(localStorage.getItem("watched")),
  };
  const [state, dispatch] = useReducer(Reducer, InitialItems);

  // const [watched, setWatched] = useState(
  //   JSON.parse(localStorage.getItem("watched"))
  // );
  useEffect(() => {
    if (state.search) {
      axios
        .get(`http://www.omdbapi.com/?apikey=fc1f9ee8&s=${state.search}`)
        .then((res) => {
          dispatch({ type: "movieList", payload: res.data.Search });
        })
        .catch((error) => console.log(error));
    }
  }, [state.search]);
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state.watched]);
  console.log(state.watched);
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
              watched={state.watched}
              selectedID={state.clickedMovies}
              setwatched={(item) => {
                dispatch({ type: "updateMovie", payload: item });
                dispatch({ type: "selectedID", payload: null });
              }}
              handleClose={() =>
                dispatch({ type: "selectedID", payload: null })
              }
              deleteItem={(id) => {
                dispatch({ type: "remove", payload: id });
              }}
            />
          </div>
        </Main>
      </div>
    </div>
  );
}
