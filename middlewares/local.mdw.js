export default function (app){
    app.use(function (req,res,next){
        if(typeof(req.session.admin)==='undefined'){
            req.session.admin=false;
        }
        res.locals.admin=req.session.user;
        next();
    })
}