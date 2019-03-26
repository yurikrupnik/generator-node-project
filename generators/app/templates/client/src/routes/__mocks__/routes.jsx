import React from 'react';

const Com1 = () => (
    <div>
        Comp 1
    </div>
);

const Com2 = () => (
    <div>
        Comp 2
    </div>
);

const routes = [
    {
        path: '/',
        component: Com1,
        key: 'shows'
    },
    {
        path: '/c',
        component: Com2,
        key: 'Com2'
    }
];

export default routes;
