import { useEffect, useState } from 'react'
import Search from './components/Search';
import Countries from './components/Countries';
import countryServices from './services/countryService';

const App = () => {
  const [ countries, setCountries ] = useState(null);
  const [ search, setSearch ] = useState('')
  const [ result, setResult ] = useState(null);

  useEffect(() => {
    countryServices.getAll()
      .then(receivedData => {
        setCountries(receivedData);
      })
      .catch(() => console.log('Error fetching data in mount'));
  }, [])

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (!searchValue) {
      setResult(null);
      return;
    }

    const result = countries.filter(country => {
      const commonName = country.name.common;
      return commonName.toLowerCase().includes(searchValue.toLowerCase());
    })
    setResult(result)
  }

  const handleShow = country => () => {
    setResult(result => result.filter(r => {
      setSearch(country.name.common);
      return r.name.common === country.name.common
    }))
  }

  if (!countries) return <h1>LOADING...</h1>;

  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <Countries countries={result} handleShow={handleShow} />
    </>
  )
}

export default App;
