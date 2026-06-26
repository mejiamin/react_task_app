import { TaskForm, TaskList } from "@/components";
import styles from './app.module.css';
import { useState } from "react";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterType, setFilterType] = useState('default');
  // Новое состояние для темы
  

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

  const getSortedTasks = () => {
    const tasksCopy = [...tasks];
    if (filterType === 'newest') return tasksCopy.sort((a, b) => b.id - a.id);
    if (filterType === 'alphabetical') return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
    return tasksCopy;
  };

  // Динамически формируем имя класса контейнера
  

  return (
    <div className={containerClass}>
      <header className={styles.header}>
        <h1 className={styles.title}>Менеджер задач</h1>

        {/* Кнопка переключения темы */}
        <button
          className={styles.themeButton}
        >
          {true ? '☀️ Светлая' : '🌙 Тёмная'}
        </button>
      </header>

      <TaskForm onAddTask={addTask} />

      <div className={styles.sortWrapper}>
        <label htmlFor="sort-select" className={styles.label}>Сортировка: </label>
        <select
          id="sort-select"
          className={styles.select}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="default">По порядку добавления</option>
          <option value="newest">Сначала новые</option>
          <option value="alphabetical">По алфавиту (А-Я)</option>
        </select>
      </div>

      <TaskList
        tasks={getSortedTasks()}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />

      <p className={styles.counter}>Всего задач: {tasks.length}</p>
    </div>
  );
}
