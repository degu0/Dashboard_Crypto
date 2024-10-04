import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { AppRouter } from "./routes";
import { ThemeProvider } from "./components/Theme";
import { ButtonDarkMode } from "./components/ButtomDarkMode";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="bg-zinc-100 dark:bg-bg-dark flex flex-col min-h-screen font-Cairo">
          <Nav />
          <main className="flex-1">
            <AppRouter />
          </main>
          <Footer />
          <ButtonDarkMode />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
