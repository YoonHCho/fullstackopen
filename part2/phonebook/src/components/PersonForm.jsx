const PersonForm = ({ handleAddContact, setNewName, setNumber, newName, number }) => (
  <form onSubmit={handleAddContact}>
    <div>
      Name: <input value={newName} onChange={e => setNewName(e.target.value)} />
    </div>
    <div>
      Number: <input value={number} onChange={e => setNumber(e.target.value)} />
    </div>
    <div>
      <button type='submit'>Add</button>
    </div>
  </form>
)

export default PersonForm;