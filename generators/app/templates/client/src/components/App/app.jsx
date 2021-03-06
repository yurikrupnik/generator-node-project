import React from 'react';
import PropTypes from 'prop-types';
import Providers from './providers';
import apiProviders from '../../api/providers';
import Layout from './layout';

const App = ({ routes }) => (
    <Providers providers={apiProviders}>
        <Layout routes={routes} />
    </Providers>
);

App.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default App;
