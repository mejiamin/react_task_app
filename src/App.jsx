import { TaskForm, TaskList } from "@/components";
import styles from './app.module.css';
import { useState } from "react";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  // Состояние для хранения выбранного типа сортировки
  

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
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
  };

  // ФУНКЦИЯ СОРТИРОВКИ (вычисляется при каждом рендере)


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>
      <TaskForm onAddTask={addTask} />

      {/* Выпадающий список для выбора сортировки */}
      <div className={styles.sortWrapper}>
        <label htmlFor="sort-select" className={styles.label}>Сортировка: </label>
        <select
          id="sort-select"
          className={styles.select}
        >
          <option>По порядку добавления</option>
          <option>Сначала новые</option>
          <option>По алфавиту (А-Я)</option>
        </select>
      </div>

      {/* Передаем ОРТСОЛТИРОВАННЫЙ массив вместо исходного */}
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />

      <p className={styles.counter}>Всего задач: {tasks.length}</p>
    </div>
  );
}
