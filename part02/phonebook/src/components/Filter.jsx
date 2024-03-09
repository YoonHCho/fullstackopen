const Filter = ({ filterName, setFilterName }) => (
  <div>
    Filter shown with <input value={filterName} onChange={(e) => setFilterName(e.target.value)} />
  </div>
)

export default Filter;