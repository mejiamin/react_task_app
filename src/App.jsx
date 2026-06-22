import { TaskForm, TaskList } from "@/components";
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

  const updateTask = (id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  // Новая функция для удаления задачи по её id
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>

      <TaskForm onAddTask={addTask} />

      {/* Пробрасываем onDeleteTask дальше */}
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
      />

      <p className={styles.counter}>
        Всего задач создано: {tasks.length}
      </p>
    </div>
  );
}
