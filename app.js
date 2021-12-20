import express from "express"
import active_mdw_session from './middlewares/session.middleware.js'
import active_viewMiddleware from "./middlewares/viewMiddleware.js";
import adminRoute from './route/admin.route.js'
import morgan from 'morgan'
import active_session from "./middlewares/session.middleware.js";
import active_local from"./middlewares/local.mdw.js"
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use('/public',express.static('public'));
active_mdw_session(app);
active_viewMiddleware(app);
active_session(app);
active_local(app);
app.use('/',adminRoute);
app.listen(3000);