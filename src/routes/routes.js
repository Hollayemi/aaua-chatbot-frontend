import { useRoutes } from 'react-router-dom';
import LazyLoading from '../components/LazyLoading';
const NotFound = LazyLoading(() => import('./NotFound'));
const AuthOutlet = LazyLoading(() => import('../components/HOC/AuthOutlet'));
const AdminOutlet = LazyLoading(() => import('../components/HOC/AdminOutlet'));
const ErorrBoundary = LazyLoading(() =>
    import('../components/HOC/ErrorBoundary')
);
const Home = LazyLoading(() => import('../pages/website'));
const Admin = LazyLoading(() => import('../pages/website/admin'));
const Login = LazyLoading(() => import('../pages/auth/Login'));
const CreateAccount = LazyLoading(() => import('../pages/auth/createAccount'));

const AdminLogin = LazyLoading(() => import('../pages/auth/adminLogin'));
//
const AppRoutes = () => {
    let allRoutes = useRoutes([
        {
            path: '/',
            element: <AuthOutlet />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
            ],
        },
        {
            path: '/admin',
            element: <AdminOutlet />,
            children: [
                {
                    index: true,
                    element: <Admin />,
                },
            ],
        },
        {
            path: '/admin/login',
            element: <AdminLogin />,
        },
        {
            path: '/signin',
            element: <Login />,
        },
        {
            path: '/create-account',
            element: <CreateAccount />,
        },
        {
            path: '/error/:codeErr',
            element: <ErorrBoundary />,
        },
        {
            // =======
            // >>>>>>> 74763df8bbd4e67e19856d0a4e6a726ba0362df9
            path: '*',
            element: <NotFound />,
        },
    ]);
    return allRoutes;
};

export default AppRoutes;
