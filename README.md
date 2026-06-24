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
- Урок 5: Удаление задач при редактировании
- **Урок 6: Сортировка задач через выпадающее меню**
- Урок 7: Переключение между светлой и тёмной темой

---

## Урок 6: Сортировка задач через выпадающее меню

В этом уроке мы добавим возможность сортировать задачи. Мы сделаем выпадающий список (`<select>`), который позволит пользователю выбирать один из двух режимов:

1. **По порядку (сначала старые)** — как они были добавлены.
2. **По алфавиту (А–Я)** — сортировка строк от А до Я.

### Важная концепция: Производное состояние (Computed State)

Вместо того чтобы при сортировке физически перезаписывать и менять сам массив `tasks` в стейте, мы применим более правильный и чистый подход в React. Мы будем хранить в стейте только **критерий сортировки** (строку `'default'` или `'alphabetical'`), а сам отсортированный массив будем вычислять «на лету» прямо во время рендеринга. Таким образом, исходные данные никогда не испортятся и не перепутаются.

---

### Шаг 1: Добавляем стейт для типа сортировки в `App.jsx`

Нам нужно:

1. Создать состояние `sortBy`.
2. Написать логику, которая перед передачей массива в `TaskList` будет делать его копию и сортировать её в зависимости от значения `sortBy`.

Обнови файл `src/App.jsx`:

```jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import styles from './App.module.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  // Стейт для хранения текущего режима сортировки
  const [sortBy, setSortBy] = useState('default');

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

  // Вычисляемое (производное) состояние сортировки
  const getSortedTasks = () => {
    // Делаем копию массива через спред-оператор, 
    // так как .sort() мутирует массив
    const tasksCopy = [...tasks];

    if (sortBy === 'alphabetical') {
      // Сортировка по алфавиту без учета регистра букв
      return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Если 'default', возвращаем массив 
    // в обычном порядке (по ID/времени создания)
    return tasksCopy;
  };

  const sortedTasks = getSortedTasks();

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
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">По порядку добавления</option>
          <option value="alphabetical">По алфавиту (А–Я)</option>
        </select>
      </div>
      
      {/* Передаем уже отсортированный массив вместо исходного tasks */}
      <TaskList 
        tasks={sortedTasks} 
        onUpdateTask={updateTask} 
        onDeleteTask={deleteTask} 
      />
      
      <p className={styles.counter}>Всего задач: {tasks.length}</p>
    </div>
  );
}
```

---

### Шаг 2: Добавляем стили для выпадающего списка

Чтобы селект встал красиво между формой и списком задач, добавим немного CSS.

Допиши в конец файла `src/App.module.css` следующие стили:

```css
.controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 15px;
  font-dash-size: 14px;
}

.label {
  color: #555;
  margin-right: 8px;
}

.select {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
}

.select:focus {
  border-color: #007bff;
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

### 🎯 Домашнее задание к Уроку 6:

1. Добавь три задачи вразнобой, например: *"Яблоки"*, *"Бананы"*, *"Груши"*. Они должны отобразиться именно в таком порядке.
2. Переключи выпадающий список в положение **«По алфавиту (А–Я)»**. Список должен мгновенно перестроиться: *"Бананы"*, *"Груши"*, *"Яблоки"*.
3. Попробуй добавить новую задачу (например, *"Арбуз"*), находясь в режиме алфавитной сортировки. Она должна автоматически встать на первое место в списке.
4. Переключи обратно на **«По порядку добавления»** — первоначальный порядок должен восстановиться.

**Мы перейдем к финальному Уроку 7: сделаем переключение светлой и тёмной темы!**
