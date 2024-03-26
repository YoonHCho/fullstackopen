import express from "express";
/* import { data } from "./data.js";
    tried to use the data by importing (to separate files for data and functionality), however it didn't work. in the data.js file, declared the variable with let, but when attempting to modify it (by using delete method), keep getting TypeError: Assignment to constant variable. It seems that within the file data.js, it is allowed to modify it as it should, however, within the file that imports the data variable, data acts as a reference to the original array, but it is a read-only reference so I cannot directly modify it. This mechanism is to helps prevent accidental modifications of the imported data, promoting a safer development practice.
*/
// Implementing morgan as a logging tool.
import morgan from "morgan";

// Implementing cors to unblock the requests.
import cors from "cors";
import "dotenv/config";
import Person from "./models/phonebook.js";

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

// To allow frontend and backend to communicate securely across different origins
const PORT = process.env.PORT;
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

// ex 3.7
// app.use(morgan("tiny"));

// ex 3.8: creating my own token, in this case "body" to be used in the custom symbols, :symbol.
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// app.use(morgan("tiny"));

// Link with fly.io will give the frontend page from dist directory
// app.get("/", (request, response) => {
//   response.send("<h1>Phonebook Backend</h1>");
// });

app.get("/api/persons", (request, response) => {
  // response.status(200).json(data);
  Person.find({}).then(phonebook => {
    response.status(200).json(phonebook);
  });
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
  Person.findById(request.params.id)
    .then(returnedPerson => {
      if (returnedPerson) {
        response.status(200).json(returnedPerson);
      } else {
        // if no id matches even with mongo identifier format
        response.status(404).json({ error: `Cannot find info with ID number ${request.params.id}` });
      }
    })
    .catch(error => {
      // will trigger if id doesn't match Mongo identifier format
      return response.status(500).json({ error: `${error}` });
    });
  // const id = Number(request.params.id);
  // const person = data.find(el => el.id === id);
  // if (!person) {
  //   return response.status(404).json({ error: `Cannot find info with ID number ${id}` });
  // }
  // response.status(200).json(person);
});

const createId = () => {
  return Math.floor(Math.random() * 10001);
};

// ignore whether there is already a person in the database for now, per ex.3.14
// const checkName = nameToCheck => {
//   return data.find(el => el.name.toLowerCase() === nameToCheck.toLowerCase());
// };

app.post("/api/persons", (request, response) => {
  const { body } = request;
  if (!body.name || !body.number) {
    return response.status(404).json({ error: "Need both name and number" });
  }

  // ignore whether there is already a person in the database for now, per ex.3.14
  // if (checkName(body.name)) {
  //   return response.status(409).json({ error: "Name must be unique" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(person => {
    response.status(201).json(person);
  });

  // const person = {
  //   id: createId(),
  //   name: body.name,
  //   number: body.number,
  // };
  // data = data.concat(person);
  // response.status(201).json(person);
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
