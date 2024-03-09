import { useState } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  const handleAddContact = (e) => {
    e.preventDefault();
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }]);
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter filterName={filterName} setFilterName={setFilterName} />

        <h3>Add a New</h3>
        <PersonForm
          handleAddContact={handleAddContact}
          newName={newName}
          setNewName={setNewName}
          number={newNumber}
          setNumber={setNewNumber}
        />

        <h3>Numbers</h3>
        <Persons persons={filteredPersons} />
      </div>
    </>
  )
}

export default App
