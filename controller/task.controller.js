const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const {task, status} = req.body;
        const {userId} = req;
        const newTask = new Task( {task, status, author: userId});

        await newTask.save();

        res.status(200).json({status: "ok", data: newTask});

    }catch(err) {
        res.status(400).json({status: "fail", error: err});
    }
    
}

taskController.getTask = async (req, res) => {
    try{
        // author 필드를 참조하는 모든 데이터를 가져옴 (Join처럼 사용)
        const taskList = await Task.find({}).populate("author");

        res.status(200).json({status: "ok", data: taskList});
    }catch(err){
        res.status(400).json({status: "fail", error: err});
    }
}

taskController.putTask = async (req, res) => {
    try{
        const id = req.params.id;
        const {status} = req.body;

        const updateStatus = status ? false : true;
        
        const updateData = await Task.updateOne({_id:id}, {
            status: updateStatus
        });

        res.status(200).json({status: "ok", data: updateData});
    }catch(err){
        res.status(400).json({status: "fail", error: err});
    }
}

taskController.deleteTask = async (req, res) => {
    try{
        const id = req.params.id;

        const deleteData = await Task.findByIdAndDelete(id);
        
        res.status(200).json({status: "ok", data: deleteData});
    }catch(err){
        res.status(400).json({status: "fail", error: err});
    }
}

module.exports = taskController;