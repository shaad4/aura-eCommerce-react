import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify"
import App from './App.jsx'
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import "react-toastify/dist/ReactToastify.css";



createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <BrowserRouter>
      
    <StrictMode>
      <App />
    </StrictMode>
    
    <ToastContainer />
      
  </BrowserRouter>
</Provider>
 
)
