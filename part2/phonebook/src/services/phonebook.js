import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then(response => response.data);
};

const addContact = newObject => {
  const response = axios.post(baseUrl, newObject);
  return response.then(response => response.data);
};

const deleteContact = id => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then(response => response.data);
};

const updateContact = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject);
  return response.then(response => response.data);
};

export default {
  getAll,
  addContact,
  deleteContact,
  updateContact,
};
