import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, []);

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
