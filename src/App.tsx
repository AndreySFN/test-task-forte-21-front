import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ClientDetails } from './components/features/clientDetails/ClientDetails.tsx'
import { ClientsPage } from './pages/ClientsPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { AuthPage } from './pages/AuthPage.tsx'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/clients" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/clients" element={<ClientsPage />}>
          <Route path=":id" element={<ClientDetails />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
