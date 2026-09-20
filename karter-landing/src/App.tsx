import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import About from '@/pages/About'
import Testimonials from '@/pages/Testimonials'
import Contact from '@/pages/Contact'
import Quote from '@/pages/Quote'

export default function App() {
  return (
    /* HashRouter keeps deep links working on static hosts with no rewrite rules. */
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicii" element={<Services />} />
          <Route path="proiecte" element={<Projects />} />
          <Route path="proiecte/:slug" element={<ProjectDetail />} />
          <Route path="despre" element={<About />} />
          <Route path="testimoniale" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="oferta" element={<Quote />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
