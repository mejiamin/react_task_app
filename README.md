### Технологии

- React
- Vite
- CSS Modules

---

### Всего в нашем плане 7 уроков:

- Урок 1: Создание задач
- Урок 2: Отображение списка задач
- **Урок 3: Редактирование задач**
- Урок 4: Сохранение и отмена изменений при редактировании
- Урок 5: Удаление задач при редактировании
- Урок 6: Сортировка задач через выпадающее меню
- Урок 7: Переключение между светлой и тёмной темой

---

## Урок 3: Редактирование задач (Режим изменения)

В этом уроке мы сделаем так, чтобы задачу можно было изменить. Для этого нам нужно научить компонент `TaskItem` переключаться между двумя состояниями:

1. **Режим просмотра** (обычный текст и кнопка «Редактировать»).
2. **Режим редактирования** (инпут с текущим текстом задачи и кнопка «Сохранить»).

Всю логику самого переключения (интерфейсную часть) мы сделаем прямо сейчас внутри `TaskItem`.

---

### Шаг 1: Обновляем `TaskItem.jsx`

Мы добавим локальное состояние `isEditing`, которое будет отвечать за то, что именно видит пользователь в данный момент. Также добавим состояние `editValue` для контроля текста внутри нового инпута.

Замени код в `src/components/TaskItem/TaskItem.jsx` на следующий:

```jsx
import { useState } from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task }) {
  // Переключатель режима редактирования
  const [isEditing, setIsEditing] = useState(false);
  // Состояние для текста внутри инпута редактирования
  const [editValue, setEditValue] = useState(task.title);

  // Включение режима редактирования
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Временная заглушка для сохранения (полноценно настроим в Уроке 4)
  const handleSave = () => {
    if (!editValue.trim()) return;
    // Пока просто выходим из режима редактирования
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        // Элементы, которые видны в режиме РЕДАКТИРОВАНИЯ
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
        </div>
      ) : (
        // Элементы, которые видны в обычном режиме ПРОСМОТРА
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

### Шаг 2: Добавляем стили для кнопок и инпута

Теперь нужно сделать так, чтобы новые кнопки и инпут выглядели аккуратно и не ломали верстку карточки.

Допиши в файл `src/components/TaskItem/TaskItem.module.css` следующие стили:

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
  flex: 1;
  margin-right: 10px;
}

.editContainer {
  display: flex;
  gap: 10px;
  width: 100%;
}

.input {
  flex: 1;
  padding: 6px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.input:focus {
  border-color: #007bff;
}

/* Общие стили для кнопок внутри карточки */
.editButton, .saveButton {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.editButton {
  background-color: #e2e8f0;
  color: #4a5568;
}

.editButton:hover {
  background-color: #cbd5e1;
}

.saveButton {
  background-color: #28a745;
  color: #fff;
}

.saveButton:hover {
  background-color: #218838;
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

### 🎯 Домашнее задание к Уроку 3:

1. Добавь задачу через форму.
2. Нажми на кнопку **«Редактировать»**. Карточка должна плавно поменять текст на текстовое поле ввода, в котором уже будет написан текущий текст задачи, а кнопка сменится на зелёную **«Сохранить»**.
3. Попробуй изменить текст в инпуте и нажать «Сохранить». В интерфейсе режим закроется, но *сам текст задачи вернется к старому* (потому что мы еще не связали это с главным массивом в `App.jsx`).

Это абсолютно нормально для текущего шага! Мы подготовили интерфейс.

**Как проверишь, что переключение режимов работает стабильно, и в Уроке 4 мы свяжем это с глобальным стейтом, а также добавим отмену изменений!**
