import "./App.css";
import { Main } from "./Usepopcorn/Main";
import { ListResult } from "./Usepopcorn/ListResult";
import { WatchedResult } from "./Usepopcorn/WatchedResult";
import { Nav } from "./Usepopcorn/Nav";
import useMovies from "./useMovies";

export default function App() {
  const { state, dispatch } = useMovies();
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
