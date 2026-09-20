import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout'
import { StoreProvider } from '@/store/store'
import { ThemeProvider } from '@/store/theme'
import Dashboard from '@/pages/Dashboard'
import Clients from '@/pages/Clients'
import ClientDetail from '@/pages/ClientDetail'
import Leads from '@/pages/Leads'
import Pipeline from '@/pages/Pipeline'
import Tasks from '@/pages/Tasks'
import Calendar from '@/pages/Calendar'
import Notes from '@/pages/Notes'
import Conversations from '@/pages/Conversations'
import Documents from '@/pages/Documents'
import Users from '@/pages/Users'
import Settings from '@/pages/Settings'

export default function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        {/* HashRouter keeps deep links working on static hosts with no rewrite rules. */}
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="clienti" element={<Clients />} />
              <Route path="clienti/:id" element={<ClientDetail />} />
              <Route path="lead-uri" element={<Leads />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="task-uri" element={<Tasks />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="note" element={<Notes />} />
              <Route path="conversatii" element={<Conversations />} />
              <Route path="documente" element={<Documents />} />
              <Route path="utilizatori" element={<Users />} />
              <Route path="setari" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </StoreProvider>
    </ThemeProvider>
  )
}
