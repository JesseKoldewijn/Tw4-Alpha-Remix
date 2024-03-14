import { useTheme } from "~/providers/ThemeProvider";

const ThemeToggle = () => {
	const { toggleTheme } = useTheme();

	const handleThemeToggle = async () => {
		void toggleTheme();
	};

	return (
		<button
			className="border-2 rounded-md cursor-pointer px-2 py-1"
			onClick={() => void handleThemeToggle()}
		>
			ThemeToggle
		</button>
	);
};

export default ThemeToggle;
