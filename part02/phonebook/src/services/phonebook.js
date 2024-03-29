import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then(response => response.data);
};

// don't need .catch because when error is returned from backend, axios will automatically reject the promise returned by axios.post and in frontend,
// the control flow will skip the then() block and jump directly to the .catch() block. Could still add .catch(error => {\n throw error }) if wanted to.
const addContact = newObject => {
  const response = axios.post(baseUrl, newObject);
  return response.then(response => response.data);
};

const deleteContact = id => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const updateContact = (id, newObject) => {
  const response = axios.put(`${baseUrl}`, newObject);
  return response
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export default {
  getAll,
  addContact,
  deleteContact,
  updateContact,
};
