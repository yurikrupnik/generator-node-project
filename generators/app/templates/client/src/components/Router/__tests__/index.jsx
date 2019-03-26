import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { createBrowserHistory } from 'history'; // eslint-disable-line
import { Router as Routes } from 'react-router-dom';
import Router from '../index';
import routes from '../../../routes';

jest.mock('../../../routes'); // eslint-disable-line no-undef

const {
    it,
    afterEach
} = global;

afterEach(cleanup);

it('should render Router', () => {
    const tree = (
        <Routes history={createBrowserHistory()}>
            <Router routes={routes}>
                <h2>
                    s
                </h2>
            </Router>
        </Routes>
    );

    render(tree);
});
