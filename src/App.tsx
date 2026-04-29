import { Navigate, Route, Routes } from 'react-router-dom'

import { PublicLayout } from '@/components/layout/PublicLayout'
import { AccessPage } from '@/pages/public/AccessPage'
import { FaqPage } from '@/pages/public/FaqPage'
import { GalleryPage } from '@/pages/public/GalleryPage'
import { MenuPage } from '@/pages/public/MenuPage'
import { NewsDetailPage } from '@/pages/public/NewsDetailPage'
import { NewsListPage } from '@/pages/public/NewsListPage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'
import { StaffPage } from '@/pages/public/StaffPage'
import { TopPage } from '@/pages/public/TopPage'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<TopPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/access" element={<AccessPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default App
