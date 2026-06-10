import {
  TaskForm,
} from "@/components";
import styles from './app.module.css';
import { useState } from "react";

export const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      isCompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  console.log('Текущие задачи:', tasks);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>

      <TaskForm onAddTask={addTask} />

      {/* Передаем наш стейт с задачами в компонент списка */}
      

      <p className={styles.counter}>
        Всего задач создано: {tasks.length}
      </p>
    </div>
  );
}
