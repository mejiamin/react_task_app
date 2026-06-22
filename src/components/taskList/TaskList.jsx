import { TaskItem } from '@/components'
import styles from './taskList.module.css'

export const TaskList = ({ tasks, onUpdateTask }) => {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Список задач пуст. Добавьте что-нибудь!</p>
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  )
}
