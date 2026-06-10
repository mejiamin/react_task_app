import { useState } from 'react';
import styles from './taskForm.module.css';

export const TaskForm = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем, что строка не пустая
    if (!text.trim()) return;

    // Передаем задачу родителю
    onAddTask(text);

    // Очищаем поле ввода
    setText('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Что нужно сделать?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  );
}
