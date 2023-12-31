const taskModel = require("../mongo/task");
const UserModel = require("../mongo/userModel");
const bcrypt = require('bcrypt');
const schedule = require('node-schedule');

const deleteTasksWithEndDateToday = async () => {
  try {
    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;

    // Delete tasks with end date before or equal to today
    const tasksToDelete = await taskModel.deleteMany({ endDate: { $lte: today } });
    
  } catch (error) {
    console.error('Error deleting tasks:', error);
  }
};
// const scheduledJob = schedule.scheduleJob('0 23 * * *', deleteTasksWithEndDateToday);
const scheduledJob = schedule.scheduleJob('6 15 * * *', deleteTasksWithEndDateToday);

const uploadTask = async (req, res) => {
  const { email, task, endDate,grade } = req.body;
  try {
    const date = new Date();

    if (!task ||!endDate) {
      return res.status(400).json({ error: 'task and end date are required.' });
    }

    if (new Date(endDate) < date) {
      return res.status(400).json({ error: 'Task end date cannot be before today.' });
    }
    
    const user = await UserModel.findOne({ email });
    if (user) {
      const newTask = new taskModel({
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture
        },
        task,
        grade,
        endDate: endDate || undefined
      });
      await newTask.save();
      res.status(200).json({ msg: 'Task Added Successfully' });
    } else {
      return res.status(401).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { uploadTask, getTasks };
