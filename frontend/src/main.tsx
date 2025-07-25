import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext.tsx';



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ErrorBoundary>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </ErrorBoundary>
  </BrowserRouter>,
)
