import Button from "./Button";

const Person = ({ name, number, handleDelete }) => (
  <tr>
    <td>
      {name}
    </td>
    <td>
      {number} <Button handleDelete={handleDelete} />
    </td>
  </tr>
)

export default Person;