import express from 'express';
import { url } from './config';

const route = express.Router();

route.get(url, (req, res) => {
    res.json([
        {
            name: 'al'
        },
        {
            name: 'asdd'
        }
    ])
});

export default route;
