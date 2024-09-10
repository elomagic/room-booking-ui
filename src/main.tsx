import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {v4 as uuidv4} from "uuid";
import './i18n/config';
import App from './App.tsx'
import './index.css'

if (localStorage.getItem("rb.uid") == null) {
    localStorage.setItem("rb.uid", uuidv4());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
