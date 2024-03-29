import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch(error => console.log("Error while connecting to MongoDB Atlas: ", error));

// adding validator for number
/*
have length of 8 or more
- be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers
eg. 09-1234556 and 040-22334455 are valid phone numbers
eg. 1234556, 1-22334455 and 10-22-334455 are invalid
*/

// defining validators
// const validator = (number) => {
//   return /^(?:\d{2}-\d{6,}|^\d{3}-\d{5,})$/.test(number);
// }
const validateHypen = number => {
  return number.split("-").length === 2;
};
const validateFirst = number => {
  const [first] = number.split("-");
  return first.length === 2 || first.length === 3;
};
const validateSecond = number => {
  const [first, second] = number.split("-");
  if (first.length === 2) {
    return second.length >= 6;
  } else if (first.length === 3) {
    return second.length >= 5;
  } else {
    return false;
  }
};
// Adding multi validators with custom error message when validator fails
const customMultiValidator = [
  { validator: validateHypen, message: "Must have one -" },
  { validator: validateFirst, message: "First part can only have 2 or 3 digits" },
  { validator: validateSecond, message: "Total number of digits needs to be at least 8 digits" },
];

const phonebookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    number: {
      type: String,
      required: true,
      validate: customMultiValidator,
    },
  },
  {
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

// Above { toJson: {...}} is same as below after defining phonebookSchema.
/*
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
*/

const Person = mongoose.model("Person", phonebookSchema);

export default Person;
