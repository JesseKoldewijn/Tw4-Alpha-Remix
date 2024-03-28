import Navbar from "~/components/navigation/Navbar";
import { type Theme } from "~/config/themes";
import { ThemeProvider } from "~/providers/ThemeProvider";

interface RootLayoutProps {
  initialTheme: Theme;
  children: React.ReactNode;
}

const RootLayout = ({ initialTheme, children }: RootLayoutProps) => {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <a href="#main" className="sr-only">
        Jump directly to main content
      </a>
      <Navbar />
      <main id="main" className="py-6 sm:py-20 lg:py-10">
        {children}
      </main>
    </ThemeProvider>
  );
};

export default RootLayout;
