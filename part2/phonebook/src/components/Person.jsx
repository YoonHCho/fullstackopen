import Button from "./Button";

const Person = ({ name, number, handleDelete }) => (
  <li>
    {name} &nbsp;
    {number} &nbsp; <Button handleDelete={handleDelete} />
  </li>
)

export default Person;