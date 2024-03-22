import List from "./List";

const CountriesList = ({ countries, handleShow }) => (
  <ul>
    {
      countries.map(country => (
        <List key={country.name.common} country={country} handleShow={handleShow} />
      ))
    }
  </ul>
)

export default CountriesList;