import { useTheme } from "~/providers/ThemeProvider";
import ThemeToggle from "../ThemeToggle";
import { cn } from "~/utils/cn";

const Navbar = () => {
	const { theme } = useTheme();
	return (
		<div className="fixed w-full items-center inset-x-0 inline-flex justify-between p-4">
			<div
				className={cn(
					"absolute opacity-70 inset-0 -z-10 blur-3xl backdrop-blur-3xl",
					theme == "dark" && "bg-neutral-950/25",
					theme == "light" && "bg-neutral-100/25"
				)}
			></div>
			<div>Remix TailwindCSS 4🔥</div>
			<div className="flex items-center justify-center">
				<ThemeToggle />
			</div>
		</div>
	);
};

export default Navbar;
