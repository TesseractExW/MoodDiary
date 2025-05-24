import express from "express";
import { Firebase, Server } from "./config.js";

import { RegisterRoute } from "./routes/Register.js";
import { DashboardRoute } from "./routes/Dashboard.js";


const app = express();

app.use(express.json());

app.use('/auth',new RegisterRoute().GetRouter());
app.use('/dash',new DashboardRoute().GetRouter());

console.log("\x1b[32m" + "Built successfully!" + "\x1b[0m");
console.log("\x1b[34m" + "Currently running on PORT " + Server.port + "\x1b[0m");
app.listen(Server.port);