const express=require('express');
const { getAllTask, createTask,updateTask ,getTask,deleteTask} = require('../controller/task');
const router=express.Router();


router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router;