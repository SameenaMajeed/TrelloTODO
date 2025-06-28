import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
	const [darkMode, setDarkMode] = useState(
		() => localStorage.getItem("theme") === "dark"
	);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [darkMode]);

	return (
		<button onClick={() => setDarkMode(!darkMode)}>
			{darkMode ? "🌙 " : "☀️ "}
		</button>
	);
};

export default ThemeToggle;
