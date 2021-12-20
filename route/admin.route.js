import admin from "../middlewares/admin.mdw.js";
import adminModel from "../models/adminModel.js";
import express from "express";


const router = express.Router();
    router.get("/",function(req,res){
        res.render("main");
    }),
    router.get("/login",function(req,res){
        res.render("login");
    })
    router.get("/admin",admin, async function (req,res){
        const list = await adminModel.selectAll();
        res.render("tableUser",{
            user:list,
        })
    })
    router.get("/logout",function (req,res){
        req.session.admin=false;
        req.session.user= null;
        res.redirect('/login')
    })
    router.post('/login', async function(req,res){
        const username = req.body.username;
        const password = req.body.password;
        const admin = await adminModel.getUsername(username);
        if(admin.length===0){
            res.render('login',{
                wrongPassword:true,
            })
        }
        if(typeof (password)==="undefined"){
            res.render('login',{
                wrongPassword:true,
            })
        }
        if(password===admin[0].password){
            req.session.user= admin[0];
            req.session.admin = true;
            const retUrl = req.session.retUrl||'/admin';
            res.redirect(retUrl);
        }
     //   res.render('login')
    })
    router.get('/users/delete/:id',admin, async function (req,res){
        const id = req.params.id;
      //  console.log(id);
        const check = await adminModel.delUser(id)
        console.log(check);
        return res.redirect('/admin')
    })
    router.get('/users/update/:id',async function (req,res){
        const id =req.params.id;
        const user = await adminModel.selectUser(id);

        return res.render('update',{
            admin:user[0],
        })
    })
    router.post('/update/:id',admin , async function (req,res){
        const id = req.params.id;
        const entity = {
            id:id,
            fullname:req.body.fullname,
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        }
        console.log(entity);
        await adminModel.updateUser(entity);
        return res.redirect('/admin');
    })
    router.get('/add',function (req,res){
        return res.render('add');
    })
    router.post('/add',admin, async function (req,res){
        const entity = {
            fullname :req.body.fullname,
            username : req.body.username,
            password:req.body.password,
            email:req.body.email
        }

        const s = await adminModel.add(entity);
        console.log(s);
        return res.redirect('/admin');
    })
    router.get('/is-available',async function (req,res){
        const username = req.query.username;
        console.log(username);
        const user = await adminModel.getUserByUsername(username);
        console.log(user)
        if(user.length===0){
            return res.json(true);
        }
        return res.json(false);
    })
    export default router;

