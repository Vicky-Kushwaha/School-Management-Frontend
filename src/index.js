import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './components/css/index.css'
import {AuthProvider} from "./components/Context.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <App />
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    BodyClassName="toastBody" //use this BodyClassName to add css
    />
  </React.StrictMode>
  </AuthProvider>
)
