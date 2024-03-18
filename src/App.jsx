import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, settodos] = useState([]);

  const addTodo = (todo) => {
    settodos((oldtodos) => [{ id: Date.now(), ...todo }, ...oldtodos]);
  };

  const updateTodo = (id, todo) => {
    settodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  /*
  const updateTodo = (id, todo) => {
    settodos((prev) => {
      prev.map((prevTodo) => {
        if (prevTodo.id === id) todo;
        else prevTodo;
      });
    });
  };
  */

  const deleteTodo = (id) => {
    settodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    settodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id
          ? { ...prevtodo, completed: !prevtodo.completed }
          : prevtodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) settodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-3xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;