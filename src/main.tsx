import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { useThemeStore } from './store/themeStore';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

function RootApp() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(rootElement).render(<RootApp />);
