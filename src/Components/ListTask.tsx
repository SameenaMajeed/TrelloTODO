import React, { useEffect, useState } from "react";
import type { Task } from "../App";
import Section from "./Section";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ListTask: React.FC<Props> = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [closed, setClosed] = useState<Task[]>([]);

  useEffect(() => {
    setTodos(tasks.filter((task) => task && task.status === "todo"));
    setInProgress(tasks.filter((task) => task && task.status === "inprogress"));
    setClosed(tasks.filter((task) => task && task.status === "closed"));
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"] as const;

  const statusMap: Record<(typeof statuses)[number], Task[]> = {
    todo: todos,
    inprogress: inProgress,
    closed: closed,
  };

  return (
    <div className="flex justify-center gap-6 px-6 py-8 w-full h-[80vh] overflow-x-auto">
      {statuses.map((status) => (
        <Section
          key={status}
          status={status}
          tasks={statusMap[status]}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};

export default ListTask;
