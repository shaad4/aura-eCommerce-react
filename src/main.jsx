import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify"
import App from './App.jsx'
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import "react-toastify/dist/ReactToastify.css";
import { RouteErrorBoundary } from './components/error/RouteErrorBoundary.jsx';



createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <BrowserRouter>
      
    <StrictMode>
      <RouteErrorBoundary global={true}>
         <App />
      </RouteErrorBoundary>
     
    </StrictMode>
    
    <ToastContainer />
      
  </BrowserRouter>
</Provider>
 
)
