const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;