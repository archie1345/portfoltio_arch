import { CopyProvider } from './widgets/copyContext';
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from './App.jsx'
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <CopyProvider>
    <App />
  </CopyProvider>,
)
