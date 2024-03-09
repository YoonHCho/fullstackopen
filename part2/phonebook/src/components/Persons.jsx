import Person from "./Person";

const Persons = ({ persons, handleDelete }) => (
  <>
    <table>
      <tbody>
          {
            persons.map(person =>
              <Person key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person)} />
            )
          }
      </tbody>
    </table>
  </>
)

export default Persons;