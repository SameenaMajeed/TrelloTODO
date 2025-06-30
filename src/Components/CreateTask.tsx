import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Task } from "../App"
import toast from "react-hot-toast"

interface Props {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const CreateTask: React.FC<Props> = ({ tasks, setTasks }) => {
  console.log(tasks)
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    status: "todo",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(task.name.length < 3) return toast.error('Task must have more than 3 characters')
    if(task.name.length > 100) return toast.error('Task must have less than 100 characters')

    setTasks((prev) => {
      const list = [...prev, task]
      localStorage.setItem("tasks", JSON.stringify(list))
      return list
    })

    toast.success('Task created Successfully')

    // Clear input after submit
    setTask({ id: "", name: "", status: "todo" })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
          value={task.name}
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), name: e.target.value })
          }
        />
        <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateTask

