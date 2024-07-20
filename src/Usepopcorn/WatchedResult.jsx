/* eslint-disable react/prop-types */
import { useReducer } from "react";
import Reducer from "../Reducer";
import MovieDetails from "./MovieDetails";

export const WatchedResult = ({
  watched,
  selectedID,
  handleClose,
  setwatched,
  deleteItem,
}) => {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => parseInt(movie.Runtime)));
  const [state, dispatch] = useReducer(Reducer, true);

  return (
    <>
      {selectedID ? (
        <MovieDetails
          handleClose={handleClose}
          selectedID={selectedID}
          setwatched={setwatched}
          watched={watched}
        />
      ) : (
        <div className="pb-6">
          <button
            className="bg-[#243c5a] rounded-full px-2 m-4 text-[24px]"
            onClick={() => dispatch({ type: "hide" })}
          >
            {state ? "–" : "+"}
          </button>
          {state && (
            <>
              <div className="flex flex-col bg-gray-600 rounded-lg px-6 py-4">
                <h2 className="font-bold">Movies you watched</h2>
                <div className="flex justify-between">
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                  </p>
                </div>
              </div>

              <ul>
                {watched?.map((movie) => (
                  <li
                    key={movie.imdbID}
                    className="hover:bg-gray-500 px-6 py-2 rounded-lg duration-300 font-bold flex items-center gap-4"
                  >
                    <img
                      src={movie.Poster}
                      className="h-14"
                      alt={`${movie.Title} poster`}
                    />
                    <div className="flex-1">
                      <h3>{movie.Title}</h3>
                      <div className="flex justify-between">
                        <p>
                          <span>⭐️</span>
                          <span>{movie.imdbRating}</span>
                        </p>
                        <p>
                          <span>🌟</span>
                          <span>{movie.userRating}</span>
                        </p>
                        <p>
                          <span>⏳</span>
                          <span>{movie.Runtime}</span>
                        </p>
                      </div>
                    </div>
                    <span
                      onClick={() => deleteItem(movie.imdbID)}
                      role="button"
                    >
                      ❌
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};
