import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const Router = ({ routes }) => (
    <div>
        {routes.map(route => <Route key={route.key} {...route} />)}
    </div>
);

Router.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired
    })).isRequired
};

export default Router;
