const Search = ({ search, handleSearch }) => {
  return (
    <div>
      Find Countries: <input value={search} onChange={handleSearch} />
    </div>
  )
}

export default Search;