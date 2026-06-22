import { useState } from 'react'
import styles from './taskItem.module.css'

export const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!editValue.trim()) return

    onUpdateTask(task.id, editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(task.title)
    setIsEditing(false)
  }

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            className={styles.input}
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
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
          <div className={styles.buttonsContainer}>
            <button className={styles.editButton} onClick={handleEdit}>
              Редактировать
            </button>
            <button className={styles.deleteButton} onClick={() => onDeleteTask(task.id)}>
              Удалить
            </button>
          </div>
        </>
      )}
    </li>
  )
}
