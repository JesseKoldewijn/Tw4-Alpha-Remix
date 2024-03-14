import Navbar from "~/components/navigation/Navbar";
import { Theme } from "~/config/themes";
import { ThemeProvider } from "~/providers/ThemeProvider";

type RootLayoutProps = {
	initialTheme: Theme;
	children: React.ReactNode;
};

const RootLayout = ({ initialTheme, children }: RootLayoutProps) => {
	return (
		<ThemeProvider initialTheme={initialTheme}>
			<Navbar />
			{children}
		</ThemeProvider>
	);
};

export default RootLayout;
