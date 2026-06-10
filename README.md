## Урок 2: Отображение списка задач

В этом уроке мы научим приложение рендерить динамические списки с помощью метода `map()` и разберем, зачем React так сильно нужны `key`. Нам понадобятся два компонента: `TaskList` (контейнер для списка) и `TaskItem` (карточка отдельной задачи).

### Шаг 1: Создаем карточку задачи (`TaskItem`)

Этот компонент отвечает за внешний вид одной конкретной задачи.

В файл `src/components/TaskItem/TaskItem.jsx` добавь код:

```jsx
import styles from './TaskItem.module.css';

export default function TaskItem({ task }) {
  return (
    <li className={styles.item}>
      <span className={styles.text}>{task.title}</span>
      {/* Сюда в будущих уроках мы добавим кнопки для удаления и редактирования */}
    </li>
  );
}

```

И стили для него в `src/components/TaskItem/TaskItem.module.css`:

```css
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.text {
  font-size: 16px;
  color: #333;
}

```

---

### Шаг 2: Создаем список задач (`TaskList`)

Здесь мы берем массив `tasks` из пропсов и превращаем его в массив JSX-элементов. Если задач нет, мы покажем красивую заглушку, чтобы интерфейс не выглядел пустым.

> ⚠️ **Важно:** Когда мы перебираем массив в React через `.map()`, у самого верхнего тега внутри цикла **обязательно должен быть пропс `key**` с уникальным значением (в нашем случае `task.id`). Это нужно React, чтобы быстро понимать, какой именно элемент изменился, удалился или добавился, не перерисовывая весь список целиком.

В файл `src/components/TaskList/TaskList.jsx`:

```jsx
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasks }) {
  // Если список пуст, возвращаем дружелюбный текст
  if (tasks.length === 0) {
    return <p className={styles.empty}>Список задач пуст. Добавьте что-нибудь!</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

```

И стили для списка в `src/components/TaskList/TaskList.module.css`:

```css
.list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.empty {
  text-align: center;
  color: #888;
  font-style: italic;
  margin: 30px 0;
}

```

---

### Шаг 3: Подключаем список в `App.jsx`

Теперь возвращаемся в главный файл, импортируем `TaskList` и заменяем им временный счетчик или ставим сразу после формы.

Обнови свой `src/App.jsx` следующим образом:

```jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList'; // Импортируем список
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>
      <TaskForm onAddTask={addTask} />
      
      {/* Передаем наш стейт с задачами в компонент списка */}
      <TaskList tasks={tasks} />
      
      <p className={styles.counter}>Всего задач: {tasks.length}</p>
    </div>
  );
}

```

---

### 🎯 Домашнее задание к Уроку 2:

1. Посмотри в браузер — изначально ты должен увидеть надпись *"Список задач пуст. Добавьте что-нибудь!"*.
2. Вбей задачу в форму и нажми Enter. Она должна мгновенно появиться на экране в виде стильной карточки.
3. Добавь 3-4 задачи подряд, чтобы проверить, как они выстраиваются в аккуратный список.
4. Открой консоль браузера (F12 -> Console) и убедись, что там нет красных ошибок вроде *"Each child in a list should have a unique 'key' prop"*.

**Мы перейдем к Уроку 3: Редактирование задач (включим режим редактирования)!**