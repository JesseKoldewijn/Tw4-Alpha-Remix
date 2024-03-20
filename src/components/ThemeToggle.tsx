import { useTheme } from "~/providers/ThemeProvider";
import Button from "./ui/Button";

const ThemeToggle = () => {
	const { toggleTheme } = useTheme();

	const handleThemeToggle = async () => {
		void toggleTheme();
	};

	return (
		<Button onClick={() => void handleThemeToggle()}>ThemeToggle</Button>
	);
};

export default ThemeToggle;
