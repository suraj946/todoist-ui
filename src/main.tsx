import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx'
import { UserProvider } from './context/userContext.tsx'
import { TodoProvider } from './context/todoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <TodoProvider>
        <App />
        <Toaster />
      </TodoProvider>
    </UserProvider>
  </StrictMode>,
)
