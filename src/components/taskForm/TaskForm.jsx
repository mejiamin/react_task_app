import styles from './taskForm.module.css'

export const TaskForm = () => {
  return (
    <form className={styles.form}>
      <input
        type="text"
        className={styles.input}
        placeholder='Что нужно сделать?'
      />
      <button type='submit' className={styles.button}>
        Добавить
      </button>
    </form>
  )
}
