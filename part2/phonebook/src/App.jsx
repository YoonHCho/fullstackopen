import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import phoneService from "./services/phonebook"

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  useEffect(() => {
    phoneService.getAll()
      .then(initialContacts => setPersons(initialContacts))
  }, []);

  const handleAddContact = (e) => {
    e.preventDefault();
    let found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (found) {
      const toUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      // const toUpdate = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`);
      if (toUpdate) {
        const newObject = {...found, number: newNumber};
        phoneService.updateContact(newObject.id, newObject)
          .then(updatedPerson => {
            setPersons(persons => persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
      return;
    }

    // if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
    //   alert('already exist');
    //   return
    // }

    const newContact = { name: newName, number: newNumber };
    phoneService.addContact(newContact)
      .then(contact => {
        setPersons([...persons, contact ]);
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (person) => {
    const { id, name } = person;
    const deletePerson = window.confirm(`Delete ${name}?`);
    if (deletePerson) {
      phoneService.deleteContact(id)
        .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
    }
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
        <Persons persons={filteredPersons} handleDelete={handleDelete} />
      </div>
    </>
  )
}

export default App
