import React, { useState } from "react";
import { useDrag } from "react-dnd";

interface DraggableTaskProps {
  task: {
    id: string | number;
    name: string;
    status: "todo" | "inprogress" | "closed";
  };
  onDelete: () => void;
  onEdit: (newName: string) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({
  task,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleEditSave = () => {
    if (editedName.trim()) {
      onEdit(editedName);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={dragRef as unknown as React.Ref<HTMLDivElement>}
      className={`relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
          />
          <button
            onClick={handleEditSave}
            className="text-green-600 hover:text-green-800"
            title="Save"
          >
            ✔️
          </button>
        </div>
      ) : (
        <p
          className="text-gray-800 font-medium truncate"
          onDoubleClick={() => setIsEditing(true)}
          title="Double click to edit"
        >
          {task.name}
        </p>
      )}

      <div className="absolute bottom-1 right-1 flex gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit task"
          >
            ✏️
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-500 hover:text-red-500 transition-colors"
          title="Delete task"
        >
          ❌
        </button>
      </div>

      {/* <p className="text-gray-800 font-medium truncate">{task.name}</p> */}
      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute bottom-1 right-1 text-gray-500 hover:text-red-500 transition-colors"
        aria-label={`Delete task ${task.name}`}
        title="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default DraggableTask;
