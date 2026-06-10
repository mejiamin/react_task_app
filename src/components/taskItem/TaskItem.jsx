import styles from './taskItem.module.css'

export const TaskItem = () => {
  return (
    <div className={styles.item}>
      <span className={styles.text}>task.title</span>

      {/* Сюда в будущих уроках мы добавим кнопки для удаления и редактирования */}

    </div>
  )
}
