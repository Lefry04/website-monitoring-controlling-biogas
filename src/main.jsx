import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Pages/error.jsx'
import Products from './Pages/products.jsx'
import Masuk from './Pages/masuk.jsx'
import Landing from './Pages/landing.jsx'
import Daftar from './Pages/daftar.jsx'
import FormDaftar from './Components/Fragments/FormDaftar.jsx'
import VerifikasiDaftar from './Components/Fragments/VerifikasiDaftar.jsx'
import Login from './Pages/login.jsx'
import FormLogin from './Components/Fragments/FormLogin.jsx'
import LupaPass from './Components/Fragments/LupaPass.jsx'
import VerifikasiLupPas from './Components/Fragments/VerifikasiLupPas.jsx'
import Dashboard from './Pages/dashboard.jsx'
import Pengaduk from './Pages/pengaduk.jsx'
import Produksi from './Pages/produksi.jsx'
import Analitik from './Pages/analitik.jsx'
import Notifikasi from './Pages/notifikasi.jsx'
import Profil from './Pages/profil.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      { index: true, element: <FormLogin /> },
      { path: 'password', element: <LupaPass /> },
      { path: 'verifikasi', element: <VerifikasiLupPas /> },
    ],
  },
  {
    path: '/daftar',
    element: <Daftar />,
    children: [
      { index: true, element: <FormDaftar /> },
      { path: 'verifikasi', element: <VerifikasiDaftar /> },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/pengaduk',
    element: <Pengaduk />,
  },
  {
    path: '/produksi',
    element: <Produksi />,
  },
  {
    path: '/analitik',
    element: <Analitik />,
  },
  {
    path: '/notifikasi',
    element: <Notifikasi />,
  },
  {
    path: '/profil',
    element: <Profil />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/background',
    element: <Masuk />,
  },
  {
    path: '/landing',
    element: <Landing />,
  }
]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
