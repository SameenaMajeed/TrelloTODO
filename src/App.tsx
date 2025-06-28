import { useEffect, useState } from "react";
import CreateTask from "./Components/CreateTask";
import ListTask from "./Components/ListTask";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ThemeToggle from "./Components/ThemeToggle";

export interface Task {
	id: string | number;
	name: string;
	status: "todo" | "inprogress" | "closed";
}

function App() {
	const [tasks, setTasks] = useState<Task[]>([]);

	console.log("tasks", tasks);

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<Toaster />
			<div className='bg-slate-100 dark:bg-gray-900 w-screen h-screen text-black dark:text-white flex flex-col items-center p-3 pt-10 gap-10 transition-colors'>
				<div className='w-full flex justify-end pr-6'>
					<ThemeToggle/>
				</div>

				<CreateTask
					tasks={tasks}
					setTasks={setTasks}
				/>
				<ListTask
					tasks={tasks}
					setTasks={setTasks}
				/>
			</div>
		</DndProvider>
	);
}

export default App;
