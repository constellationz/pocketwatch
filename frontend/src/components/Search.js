const Search = ({ setSearch }) => {
  return <input onChange={(event) => setSearch(event.target.value)} className="form-control mb-5 mt-5 search-bar" placeholder="Search" />;
};
export default Search;
