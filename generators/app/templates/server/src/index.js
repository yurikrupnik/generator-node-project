import express from 'express';
import morgan from 'morgan';
import { port<%= filters.db ? ', databaseUrl ' : ' '%>} from './config';
import api from './api';
<% if (filters.db) { _%>
import db from './services/db';
<%_ } _%>
<%_ if (filters.io) { _%>
import server from './services/socket/server';
<%_ } _%>
<%_ if (filters.auth) { _%>
import passport from './services/passport';
<%_ } _%>

const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));

app.use(morgan('dev'));

const route = express.Router();
route.get('/', (req, res, next) => {
    res.json(['u'])
});
<%_ if (filters.db) { _%>
app.use(db(databaseUrl));
<%_ } _%>
<%_ if (filters.auth) { _%>
app.use(passport(app));
<%_ } _%>
app.use(api);
app.use(route);

<%= filters.io ? 'server(app)' : 'app' %>.listen(port, (err) => {
    if (err) {
        console.log('err', err); // eslint-disable-line no-console
    } else {
        console.log(`running at port: ${port}`); // eslint-disable-line no-console
    }
});
