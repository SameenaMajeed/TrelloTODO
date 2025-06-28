import React from "react";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import DraggableTask from "./DraggableTask";

interface Task {
  id: string | number;
  name: string;
  status: "todo" | "inprogress" | "closed";
}

interface Props {
  status: "todo" | "inprogress" | "closed";
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const getStatusStyles = (status: "todo" | "inprogress" | "closed") => {
  switch (status) {
    case "todo":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        badge: "bg-blue-500 text-blue-50",
        text: "text-blue-700",
      };
    case "inprogress":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        badge: "bg-yellow-500 text-yellow-50",
        text: "text-yellow-700",
      };
    case "closed":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        badge: "bg-green-500 text-green-50",
        text: "text-green-700",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        badge: "bg-gray-500 text-gray-50",
        text: "text-gray-700",
      };
  }
};

const Section: React.FC<Props> = ({ status, tasks, setTasks }) => {
  const styles = getStatusStyles(status);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string | number }) => {
      handleDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDrop = (taskId: string | number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    toast.success(`Task moved to ${status}`);
  };

  const handleDeleteTask = (taskId: string | number) => {
  setTasks((prevTasks) => {
    const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return updatedTasks;
  });
  toast.success("Task successfully deleted.");
};


  const handleEdit = (taskId: string | number, newName: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((t) =>
        t.id === taskId ? { ...t, name: newName } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`w-80 p-6 rounded-2xl border-2 ${styles.bg} ${styles.border} ${
        isOver ? "opacity-70" : ""
      } shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold capitalize ${styles.text}`}>
          {status.replace(/([A-Z])/g, " $1").trim()}
        </h2>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${styles.badge}`}
        >
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-6 italic">
            No tasks in this section
          </p>
        ) : (
          tasks.map((task) => (
            <DraggableTask
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.id)}
              onEdit={(newName) => handleEdit(task.id, newName)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Section;
