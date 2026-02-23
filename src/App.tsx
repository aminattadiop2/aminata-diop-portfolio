import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { DataProvider } from './contexts/DataContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Admin from './pages/Admin';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar theme={theme} onToggleTheme={toggle} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}
