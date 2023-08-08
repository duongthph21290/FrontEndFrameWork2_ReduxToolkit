import { Navigate, createBrowserRouter } from 'react-router-dom'
import LayoutAdmin from './layouts/LayoutAdmin'
import AdminProduct from './pages/admin/product'
import AdminAdd from './pages/admin/product/add'
import AdminEdit from './pages/admin/product/edit'
import LayoutWebsite from './layouts/LayoutWebsite'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import ProductDetailPage from './pages/ProductDetail'


export const routers = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <Navigate to="home" /> },
            { path: "home", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "product/:idProduct", element: <ProductDetailPage /> },
            { path: "register", element: <Register />, },
            { path: "login", element: <Login /> },
        ]
    },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: 'dashboard', element: <h2 className='font-bold text-2xl'>Thống kê</h2> },
            { path: 'product', element: <AdminProduct /> },
            { path: 'product/add', element: <AdminAdd /> },
            { path: 'product/:idProduct/edit', element: <AdminEdit /> }
        ]
    }
])