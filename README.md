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

В этом уроке мы добавим возможность сортировать задачи. Мы сделаем выпадающий список (`<select>`), который позволит пользователю выбирать один из трех режимов:

1. **По порядку добавления** (сначала старые).
2. **От новых к старым** (сначала свежие).
3. **По алфавиту** (А–Я).

При этом важно помнить **правило React**: мы не должны навсегда перезаписывать исходный массив `tasks` в стейте при сортировке. Вместо этого мы будем вычислять отсортированный массив «на лету» прямо во время рендеринга.

---

### Шаг 1: Создаем состояние для типа сортировки в `App.jsx`

Нам понадобится новый стейт `filterType`, который будет хранить строку-идентификатор выбранного режима.

Открой `src/App.jsx` и добавь новое состояние, а также логику сортировки перед тем, как передать массив в компонент списка:

```jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import styles from './App.module.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  // Состояние для хранения выбранного типа сортировки
  const [filterType, setFilterType] = useState('default');

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
  const getSortedTasks = () => {
    // Создаем копию массива, чтобы не мутировать исходный стейт tasks
    const tasksCopy = [...tasks];

    if (filterType === 'newest') {
      // Сначала новые: сравниваем id 
      // (так как id — это timestamp времени создания)
      return tasksCopy.sort((a, b) => b.id - a.id);
    }

    // 'default' — по порядку добавления (от старых к новым)
    return tasksCopy;
  };

  const sortedTasks = getSortedTasks();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>
      <TaskForm onAddTask={addTask} />
      
      {/* Выпадающий список для выбора сортировки */}
      <div className={styles.sortWrapper}>
        <label htmlFor="sort-select" className={styles.label}>
          Сортировка: </label>
        <select
          id="sort-select"
          className={styles.select}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="default">По порядку добавления</option>
          <option value="newest">Сначала новые</option>
        </select>
      </div>

      {/* Передаем ОРТСОЛТИРОВАННЫЙ массив вместо исходного */}
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

### Шаг 2: Стилизуем блок сортировки

Чтобы выпадающий список смотрелся гармонично между формой ввода и самим списком задач, добавим немного CSS.

Допиши в файл `src/App.module.css` следующие стили:

```css
.sortWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: #555;
}

.select {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
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

1. Добавь 3 разные задачи вразброс, например:
* *Борщ*
* *Яблоки*
* *Арбуз*


2. По умолчанию они должны отображаться так, как ты их вводил.
3. Переключи выпадающий список на **«По алфавиту (А-Я)»**. Убедись, что задачи мгновенно перестроились: *Арбуз, Борщ, Яблоки*.
4. Переключи на **«Сначала новые»**. Теперь последняя добавленная задача (*Арбуз*) должна оказаться на самом верху списка.
5. Попробуй удалить или отредактировать задачу, пока включен любой из режимов фильтрации — всё должно работать стабильно.

**Мы перейдем к финальному Уроку 7: добавим переключение темной и светлой темы через CSS-переменные!**
