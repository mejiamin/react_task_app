### Технологии

- React
- Vite
- CSS Modules

---

### Всего в нашем плане 7 уроков:

- Урок 1: Создание задач
- Урок 2: Отображение списка задач
- Урок 3: Редактирование задач
- Урок 4: Сохранение и отмена изменений при редактировании
- **Урок 5: Удаление задач при редактировании**
- Урок 6: Сортировка задач через выпадающее меню
- Урок 7: Переключение между светлой и тёмной темой

---

## Урок 5: Удаление задач

По традиции React, так как массив всех задач (`tasks`) хранится в самом верху — в файле `App.jsx`, функция удаления тоже должна родиться там, а затем спуститься через `TaskList` в каждую карточку `TaskItem`.

Для удаления мы будем использовать метод массивов `.filter()`. Он идеально подходит, так как возвращает новый массив, исключая из него элемент с нужным нам `id` (помни про иммутабельность стейта!).

---

### Шаг 1: Создаем функцию удаления в `App.jsx`

Открой файл `src/App.jsx` и добавь функцию `deleteTask`, а также передай её вниз в компонент `TaskList`.

```jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import styles from './App.module.css';

export default function App() {
  const [tasks, setTasks] = useState([]);

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

  // Новая функция для удаления задачи по её id
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>
      <TaskForm onAddTask={addTask} />
      
      {/* Пробрасываем onDeleteTask дальше */}
      <TaskList 
        tasks={tasks} 
        onUpdateTask={updateTask} 
        onDeleteTask={deleteTask} 
      />
      
      <p className={styles.counter}>Всего задач: {tasks.length}</p>
    </div>
  );
}
```

---

### Шаг 2: Транзит через `TaskList.jsx`

Принимаем пропс `onDeleteTask` в списке и отдаем его каждому элементу.

Обнови `src/components/TaskList/TaskList.jsx`:

```jsx
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Список задач пуст. Добавьте что-нибудь!</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask} // Передаем в карточку
        />
      ))}
    </ul>
  );
}
```

---

### Шаг 3: Добавляем кнопку удаления в `TaskItem.jsx`

Мы разместим кнопку «Удалить» в режиме обычного просмотра, рядом с кнопкой «Редактировать». При нажатии на неё будет срабатывать `onDeleteTask(task.id)`.

Обнови блок обычного просмотра (после двоеточия в тернарном операторе) в `src/components/TaskItem/TaskItem.jsx`:

```jsx
import { useState } from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editValue.trim()) return;
    onUpdateTask(task.id, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            className={styles.input}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Отмена
          </button>
        </div>
      ) : (
        <>
          <span className={styles.text}>{task.title}</span>
          {/* Контейнер для кнопок, чтобы они аккуратно стояли вместе */}
          <div className={styles.buttonsContainer}>
            <button className={styles.editButton} onClick={handleEdit}>
              Редактировать
            </button>
            <button className={styles.deleteButton}
              onClick={() => onDeleteTask(task.id)}>
              Удалить
            </button>
          </div>
        </>
      )}
    </li>
  );
}
```

---

### Шаг 4: Стилизуем кнопку удаления

Сделаем кнопку «Удалить» классического красного (опасного) цвета. Добавь эти стили в `src/components/TaskItem/TaskItem.module.css`:

```css
.buttonsContainer {
  display: flex;
  gap: 8px;
}

.deleteButton {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
  transition: background-color 0.2s;
}

.deleteButton:hover {
  background-color: #bd2130;
}
```

---

### Домашнее задание

#### 1. Установи зависимости

```bash
npm i
```

---

#### 2. Запусти проект

```bash
npm run dev
```

---

### 🎯 Домашнее задание к Уроку 5:

1. Создай пару тест-задач.
2. Нажми кнопку **«Удалить»** у любой из них. Задача должна мгновенно и бесследно исчезнуть со страницы.
3. Обрати внимание, как меняется счетчик задач внизу экрана (`Всего задач: X`) — он должен автоматически уменьшаться, так как React сам пересчитывает длину обновленного массива `tasks.length`.

**Мы перейдем к Уроку 6: научимся сортировать задачи с помощью выпадающего списка (например, по алфавиту и по времени добавления)!**
