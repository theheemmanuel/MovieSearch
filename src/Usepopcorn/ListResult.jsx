/* eslint-disable react/prop-types */
import { useReducer } from "react";
import Reducer from "../Reducer";

export const ListResult = ({ movies, clickMovies }) => {
  const [state, dispatch] = useReducer(Reducer, true);
  return (
    <div className="pb-6">
      <button
        className="bg-[#243c5a] rounded-full px-2 m-4 text-[24px]"
        onClick={() => dispatch({ type: "hide" })}
      >
        {state ? "–" : "+"}
      </button>
      {state && (
        <ul className="list">
          {movies ? (
            movies.map((movie) => (
              <li
                onClick={() => clickMovies(movie.imdbID)}
                role="button"
                key={movie.imdbID}
                className="hover:bg-gray-500 px-6 py-2 rounded-lg duration-300 flex items-center gap-5 font-bold"
              >
                <img
                  src={movie.Poster}
                  className="h-14"
                  alt={`${movie.Title} poster`}
                />
                <div>
                  <h3>{movie.Title}</h3>
                  <div className="flex gap-2">
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="px-6 py-2 flex justify-center font-bold">
              No movie found
            </div>
          )}
        </ul>
      )}
    </div>
  );
};
