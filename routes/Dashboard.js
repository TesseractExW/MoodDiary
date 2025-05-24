import { Router } from "express";

export class DashboardRoute
{
    constructor()
    {
        this.router = Router();
        // initialize
        this.router.get('/', this.Summarize)
    }
    Summarize(req, res)
    {
        // TODO
        res.send("Dashboard page");
    }
    GetRouter()
    {
        return this.router;
    }
};