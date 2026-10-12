import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Newsletter from './pages/Newsletter'
import ArticleDetail from './pages/ArticleDetail'
import Events from './pages/Events'
import Research from './pages/Research'
import ResearchDetail from './pages/ResearchDetail'
import GetInvolved from './pages/GetInvolved'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/newsletter/:slug" element={<ArticleDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/conferences" element={<Navigate to="/events" replace />} />
        <Route path="/research" element={<Research />} />
        <Route path="/research/:slug" element={<ResearchDetail />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
