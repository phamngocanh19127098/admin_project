import {engine} from "express-handlebars";
import hbs_sections from 'express-handlebars-sections';
export default function (app){
    app.engine('hbs', engine({
        defaultLayout:'layout.hbs',
        helpers: {
            section: hbs_sections()
        }

    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
}