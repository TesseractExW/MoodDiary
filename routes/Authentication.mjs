import { Router } from "express";
import { User } from "../config.mjs";
import { Database } from "./Database.mjs";
import * as jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const RefreshTokens = new Database();
const UserDatabase = new Database();

export class AuthRoute
{
    constructor() {
        this.router = Router();
        // initialize
        this.router.post('/auth-login', this.AuthLogin);
        this.router.post('/auth-register', this.AuthRegister);
        this.router.post('/auth-verify', this.AuthVerify);
        this.router.post('/auth-logout', this.AuthLogout);
        this.router.post('/auth-get-data', this.AuthGetData);
        this.router.post('/auth-update-data', this.AuthUpdateData)
    }
    async AuthLogin(req, res) {
        // TODO
        const { username , password } = req.body;
        if (!username || !password) {
            return res.status(401).json({ message : "Username and password are required" });
        }

        if (!UserDatabase.IsDataExist(username)) {
            return res.status(403).json({ message: "User does not exist" });
        }

        const hashedData = UserDatabase.GetData(username);

        const match = await bcrypt.compare(password, hashedData.password);

        if (!match)
        {
            return res.status(401).json({ message: "Password is not correct" });
        }

        const user = {
            username : username,
        };

        const accessToken = jwt.sign(user, User.access_token, { expiresIn : '30s' });
        const refreshToken = jwt.sign(user, User.refresh_token);

        RefreshTokens.UpdateData(refreshToken, true);

        res.json({
            accessToken : accessToken,
            refreshToken : refreshToken,
        });
    }
    AuthLogout(req, res) {
        const { token } = req.body;

        RefreshTokens.RemoveData(token);
        return res.status(204).json({ message : "Logout successfully"});
    }
    async AuthRegister(req, res) {
        // TODO
        const { username, password } = req.body;
        if (!username || !password)
        {
            return res.status(400).json({ message : "Username and password are require"});
        }

        if (UserDatabase.IsDataExist(username))
        {
            return res.status(400).json({ message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        UserDatabase.UpdateData(username,
            {
                username : username,
                password : hashedPassword,
                dates : {}
            }
        );
        return res.status(201).json({ message : "User registered successfully"});
    }
    AuthVerify(req, res) {
        const { token } = req.body;
        
        if (token == null) return res.sendStatus(401);
        if (!RefreshTokens.IsDataExist(token))
        {
            return res.sendStatus(403);
        }

        jwt.verify(token, User.refresh_token, (error , user) => {
            if (error) // TOKEN INCORRECT
            {
                return res.status(403).json({ message : "Hash error"});
            }

            const accessToken = jwt.sign(user, User.access_token, { expiresIn : '30s' });

            return res.status(201).json({ message : "User verified", accessToken : accessToken });
        });
        return res.status(401).json({message : "User is not verified"});
    }
    AuthGetData(req, res) {
        const { accessToken } = req.body;

        jwt.verify(accessToken, User.access_token, (error , user) => {
            if (error) // TOKEN INCORRECT
            {
                return res.status(403).json({ message : "Hash error"});
            }

            const username = user.username;
            if (!UserDatabase.IsDataExist(username))
            {
                return res.status(404).json({ message: "User not found" });
            }

            const userData = UserDatabase.GetData(username);
            
            return res.status(201).json({ message : "Get data successfully", date : userData.date });
        })
        return res.status(401).json({ message : "Cannot get data" });
    }
    AuthUpdateData(req, res) {
        const { accessToken , date , emotions } = req.body;

        jwt.verify(accessToken, User.access_token, (error, user) => {
            if (error) {
                return res.status(403).json({ message: "Hash error" });
            }

            const username = user.username;
            if (!UserDatabase.IsDataExist(username))
            {
                return res.status(404).json({ message: "User not found" });
            }
            const userData = UserDatabase.GetData(username);
            userData.dates[date] = emotions;
            
            UserDatabase.UpdateData(username, userData);

            return res.status(200).json({ message: "Update data successfully", date: userData.dates || {} });
        });
        return res.status(403).json({ message : "Cannot Update data" });
    }
    GetRouter() {
        return this.router;
    }
};