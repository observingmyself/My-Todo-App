const todoModel = require("../models/todoModel");
 
 const todoCreateHandler = async (req, res) => {
  const { title, description } = req.body;
  await todoModel
    .create({
      title,
      description,
      completed: false,
    })
    .then(() =>
      res.send({
        message: "Task Added",
      })
    )
    .catch((err) => console.log(err));
};

const allTodos = async (req,res) => {
  try{
    const todos = await todoModel.find()
   if(todos){
     res.status(200).json({
       message: "All tasks fetched",
       todos: todos,
     });
   }
   else{
    res.status(404).json({
      message: "No tasks found",
    })
   }
  }catch(err){
    console.log(error)
  }
}

const deleteTodo = async (req,res ) => {
  try{
    const {id} = req.params;
    const todo = await todoModel.findByIdAndDelete(id)
    if(todo){
      res.status(200).json({
        message: "Task Completed successfully",
        todo: todo,
      })
    }
    else{
      res.status(404).json({
        message: "Task not found",
      })
    }
  }catch(error){
    console.log(error)
  }
}

module.exports = {
    todoCreateHandler,
    allTodos,
    deleteTodo
}