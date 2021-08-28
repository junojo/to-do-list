const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const Task = require('./models/task');
const { request } = require('mongoose');
const { response } = require('express');

// teste
const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response, next) => {
  Task.find({})
    .then((tasks) => {
      response.render('home', { tasks: tasks });
    })
    .catch((error) => {
      next(error);
    });
});

// Add task
app.post('/', (request, response, next) => {
  //   console.log(request.body);
  const task = request.body.task;

  Task.create({
    task: task
  })
    .then((task) => {
      console.log('>> Task Added');
      response.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

// Remove task
app.post('/task/:id/delete', (request, response, next) => {
  const id = request.params.id;
  Task.findByIdAndDelete(id)
    .then(() => {
      console.log('>> Task Deleted');
      response.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

// All Requests
app.get('*', (request, response, next) => {
  next(new Error('NOT_FOUND'));
});

// Catch all errors
app.use((error, request, response, next) => {
  console.log(error);
  response.render('error');
});

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {}).then(() => {
  app.listen(3000);
});
