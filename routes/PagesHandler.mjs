import { Router } from "express";
import { fileURLToPath } from "url";
import { Server } from "../config.mjs";
import * as path from 'path';
import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PagesHandler
{
    constructor ()
    {
        this.router = Router();
        this.router.get('/', this.StaticSendFile("welcome"));
        
        const folder = path.join(__dirname, "../pages/");
        fs.readdir(folder, (err, files) => {
            console.log("\nLoading pages...\n")
            console.log(files);
            files.forEach((file)=>{
                const filePath = path.join(folder, file);
                const name = path.basename(filePath).split('.')[0];
                this.router.get('/' + name.toLowerCase() ,this.StaticSendFile(name));
            });
        });
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
    GetRouter()
    {
        return this.router;
    }
};