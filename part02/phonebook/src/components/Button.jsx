const Button = ({ handleDelete }) => (
  <button onClick={(person) => handleDelete(person)}>Delete</button>
)

export default Button;