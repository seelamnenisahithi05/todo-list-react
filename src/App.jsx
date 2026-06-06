import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text: input } : task
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setInput(task.text);
    setEditId(task.id);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h1>Todo List</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={handleSubmit}>
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />

                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;