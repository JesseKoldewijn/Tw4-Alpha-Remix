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
      <a href="#main" className="sr-only">
        Jump directly to main content
      </a>
      <Navbar />
      <main id="main">{children}</main>
    </ThemeProvider>
  );
};

export default RootLayout;
