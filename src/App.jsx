import {
  TaskForm,
} from "@/components"
import styles from './app.module.css'

export const App = () => {
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер задач</h1>
      <TaskForm />

      {/* Пока мы не вывели список, добавим счетчик для наглядности */}
      <p>Всего задач создано: task.length</p>
    </div>
  )
}
