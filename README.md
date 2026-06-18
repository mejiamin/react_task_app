### Технологии

- React
- Vite
- CSS Modules

---

### Всего в нашем плане 7 уроков:

- Урок 1: Создание задач
- Урок 2: Отображение списка задач
- Урок 3: Редактирование задач
- **Урок 4: Сохранение и отмена изменений при редактировании**
- Урок 5: Удаление задач при редактировании
- Урок 6: Сортировка задач через выпадающее меню
- Урок 7: Переключение между светлой и тёмной темой

---

## Урок 4: Сохранение и отмена изменений при редактировании

В этом уроке мы научимся передавать данные обратно «снизу вверх» (от дочернего компонента к родительскому) и добавим очень важную для пользователя фичу — кнопку **«Отмена»**, если он передумал редактировать.

### Шаг 1: Добавляем функцию обновления в `App.jsx`

Нам нужно создать функцию `updateTask`, которая будет принимать `id` измененной задачи и её `newTitle`, находить её в массиве и обновлять.

Обнови файл `src/App.jsx`, добавив функцию и передав её в `TaskList`:

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

  // Новая функция для обновления текста задачи
  const updateTask = (id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>
      <TaskForm onAddTask={addTask} />
      
      {/* Передаем функцию обновления дальше в список */}
      <TaskList tasks={tasks} onUpdateTask={updateTask} />
      
      <p className={styles.counter}>Всего задач: {tasks.length}</p>
    </div>
  );
}
```

---

### Шаг 2: Пробрасываем функцию через `TaskList.jsx`

Компонент `TaskList` сам по себе не редактирует задачи, он просто мост (транзит) между `App` и `TaskItem`. Примем пропс `onUpdateTask` и спустим его в каждый `TaskItem`.

Обнови `src/components/TaskList/TaskList.jsx`:

```jsx
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasks, onUpdateTask }) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Список задач пуст. Добавьте что-нибудь!</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onUpdateTask={onUpdateTask} // Передаем в каждый элемент списка
        />
      ))}
    </ul>
  );
}
```

---

### Шаг 3: Реализуем Сохранение и Отмену в `TaskItem.jsx`

Теперь связываем всё воедино.

* При **Сохранении** мы будем вызывать `onUpdateTask(task.id, editValue)`.
* При **Отмене** мы должны вернуть текст инпута к первоначальному (`task.title`) и закрыть режим редактирования, чтобы изменения не применились.

Замени код в `src/components/TaskItem/TaskItem.jsx`:

```jsx
import { useState } from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editValue.trim()) return;
    
    // Вызываем функцию из родительского компонента
    onUpdateTask(task.id, editValue);
    setIsEditing(false);
  };

  // Функция отмены изменений
  const handleCancel = () => {
    // Сбрасываем инпут на исходный текст задачи
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
          <button className={styles.editButton} onClick={handleEdit}>
            Редактировать
          </button>
        </>
      )}
    </li>
  );
}
```

---

### Шаг 4: Стили для кнопки Отмена

Добавим стили для серой кнопки «Отмена» в `src/components/TaskItem/TaskItem.module.css`:

```css
/* Добавь к существующим стилям кнопок */
.cancelButton {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #6c757d;
  color: #fff;
  transition: background-color 0.2s;
}

.cancelButton:hover {
  background-color: #5a6268;
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

### 🎯 Домашнее задание к Уроку 4:

1. Создай задачу (например, *"Купить молоко"*).
2. Нажми «Редактировать», измени текст на *"Купить молоко и хлеб"*, нажми «Сохранить». Убедись, что текст на экране обновился и остался измененным.
3. Снова нажми «Редактировать», сотри всё или напиши случайный текст, но нажми **«Отмена»**. Поле должно закрыться, а задача — вернуть свой прежний вид (*"Купить молоко и хлеб"*).

**Перейти к Уроку 5: Удаление задач!**
