import { StateCreator, create } from 'zustand';
import type { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (id: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  getNumberOfTasks: () => number;
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': {id: 'ABC-1', title: 'Task 1', status: 'open'},
    'ABC-2': {id: 'ABC-2', title: 'Task 2', status: 'in-progress'},
    'ABC-3': {id: 'ABC-3', title: 'Task 3', status: 'open'},
    'ABC-4': {id: 'ABC-4', title: 'Task 4', status: 'open'},
  },
  getTaskByStatus( status: TaskStatus ) {
    return Object.values(get().tasks).filter(task => task.status === status);
  },
  addTask(title: string, status: TaskStatus) {
    const newTask = { id: uuidv4(), title, status };

    set( state => {
      state.tasks[newTask.id] = newTask;
    })
  },
  setDraggingTaskId(taskId: string) {
    set({draggingTaskId: taskId});
  },
  removeDraggingTaskId() {
    set({draggingTaskId: undefined});
  },
  changeTaskStatus(taskId: string, status: TaskStatus) {
    set( state => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status
      };
    })
  },
  onTaskDrop(status: TaskStatus) {
    const taskId = get().draggingTaskId;
    if(!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
  getNumberOfTasks() {
    return Object.keys(get().tasks).length;
  }
})

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer(
        storeApi
      ),
      {
        name: 'task-store',
        // storage: customSessionStorage
        // storage: firebaseStorage
      }
    )
  )
);