const List = ({ country, handleShow }) => (
  <li>
    {country.name.common} <button onClick={handleShow(country)} >Show</button>
  </li>
)

export default List;