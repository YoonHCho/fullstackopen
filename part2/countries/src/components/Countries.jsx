import OneCountry from "./OneCountry";
import CountriesList from "./CountriesList";

const Countries = ({ countries, handleShow }) => {
  if (!countries) return;
  if (countries.length > 10) return `Too many matches, specify another filter`;
  const onlyResult = countries.length === 1;
  return onlyResult ? (
        <OneCountry country={countries[0]} />
      ) : (
        <CountriesList countries={countries} handleShow={handleShow} />
      )
}

export default Countries;