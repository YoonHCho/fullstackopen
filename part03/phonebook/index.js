import express from "express";
/* import { data } from "./data.js";
    tried to use the data by importing (to separate files for data and functionality), however it didn't work. in the data.js file, declared the variable with let, but when attempting to modify it (by using delete method), keep getting TypeError: Assignment to constant variable. It seems that within the file data.js, it is allowed to modify it as it should, however, within the file that imports the data variable, data acts as a reference to the original array, but it is a read-only reference so I cannot directly modify it. This mechanism is to helps prevent accidental modifications of the imported data, promoting a safer development practice.
*/

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
  response.send("<h1>Phonebook Backend</h1>");
});

app.get("/api/persons", (request, response) => {
  response.status(200).json(data);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const length = data.length;
  response.status(200).send(`
    <div>
    <p>Phonebook has info for ${length} people</p>
    <p>${date}</p>
    </div>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find(el => el.id === id);
  if (!person) {
    return response.status(404).json({ error: `Cannot find info with ID number ${id}` });
  }
  response.status(200).json(person);
});

app.delete("/api/persons/delete/:id", (request, response) => {
  const id = Number(request.params.id);
  const newPersons = data.filter(el => el.id !== id);
  if (newPersons.length === data.length) {
    return response.status(404).json({ error: "something went wrong and couldn't complete delete" });
  }
  data = newPersons;
  response.status(200).json({ statusMessage: `ID number ${id} deleted successfully` });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
