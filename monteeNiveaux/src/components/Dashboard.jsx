import React, { useEffect, useState } from "react";
import "./App.css";

const Dashboard = ({ token, userId }) => {
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchUser(userId);
    fetchTasks();
  }, [userId]);

  const fetchUser = async (id) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();
    setUserXP(user.xp);
    setUserLevel(user.level);
  };

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const tasks = await response.json();
    setTasks(tasks);
  };

  const completeTask = async (id, xp) => {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/xp`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ xp }),
      }
    );
    const user = await response.json();
    setUserXP(user.xp);
    setUserLevel(user.level);
  };

  return (
    <div className="container">
      <div className="profile">
        <Typography className="profile-header">Profil</Typography>
        <Typography className="profile-info">Niveau : {userLevel}</Typography>
        <Typography className="profile-info">
          Expérience : {userXP}/100
        </Typography>
      </div>
      <div className="tasks">
        <Typography className="header">Tâches Disponibles</Typography>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>
                {task.title} - {task.xp} XP
              </span>
              <button
                className="complete-btn"
                onClick={() => completeTask(task.id, task.xp)}
              >
                Compléter
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
