import React from "react";
import useList from "../hooks/useList";
import "../page/Home.css";

function Home() {
  const { list, task, setTask, addTask, deleteTask, updateTask } = useList();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="inputAndSubmit">
          <input
            type="text"
            placeholder="Add Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button>Submit</button>
        </div>
      </form>
      <div>
        {list.map((l) => (
          <div key={l.id} className="taskList">
            <h3>{l.task}</h3>
            <div className="actions">
              <button onClick={() => updateTask(l.id)}>Edit</button>
              <button onClick={() => deleteTask(l.id)}>Delete </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
