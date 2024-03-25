import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Give password as argument or password, name, number as arguments");
  process.exit(1);
}

// Get the password to connect to MongoDB
const password = process.argv[2];
const url = `mongodb+srv://fullstackopen1:${password}@fullstackopen.mer1vko.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstackopen`;
mongoose.set("strictQuery", false);

// define Schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// define functions
const addPhonebookEntry = (name, number) => {
  const person = new Person({
    name,
    number,
  });

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to Phonebook`);
    mongoose.connection.close();
  });
};

const listPhonebookEntries = () => {
  console.log("Phonebook:");
  Person.find({}).then(result => {
    result.forEach(entry => console.log(`${entry.name} ${entry.number}`));
    mongoose.connection.close();
  });
};

// connect to mongoDB, and use method chaining to check process.argv.length to do different tasks.
mongoose
  .connect(url)
  .then(() => {
    if (process.argv.length === 3) {
      listPhonebookEntries();
    } else if (process.argv.length === 5) {
      const [, , , name, number] = process.argv;
      addPhonebookEntry(name, number);
    } else {
      console.log("Invalid number of arguments");
      process.exit(1);
    }
  })
  .catch(error => console.error(`Error connecting to MongoDB Atlas: ${error}`));

/* first try, would need to declare variable first for, password, name, number, and operation
if (process.argv.length === 3) {
  password = process.argv[2];
  operation = "get";
} else if (process.argv.length === 5) {
  password = process.argv[2];
  name = process.argv[3];
  number = process.argv[4];
  operation = "add";
} else {
  console.log("Need password only or all password, name, and number as arguments. If name has spaces use double quotes");
  process.exit(1);
}
const url = `mongodb+srv://fullstackopen1:${password}@fullstackopen.mer1vko.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstackopen`
mongoose.set("strictQuery", false);
mongoose.connect(url);
const addOne = () => {
  const person = new Person({
    name,
    number,
  });
  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to Phonebook`);
    mongoose.connection.close();
  });
};
const getAll = () => {
  console.log("Phonebook:");
  Person.find({}).then(result => {
    result.forEach(({ name, number }) => console.log(`${name} ${number}`));
    mongoose.connection.close();
  });
};
if (operation === "add") {
  addOne();
} else {
  getAll();
}
*/
