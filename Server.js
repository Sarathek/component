const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5500; // You can change this port if needed

app.use(bodyParser.json());
app.use(cors());

// Sample data storage
const formDataStore = {};

// Handling form submission
app.post('/submit', (req, res) => {
  const formData = req.body;
  const id = new Date().getTime().toString(); // Create a unique ID for the data

  formDataStore[id] = formData;

  res.status(200).json({ id });
});

// Handling data retrieval
app.get('/data', (req, res) => {
  const { id } = req.query;
  const fetchedData = formDataStore[id] || {};

  res.status(200).json(fetchedData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
