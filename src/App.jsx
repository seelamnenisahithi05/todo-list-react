import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      const updatedTasks = [...tasks];

      updatedTasks[editId].text = input;
      updatedTasks[editId].date = date;

      setTasks(updatedTasks);
      setEditId(null);
    } else {
      const newTask = {
        text: input,
        date: date,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    setInput("");
    setDate("");
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter(
      (_, i) => i !== index
    );

    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setDate(tasks[index].date);
    setEditId(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>📝 To-Do App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Task"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <button onClick={handleSubmit}>
          {editId !== null
            ? "Update Task"
            : "Add Task"}
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task-item" key={index}>
            <div>
              <h3
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {task.text}
              </h3>

              <small>
                {task.date || "No Date"}
              </small>
            </div>

            <div className="buttons">
              <button
                className="complete"
                onClick={() =>
                  toggleComplete(index)
                }
              >
                ✓
              </button>

              <button
                className="edit"
                onClick={() =>
                  handleEdit(index)
                }
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() =>
                  handleDelete(index)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;