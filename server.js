require('./model/database');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// mongoose
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

require('dotenv').config()

// middleware's
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connected to the PORT Number 
app.listen(process.env.PORT, (err) => {
  if(err) throw err;
  console.log('Connected to Port')
})

// API Calls

// Initial Home Page API Call
app.get('/', (req, res) => {
  res.redirect('/students');
});

// Create Button API Call
app.get('/create', (req, res) => {
  res.render('mainLayout');
});

// Create a new Student API Call
app.post('/', (req, res) => {
  const student = new Student();
  student.firstName = req.body.firstname;
  student.lastName = req.body.lastname;
  student.email = req.body.email;
  student.save((err) => {
      if (!err) {
        res.redirect('/');
      } else {
        console.log('Error during record creation : ' + err);
      }
  });
});

// Get All the Students API Call
app.get('/students', (req, res) => {
  Student.find({}, (err, students) => {
    if(err) throw err;
    res.render('list.ejs', {
      student: students
    })
  })
});

// Update Student by ID API Call
app.post('/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email
  }, (err) => {
    if(err) throw err;
    res.redirect('/students');
  });
})

// Finding Student by ID API Call
app.get('/:id', (req, res) => {
  Student.findById(req.params.id, (err, students) => {
    if (!err) {
        res.render('edit', {
            student: students
        });
    }
});
})

// Delete Student by ID API Call
app.get('/delete/:id', (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/students');
        }
        else { console.log('Error in student deletion :' + err); }
    });
});