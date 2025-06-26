const Task = require('./Task');
const express = require('express');
const router = express.Router();

// CRUD OPERATIONS

// CREATE
router.post('/tasks', async (req, res) => {
  try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).send(task);
  } catch (error) {
      res.status(400).send(error);
  }
});

// READ: Get all tasks
router.get('/tasks', async (req, res)=> {
  try{
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
})

// READ: Get a task by ID
router.get('/tasks/:id', async (req, res)=> {
  try{
    const tasks = await Task.findById(req.params.id);
    if (!tasks) return res.status(404).send({ message: 'Task not found' });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
})

// UPDATE: Update a task by ID
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true, runValidators: true });
    if (!task) return res.status(404).send({ message: 'Task not found' });
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE: Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send({ message: 'Task not found' });
    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;