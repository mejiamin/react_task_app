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
- Урок 6: Сортировка задач через выпадающее меню
- **Урок 7: Переключение между светлой и тёмной темой**

---

## Урок 7: Переключение между светлой и тёмной темой

Чтобы реализовать эту фичу правильно, мы не будем прокидывать классы «тёмной темы» в каждый отдельный компонент вручную. Вместо этого мы используем силу **CSS-переменных (Custom Properties)** на уровне корневого контейнера и обычный стейт в React.

### Шаг 1: Подготовка CSS-переменных в `App.module.css`

Мы определим два глобальных набора цветов: для светлой темы (по умолчанию) и для тёмной темы (внутри специального класса `.dark`).

Открой `src/App.module.css` и полностью перепиши его содержимое:

```css
/* Светлая тема (значения по умолчанию) */
.container {
  --bg-app: #f9f9f9;
  --bg-card: #ffffff;
  --text-main: #333333;
  --text-muted: #666666;
  --border-color: #eee;
  --input-border: #ccc;

  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
  
  /* Применяем переменные */
  background-color: var(--bg-app);
  color: var(--text-main);
}

/* Тёмная тема (перезаписываем переменные) */
.dark {
  --bg-app: #1e1e24;
  --bg-card: #2a2a32;
  --text-main: #f5f5f5;
  --text-muted: #aaaaaa;
  --border-color: #3a3a45;
  --input-border: #444452;
}

/* Стили заголовка и счетчика теперь зависят от переменных */
.title {
  text-align: center;
  color: var(--text-main);
  margin-bottom: 30px;
}

.counter {
  font-size: 14px;
  color: var(--text-muted);
  text-align: right;
  margin-top: 15px;
}

.sortWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: var(--text-muted);
}

.select {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  background-color: var(--bg-card);
  color: var(--text-main);
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

/* Стили для верхней панели с кнопкой темы */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.themeButton {
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid var(--input-border);
  border-radius: 20px;
  background-color: var(--bg-card);
  color: var(--text-main);
  transition: all 0.2s ease;
}

.themeButton:hover {
  filter: brightness(0.9);
}
```

---

### Шаг 2: Внедряем стейт темы в `App.jsx`

Теперь нам нужно завести булев стейт `isDarkMode`. Если он равен `true`, мы будем динамически добавлять класс `.dark` к нашему контейнеру. Для объединения классов воспользуемся обычной шаблонной строкой.

Обнови код в `src/App.jsx`:

```jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import styles from './App.module.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filterType, setFilterType] = useState('default');
  // Новое состояние для темы
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    if (filterType === 'newest') {
      return tasksCopy.sort((a, b) => b.id - a.id);
    }
    if (filterType === 'alphabetical') {
      return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
    }

    return tasksCopy;
  };

  // Динамически формируем имя класса контейнера
  const containerClass = isDarkMode 
    ? `${styles.container} ${styles.dark}` 
    : styles.container;

  return (
    <div className={containerClass}>
      <header className={styles.header}>
        <h1 className={styles.title}>Менеджер задач</h1>
        {/* Кнопка переключения темы */}
        <button 
          className={styles.themeButton} 
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '☀️ Светлая' : '🌙 Тёмная'}
        </button>
      </header>

      <TaskForm onAddTask={addTask} />
      
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
```

---

### Шаг 3: Переводим карточки задач на CSS-переменные

Чтобы карточки внутри списка тоже меняли цвет при смене темы, откроем файл `src/components/TaskItem/TaskItem.module.css` и заменим фиксированные цвета (`#fff`, `#333`, `#eee`) на наши переменные, которые автоматически наследуются от главного контейнера.

Обнови верхнюю часть файла `src/components/TaskItem/TaskItem.module.css`:

```css
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  /* Заменяем на CSS-переменные родителя */
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.text {
  font-size: 16px;
  /* Цвет текста тоже берем из переменной */
  color: var(--text-main);
  flex: 1;
  margin-right: 10px;
}

/* Оставшиеся стили (кнопки, инпуты) можно не менять, они уже настроены */
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

### 🎯 Домашнее задание к Уроку 7:

1. Зайди в приложение. В правом верхнем углу должна появиться аккуратная кнопка **«🌙 Тёмная»**.
2. Нажми на неё. Контейнер приложения и карточки задач должны плавно сменить цвет на тёмные оттенки, а текст — стать белым. Кнопка при этом изменит надпись на **«☀️ Светлая»**.
3. Попробуй добавлять, сортировать и удалять задачи в тёмном режиме — всё должно выглядеть гармонично и читаемо.
