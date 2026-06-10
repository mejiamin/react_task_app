## Технологии

- React
- Vite
- CSS Modules

---

## Всего в нашем плане 7 уроков:

- Урок 1: Создание задач
- Урок 2: Отображение списка задач
- Урок 3: Редактирование задач
- Урок 4: Сохранение и отмена изменений при редактировании
- Урок 5: Удаление задач при редактировании
- Урок 6: Сортировка задач через выпадающее меню
- Урок 7: Переключение между светлой и тёмной темой

---

# Урок 1: Создание задач и инициализация проекта

Отличный план! Проект **Task Manager (Менеджер задач)** — это идеальная классика для того, чтобы набить руку. Мы разберем всё пошагово, построим правильную архитектуру, настроим React + Vite и изолируем стили с помощью CSS Modules.

Начнем с самого фундамента.

---

### Что мы сделаем в этом уроке

* Настроим структуру проекта.
* Создадим компонент формы добавления задачи.
* Научимся работать с состоянием через `useState`.
* Реализуем создание новых задач.
* Подготовим базу для дальнейшего развития приложения.

---

## Шаг 1: Структура проекта

Предположим, что проект на Vite уже создан и запущен.

Чтобы код оставался чистым и масштабируемым, сразу разобьем приложение на отдельные компоненты.

Создай следующую структуру внутри папки `src`:

```plaintext
src/
├── components/
│   ├── TaskForm/
│   │   ├── TaskForm.jsx
│   │   └── TaskForm.module.css
│   ├── TaskList/
│   │   ├── TaskList.jsx
│   │   └── TaskList.module.css
│   └── TaskItem/
│       ├── TaskItem.jsx
│       └── TaskItem.module.css
├── App.jsx
├── App.module.css
└── main.jsx
```

---

## Шаг 2: Структура данных задачи

Каждая задача будет храниться в виде объекта:

```js
{
  id: 1712345678901,
  title: "Изучить React",
  isCompleted: false
}
```

Описание полей:

| Поле        | Тип     | Описание                 |
| ----------- | ------- | ------------------------ |
| id          | number  | Уникальный идентификатор |
| title       | string  | Текст задачи             |
| isCompleted | boolean | Статус выполнения        |

Для генерации ID будем использовать:

```js
Date.now()
```

---

## Шаг 3: Создаем форму добавления задач

### Файл: `src/components/TaskForm/TaskForm.jsx`

```jsx
import { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ onAddTask }) {
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
```

---

### Файл: `src/components/TaskForm/TaskForm.module.css`

```css
.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  flex: 1;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #007bff;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #0056b3;
}
```

---

## Шаг 4: Создаем главный компонент приложения

Теперь свяжем все части приложения.

### Файл: `src/App.jsx`

```jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import styles from './App.module.css';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      isCompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  console.log('Текущие задачи:', tasks);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>

      <TaskForm onAddTask={addTask} />

      <p className={styles.counter}>
        Всего задач создано: {tasks.length}
      </p>
    </div>
  );
}
```

---

### Файл: `src/App.module.css`

```css
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.counter {
  font-size: 14px;
  color: #666;
  text-align: right;
}
```

---

## Как это работает

1. Пользователь вводит текст задачи.
2. React сохраняет значение в состоянии `text`.
3. При отправке формы вызывается `handleSubmit`.
4. Если строка пустая — ничего не происходит.
5. Если строка заполнена — вызывается `onAddTask`.
6. В `App.jsx` создается новый объект задачи.
7. Массив `tasks` обновляется через `setTasks`.
8. Поле ввода очищается.

---

## Домашнее задание

### 1. Установи зависимости

```bash
npm i
```

---

### 2. Запусти проект

```bash
npm run dev
```

---

### 3. Открой DevTools

В браузере:

* F12
* вкладка **Console**

---

### 4. Проверь создание задач

Попробуй добавить несколько задач:

* Изучить React
* Сделать домашнее задание
* Прочитать документацию Vite

После каждого добавления в консоли должен появляться обновленный массив задач.

Пример:

```js
[
  {
    id: 1712345678901,
    title: "Изучить React",
    isCompleted: false
  }
]
```

---

### 5. Проверь очистку поля

После добавления задачи поле ввода должно автоматически очищаться.

---

### 6. Проверь защиту от пустого ввода

Попробуй:

* отправить пустую строку;
* ввести только пробелы.

Новая задача создаваться не должна.

---

## Итог урока

После завершения урока ты научишься:

* создавать React-компоненты;
* работать с `useState`;
* использовать контролируемые формы;
* передавать данные через props;
* обновлять массивы в состоянии без мутаций;
* подключать CSS Modules.

---

➡️ После выполнения домашнего задания можно переходить к **Уроку 2: Отображение списка задач на экране**.
