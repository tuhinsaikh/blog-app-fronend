import { StrictMode } from 'react'
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './src/context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider> 
            <App />
      </AuthProvider>
  </BrowserRouter>,
)

