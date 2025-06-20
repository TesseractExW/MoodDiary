import express from "express";
import cookieParser from "cookie-parser";
import { Firebase, Server } from "./config.mjs";

import { AuthRoute } from "./routes/Authentication.mjs";
import { PagesHandler } from "./routes/PagesHandler.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/auth',new AuthRoute().GetRouter());
app.use('/',new PagesHandler().GetRouter());

app.use('/public', express.static('public'))

console.log("\x1b[32m" + "Built successfully!" + "\x1b[0m");
console.log("\x1b[34m" + "Currently running on PORT " + Server.port + "\x1b[0m");
app.listen(Server.port);