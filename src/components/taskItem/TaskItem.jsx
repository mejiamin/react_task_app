import styles from './taskItem.module.css'

export const TaskItem = ({ task }) => {


  return (
    <li className={styles.item}>
      {false ? (
        // Элементы, которые видны в режиме РЕДАКТИРОВАНИЯ
        <div className={styles.editContainer}>
          <input
            type="text"
            className={styles.input}
          />
          <button className={styles.saveButton}>
            Сохранить
          </button>
        </div>
      ) : (
        // Элементы, которые видны в обычном режиме ПРОСМОТРА
        <>
          <span className={styles.text}>{task.title}</span>
          <button className={styles.editButton}>
            Редактировать
          </button>
        </>
      )}
    </li>
  )
}
