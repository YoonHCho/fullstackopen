import Weather from "./Weather";

const OneCountry = ({ country }) => {
  const { name: { common: cName }, capital, capitalInfo, area, languages, flags } = country;
  const [ lat, lng ] = capitalInfo.latlng;
  return (
    <>
      <h1>{cName}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {area}</div>

      <h2>Languages: </h2>
      <ul>
        {
          Object.values(languages).map(language => (
            <li key={language}>{language}</li>
          ))
        }
      </ul>
      <div>
        <img src={flags.png} alt={flags.alt} style={{height: '160px'}} />
      </div>
      <Weather name={capital} lat={lat} lng={lng} />
    </>
  )
}

export default OneCountry;