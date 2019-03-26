import About from './about';
import Dashboard from './dashboard';

export default [
    {
        path: '/',
        component: Dashboard,
        key: 'dashboard'
    },
    {
        path: '/about',
        component: About,
        key: 'about'
    }
];
