/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Reducer from "../Reducer";

export default function MovieDetails({
  handleClose,
  selectedID,
  setwatched,
  watched,
}) {
  const initialStatus = { movieView: null, loading: true };
  const [state, dispatch] = useReducer(Reducer, initialStatus);

  const key = "fc1f9ee8";
  useEffect(() => {
    dispatch({ type: "toggle", payload: true });
    axios
      .get(`http://www.omdbapi.com/?apikey=${key}&i=${selectedID}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "movieView", payload: res.data });
        dispatch({ type: "toggle", payload: false });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "toggle", payload: false });
      });
  }, [selectedID]);
  const [full, setfull] = useState();
  const [showfull, setshowfull] = useState();
  useEffect(() => {
    setfull(0);
    setshowfull(0);
  }, [selectedID]);
  return state.loading ? (
    <div className="flex justify-center p-4 font-bold text-xl">
      Fetching Movie Details...
    </div>
  ) : (
    state.movieView && (
      <div>
        <button
          className="bg-[#243c5a] rounded-full px-2 m-4 text-[24px]"
          onClick={handleClose}
        >
          ←
        </button>
        <div className="">
          <div className="bg-gray-700 rounded-lg flex gap-6 p-4">
            <img className="w-1/2 h-52" src={state.movieView.Poster} alt="" />
            <div className="w-1/2">
              <p className="my-2 text-xl font-bold">{state.movieView.Title}</p>
              <p>{state.movieView.Genre}</p>
              <p>{state.movieView.Released}</p>
              <p>{state.movieView.Runtime}</p>
              <p>⭐️{state.movieView.imdbRating} IMDb Rating</p>
            </div>
          </div>

          {watched.find((item) => item.imdbID === selectedID) ? (
            <span className="flex justify-center w-[fit-content] mx-auto p-2 mt-3 rounded-xl bg-[#574f5f]">
              Already added to watched list
            </span>
          ) : (
            <div className="flex flex-col items-center border-2 border-gray-600 m-4 p-2 rounded-3xl">
              <div className="flex">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((each) => (
                  <div
                    className="p-2 cursor-pointer"
                    onMouseEnter={() => setfull(each)}
                    onMouseLeave={() => setfull(showfull)}
                    onClick={() => setshowfull(full)}
                    key={each}
                  >
                    {full >= each ? "✪" : "⭑"}
                  </div>
                ))}
              </div>
              <p>{full || showfull} stars</p>
              {full >= 3 && (
                <button
                  onClick={() =>
                    setwatched({ ...state.movieView, userRating: full })
                  }
                  className="flex justify-center w-[fit-content] mx-auto p-2 mt-3 rounded-xl bg-[#663399]"
                >
                  Add to Watched list
                </button>
              )}
            </div>
          )}
          <div className="p-4 flex flex-col gap-3">
            <p className="">
              <span className="font-bold">Plot:</span> {state.movieView.Plot}
            </p>
            <p>
              <span className="font-bold"> Languages:</span>{" "}
              {state.movieView.Language}
            </p>
            <p>
              <span className="font-bold"> Writers:</span>{" "}
              {state.movieView.Writer}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
