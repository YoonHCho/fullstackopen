import Person from "./Person";

const Persons = ({ persons }) => (
  <>
    <table>
      <tbody>
          {
            persons.map(person =>
              <Person key={person.name} name={person.name} number={person.number} />
            )
          }
      </tbody>
    </table>
  </>
)

export default Persons;