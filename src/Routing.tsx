import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PersonalPage from './pages/PersonalPage';
import SinglePostPage from './pages/SinglePostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BlogProvider } from './context/BlogContext';
import FollowUserPage from './pages/FollowUserPage';

const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <BlogProvider><HomePage /></BlogProvider>
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "/follow/:email",
                element: <BlogProvider><FollowUserPage /></BlogProvider>
            },
            {
                path: "/personal",
                element: (<ProtectedRoute> <BlogProvider><PersonalPage /></BlogProvider> </ProtectedRoute>)
            },
            {
                path: "/single/:id",
                element: <BlogProvider><SinglePostPage /></BlogProvider>
            },
            {
                path: "/about",
                element: <AboutPage />
            }
        ]
    }
])

export default router;