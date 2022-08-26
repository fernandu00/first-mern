const { json } = require("express");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const userModel = require("./models/user");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(json());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://fernandu:sudoaptget@cluster0.wk7dexp.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to the DB");
  }
);

// get all users
app.get("/getusers", (req, res) => {
  const users = userModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

// create user
app.post("/createuser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new userModel(user);
    await newUser.save();
    res.status(201).json({ msg: "success", data: newUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// get specific user
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.status(200).json({ msg: "success", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete specific user
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({ msg: `user id ${id} deleted`, data: deletedUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

// update user

app.patch("/users/:id", async (req, res) => {
  try {
    const updates = req.body;
    const id = req.params.id;
    options = { new: true };
    const updatedUser = await userModel.findByIdAndUpdate(id, updates, options);
    res.json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

const port = 3001;

app.listen(process.env.PORT || port, () => {
  console.log(`server running on port ${port}...`);
});
