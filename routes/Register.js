import { Router } from "express";

export class RegisterRoute
{
    constructor()
    {
        this.router = Router();
        // initialize
        this.router.get('/login', this.Login)
        this.router.get('/register', this.Register)
        
        this.router.post('/auth-check', this.AuthCheck)
        this.router.post('/auth-create', this.AuthCreate)
    }
    Login(req, res)
    {
        // TODO
        res.send("Login Page");
    }
    Register(req, res)
    {
        // TODO
        res.send("Register Page");
    }
    AuthCheck(req, res)
    {
        const { user , password } = req.body;
        // TODO
    }
    AuthCreate(req, res)
    {
        const { user , password } = req.body;
        // TODO
    }
    GetRouter()
    {
        return this.router;
    }
};