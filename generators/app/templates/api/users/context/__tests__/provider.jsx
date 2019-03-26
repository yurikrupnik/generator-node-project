
import React from 'react';
import { Provider } from '..';
import api from '../../api';


jest.mock('../../api'); // eslint-disable-line no-undef

const {
    describe,
    test,
    expect,
    shallow
} = global;

describe('currency provider', () => {
    const Component = () => (
        <div>
            helo
        </div>
    );

    test('static method', () => {
        Provider.provider();
    });

    test('renders Projects Provider', () => {
        const wrapper = shallow((
            <Provider>
                <Component />
            </Provider>
        ));
        expect(wrapper).toMatchSnapshot();
    });

    test('should test fetch', (done) => {
        const wrapper = shallow((
            <Provider>
                <Component />
            </Provider>
        ));
        const instance = wrapper.instance();
        instance.fetch(); // const result = instance.fetch() is undefined
        expect(api.fetch).toHaveBeenCalledTimes(1);
        return done();
    });

    test('should test catch', (done) => {
        const wrapper = shallow((
            <Provider>
                <Component />
            </Provider>
        ));
        const instance = wrapper.instance();
        instance.fetch();
        expect(api.fetch).toHaveBeenCalledTimes(2);
        return done();
    });
});
