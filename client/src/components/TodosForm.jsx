import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const TodosForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/todo-form", {
        title,
        description,
      });
      if (data) {
        setTitle("");
        setDescription("");
        toast.success(data.data.message);
        getAllTodos();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const getAllTodos = async () => {
    try {
      const data = await axios.get("/api/get-todos");
      if (data) {
        setTodos(data.data.todos);
      } else {
        toast.error("Failed to get todos");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  const deleteTodoFrom = async (id) => {
    try {
      const data = await axios.delete(`/api/delete-todo/${id}`);
      if (data) {
        toast.success(data.data.message);
        getAllTodos();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold mt-4">TODO LIST</h1>
      <div className="flex w-screen justify-center items-start mt-6">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col md:flex-row gap-6"
        >
          <input
            type="text"
            className="px-2 py-3 bg-gray-400 w-64 text-white placeholder:text-gray-600 outline-none border-none"
            name="title"
            placeholder="enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            className="px-2 py-3 w-64 bg-gray-400 text-white placeholder:text-gray-600 outline-none border-none"
            name="description"
            placeholder="enter description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button className="px-2 py-3 bg-emerald-400 rounded">ADD TASK</button>
        </form>
      </div>
      <div className="mx-2 my-6 md:mx-40 md:my-20 rounded-2xl px-4 py-4  ">
        <h2 className="text-center text-3xl mb-5 font-semibold">All Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center bg-fuchsia-400 m-2 px-4 py-2 rounded"
            >
              <div>
                <h2 className="font-semibold">Title: {todo.title}</h2>
                <p className="font-light">Description: {todo.description}</p>
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-slate-500 rounded-lg"
                  onClick={() => deleteTodoFrom(todo._id)}
                >
                  <i class="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodosForm;
