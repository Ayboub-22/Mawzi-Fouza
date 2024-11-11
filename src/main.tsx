import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Page1'
import App1 from './Page2'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>,
)
