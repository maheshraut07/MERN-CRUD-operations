const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CRUD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3001, () => {
  console.log('Server is running at port 3001');
});

app.get('/', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    id,
    { 
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age 
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(result => {
      if (!result) {
        return res.status(404).send('User not found');
      }
      res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

app.post('/create', async (req, res) => {
  try {
    const { Name, Email, Age } = req.body;
    const user = await UserModel.create({ Name, Email, Age });

    res.status(201).json(user);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;

/**
 In Express.js, app.get(), app.post(), app.put(), app.delete(), etc., are methods used to define routes in your application. Here's a simple explanation of each:

app.get(path, callback): This method is used to define a route that listens for GET requests sent to the specified path. When a GET request is made to that path, the callback function is executed. The callback function typically sends a response back to the client, such as HTML, JSON, or other data.

Example:

javascript
Copy code
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.post(path, callback): This method is similar to app.get(), but it defines a route that listens for POST requests instead of GET requests. POST requests are often used to submit data to the server, such as form submissions.

Example:

javascript
Copy code
app.post('/submit', (req, res) => {
  const data = req.body; // Access data submitted in the request body
  // Process the data...
  res.send('Data received!');
});
app.put(path, callback): This method is used to define a route that listens for PUT requests. PUT requests are typically used to update existing resources on the server.

app.delete(path, callback): This method defines a route that listens for DELETE requests. DELETE requests are used to delete resources on the server.

These methods allow you to create different routes in your Express application and define how your server should respond to different types of HTTP requests.


 */