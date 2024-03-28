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

let data;
// in case need below for something else
// let data = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

const app = express();
const PORT = process.env.PORT;

// To allow frontend and backend to communicate securely across different origins
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

// ex 3.7
// app.use(morgan("tiny"));

// ex 3.8: creating my own token, in this case "body" to be used in the custom symbols, :symbol.
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// function for unknown endpoints, these errors will use the middleware and will be called when there are no accessible endpoints, but needs to be at the end of the file
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};
// function for error handling
const errorHandler = (error, request, response, next) => {
  // console.log("ErrorHandler error: ", error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  // else if (error.name === "Person validation failed") {
  //   return response
  //     .status(400)
  //     .send({ error: "Person validation failed: name: Path `name` (`df`) is shorter than the minimum allowed length (3)." });
  // }

  next(error);
};

app.get("/", (request, response) => {
  response.send("<h1>Phonebook Backend</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(phonebook => {
    response.status(200).json(phonebook);
  });
});

app.get("/info", (request, response, error) => {
  const date = new Date();
  Person.countDocuments({})
    .then(count => {
      response.status(200).send(`
        <div>
          <p>Phonebook has info for ${count} people</p>
          <p>${date}</p>
        </div>
      `);
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(returnedPerson => {
      if (returnedPerson) {
        response.status(200).json(returnedPerson);
      } else {
        response.status(404).json({ error: `Cannot find info with ID number ${request.params.id}` });
      }
    })
    .catch(error => {
      next(error);
    });
});

// ignore whether there is already a person in the database for now, per ex.3.14
// const checkName = nameToCheck => {
//   return data.find(el => el.name.toLowerCase() === nameToCheck.toLowerCase());
// };

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;
  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: "Need both name and number" });
  // } else if (body.name.length < 3) {
  //   return response.status(400).json({ error: "Name has to be longer then 3 characters" });
  // }

  // ignore whether there is already a person in the database for now, per ex.3.14
  // if (checkName(body.name)) {
  //   return response.status(409).json({ error: "Name must be unique" });
  // }

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then(person => {
      response.status(201).json(person);
    })
    .catch(error => {
      // console.log(error.message);
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({ error: `Both Name and Number are required` });
  }

  // first param is to find the document matching name, and second argument is the update operation: update number, third to tell mongoose to return the modified document
  // regex to apply case-insensitive search
  Person.findOneAndUpdate({ name: { $regex: "^" + name + "$", $options: "i" } }, { number }, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.status(200).json(updatedPerson);
      } else {
        response.status(404).json({ error: `Cannot find contact ID ${id}` }); // or status(204).end()
      }
    })
    .catch(error => next(error));

  // below is finding by id, and not by name.
  // const { id } = request.params;
  // const person = {
  //   name,
  //   number,
  // };
  // Person.findByIdAndUpdate(id, person, { new: true })
  //   .then(updatedPerson => {
  //     if (updatedPerson) {
  //       response.status(200).json(updatedPerson);
  //     } else {
  //       response.status(404).json({ error: `Cannot find contact ID ${id}` }); // or status(204).end()
  //     }
  //   })
  //   .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
