const express = require("express");
const router = express.Router();
const Person = require("../models/Persons");
// @route GET api/persons
// @desc Get all persons
// @access Public
router.get("/persons", (req, res) => {
  Person.find()
    .sort({ date: -1 })
    .then((persons) => res.json(persons));
});
router.get("/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .sort({ date: -1 })
    .then((persons) => res.json(persons));
});
// @route POST api/persons
// @desc Add new person
// @access Public
router.post("/persons", (req, res) => {
  const newPerson = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
  });
  newPerson.save().then((person) => res.json(person));
});
// @route PUT api/persons/:id
// @desc Update person
// @access Public
router.put("/persons/:id", async (req, res) => {
  const { firstName, lastName, age, gender } = req.body;
  //Build person object
  const personFields = {};
  if (firstName) personFields.firstName = firstName;
  if (lastName) personFields.lastName = lastName;
  if (age) personFields.age = age;
  if (gender) personFields.gender = gender;

  try {
    let person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ msg: "Person not found" });

    person = await Person.findByIdAndUpdate(
      req.params.id,
      { $set: personFields },
      { new: true }
    );
    res.send(person);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error...");
  }
});
// @router DELETE api/person/:id
// @desc Delete a person
// @access Public
router.delete("/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => person.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
