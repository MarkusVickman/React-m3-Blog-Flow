import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PersonalPage from './pages/PersonalPage';
import SinglePostPage from './pages/SinglePostPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/personal",
                element: (<ProtectedRoute> <PersonalPage /> </ProtectedRoute>)
            },
            {
                path: "/single",
                element: <SinglePostPage />
            },
            {
                path: "/about",
                element: <AboutPage />
            }
        ]
    }
])

export default router;