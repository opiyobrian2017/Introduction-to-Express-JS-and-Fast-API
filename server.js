const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes');

const app = express();
app.use(express.json());

const mongoUri = 'mongodb://localhost:27017/taskdb';
const PORT = 3000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => { console.log('You are now Connected to MongoDB');
}).catch(err => console.error('MongoDB connection error:', err));

app.use('/', taskRoutes);


app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${POTR}');
});