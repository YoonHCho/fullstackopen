import Person from "./Person";

const Persons = ({ persons, handleDelete }) => (
  <ul className="persons">
    {
      persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person)} />
      )
    }
  </ul>
)

export default Persons;