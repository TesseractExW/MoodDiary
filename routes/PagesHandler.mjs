import { Router } from "express";
import { fileURLToPath } from "url";
import { Server } from "../config.mjs";
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PagesHandler
{
    constructor ()
    {
        this.router = Router();
        this.router.get('/', this.StaticSendFile("Welcome"));
        this.router.get('/dash', this.StaticSendFile("Dashboard"));
        this.router.get('/login', this.StaticSendFile("Login"));
        this.router.get('/register', this.StaticSendFile("Register"));
        this.router.get('/about', this.StaticSendFile("About"));
        // this.router.use(this.Redirect('/'));
        
    }
    StaticSendFile(pageName)
    {
        const dir = path.join(__dirname, "../pages/" + pageName + ".html");
        return (req, res) => {
            res.sendFile(dir , (err) => {
                if (!res.headersSent)
                {
                    return res.status(500).send("Error loading the page");
                }
            });
        }
    }
    Redirect(url)
    {
        return (req, res) => {
            res.redirect(url);
        }
    }
    GetRouter()
    {
        return this.router;
    }
};