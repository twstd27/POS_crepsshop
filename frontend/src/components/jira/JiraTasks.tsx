import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import type { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./singleTask";
import { useTaskStore } from "../../stores";
import cn from "classnames";
import { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Nombre",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar un nombre";
        }
      },
    });

    if (!isConfirmed) return;

    addTask(value, status);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "!text-black border-2 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-gray-200 border-dashed": isDragging,
          "border-green-500 border-dashed": isDragging && onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button className="btn-primary" onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.map((task) => (
          <SingleTask task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
