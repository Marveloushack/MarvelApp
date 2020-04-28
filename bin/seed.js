const mongoose = require("mongoose");
const User = require("../models/user.model");
require("dotenv").config();

const dbName = `${process.env.DB}`;
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    photoURL: "http://res.cloudinary.com/dw3tnxljg/image/upload/v1587927856/MarvelApp/home3.jpg.jpg",
    username: "a",
    email: "a@a.com",
    password: "$2b$10$KvkDbmJW.7wGvMt1WZl1Je36NR5i9.4lBKF6jWvp31kxQFZla7HHW",
    status: "Active",
    confirmationCode: "X6PhZefXL7eXVbfYGFnlV0lwO",
    location: { type: "Point", coordinates: [40.387071, -3.698199] },
  },
];

User.create(users)
  .then((allUsers) => {
    console.log("Usuarios creados");
    mongoose.connection.close();
  })
  .catch((err) => console.log(`An error ocurred: ${err}`));
