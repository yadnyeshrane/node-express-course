const asynWrapper = require("../middleware/async");
const Task = require("../models/Task");

const getAllTask = asynWrapper(async (req, res) => {
  
    const taskData = await Task.find({});
    res.status(201).json({ taskData });

})

const createTask = async (req, res,next) => {
  //   res.send('create task');
  // res.json(req.body)
  try {
    const task = await Task.create(req.body);
    return res.status(201).json({ task });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ msg: err });
  }
};
const getTask = async (req, res) => {
  // res.send('get Single task');
  // res.json({ id: req.params.id });
  console.log("ID", req.params.id);
  try {
    const { id: taskID } = req.params.id;
    const getSingleTask = await Task.findOne({ _id: taskID });
    if (!getSingleTask) {
      const error= new Error('Not Found');
      error.status=404;
      return next(error);
      return res.status(404).json({ msg: "no taks with id" });
    }

    return res.status(200).json({ getSingleTask });
  } catch (err) {
    //console.log(err)
    return res.status(500).json({ msg: err });
  }
};
const updateTask = async(req, res) => {
  try{
const {id:taskId}=req.params;
const data=req.body;
const task=await Task.findOneAndUpdate({_id:taskId},req.body,{new:true,runValidators:true})
//the run and new is written becoz when we are updating we are not getting the updated res and some for validation purpose
if(!task)
{
  return res.status(404).json({ msg: "no taks with id" });
}
res.status(200).json({data:task})
// console.log('data',data);
// res.status(200).json({id:taskId,data:data});

  }
  catch(error)
  {

    return res.status(500).json({msg:error})
  }
//  res.send("update task");
};

const deleteTask = async (req, res) => {
  // res.send("delete task");
  console.log("ID", req.params);
  try {
    const { id: taskId } = req.params;
    console.log('tASKId', taskId);
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: "no taks with id" });
    }
    res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: err });
  }
};
module.exports = {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
