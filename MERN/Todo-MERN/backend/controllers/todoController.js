const asyncHandler = require("express-async-handler")
const Todo = require("../models/todoModel")

// @desc   Get Todo
// @route  GET /api/todo
// @access Public
const getTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.find({})
    res.status(200).json(todo);
})

// @desc   Set Todo
// @route  POST /api/todo
// @access Public
const setTodo = asyncHandler(async(req, res) => {
    if(!req.body.todo){
        res.status(400)
        throw new Error("Please add a Text Field Value")
    }
    const todo = await Todo.create({
        todo: req.body.todo,
    })
    res.status(200).json(todo);
})

// @desc   Update Todo
// @route  PUT /api/todo/:id
// @access Public
const updateTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        res.status(400);
        throw new Error("Todo Not Found")
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedTodo);
})

// @desc   Delete Todo
// @route  DELETE /api/todo/:id
// @access Public
const deleteTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    if(todo){
        const deletedTodo = await Todo.findOneAndDelete({
            _id: req.params.id
        })
        res.status(200).json({message: " Todo Deleted" ,deletedTodo});
    } else{
        res.status(404);
        throw new Error("Todo Not Found")
    }
})

module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo,
}