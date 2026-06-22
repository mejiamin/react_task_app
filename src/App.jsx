import { TaskForm, TaskList } from "@/components";
import styles from './app.module.css';
import { useState } from "react";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  // Стейт для хранения текущего режима сортировки
  

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      isCompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // Вычисляемое (производное) состояние сортировки


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>

      <TaskForm onAddTask={addTask} />

      {/* Панель управления сортировкой */}
      <div className={styles.controls}>
        <label htmlFor="sort-select" className={styles.label}>
          Сортировка: </label>
        <select
          id="sort-select"
          className={styles.select}
        >
          <option>По порядку добавления</option>
          <option>По алфавиту (А–Я)</option>
        </select>
      </div>

      {/* Передаем уже отсортированный массив вместо исходного tasks */}
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />

      <p className={styles.counter}>Всего задач создано: {tasks.length}</p>
    </div>
  );
}
