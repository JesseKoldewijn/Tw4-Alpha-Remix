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
			<main className="pt-20">{children}</main>
		</ThemeProvider>
	);
};

export default RootLayout;
