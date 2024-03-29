import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';
import phoneService from "./services/phonebook"

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState(null)

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
          .catch(error => {
            console.log("ERROR FOR ALREADY REMOVED:", error);
            setNotificationMessage(`Information on "${newName}" has already been removed from server`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(persons => persons.filter(person => person.id !== found.id));
          })
      }
      return;
    }

    const newContact = { name: newName, number: newNumber };
    phoneService.addContact(newContact)
      .then(contact => {
        setPersons([...persons, contact ]);
        setNotificationMessage(`Added ${contact.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error);
        setNotificationMessage(error.response.data.error);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
  }

  const handleDelete = (person) => {
    const { id, name } = person;
    const deletePerson = window.confirm(`Delete ${name}?`);
    if (deletePerson) {
      phoneService.deleteContact(id)
        .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(() => {
        setNotificationMessage(`Information on "${name}" has already been removed from server`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons => persons.filter(person => person.id !== id));
      })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification notificationMessage={notificationMessage} />
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
