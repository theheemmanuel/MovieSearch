/* eslint-disable react/prop-types */
export const Nav = ({ movies, query, setQuery }) => {
  return (
    <nav className="flex justify-between items-center text-white font-bold p-4">
      <div className="flex text-[25px] gap-4">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="border-none px-4 py-2 text-[14px] text-gray-700 outline-none flex-[0.5] rounded-lg"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {movies ? (
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      ) : (
        <p className="num-results">No results found</p>
      )}
    </nav>
  );
};
