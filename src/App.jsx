import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CamperDetails from './pages/CamperDetails'


export default function App() {
return (
<Routes>
<Route path='/' element={<Layout />}>
<Route index element={<Home />} />
<Route path='catalog' element={<Catalog />} />
<Route path='catalog/:id' element={<CamperDetails />} />
<Route path='*' element={<Navigate to='/' replace />} />
</Route>
</Routes>
)
}
