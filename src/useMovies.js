import axios from "axios";
import { useEffect, useReducer } from "react";
import Reducer from "../src/Reducer";

export default function useMovies() {
  const InitialItems = {
    search: "",
    clickedMovies: null,
    movies: [],
    watched: JSON.parse(localStorage.getItem("watched")) || [],
    status: true,
  };
  const [state, dispatch] = useReducer(Reducer, InitialItems);
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);
  const key = "fc1f9ee8";
  useEffect(() => {
    if (state.search) {
      axios
        .get(`http://www.omdbapi.com/?apikey=${key}&s=${state.search}`)
        .then((res) => {
          dispatch({ type: "movieList", payload: res.data.Search });
        })
        .catch((error) => console.log(error));
    }
  }, [state.search]);
  return { state, dispatch };
}
