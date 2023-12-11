
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config"
import ProfileController from "./Controllers/ProfileController"

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }))


app.get('/api/ping', (request, response) => {
    return response.send('hello')
})

app.use('/api/profiles', ProfileController);


mongoose.connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        console.log("connected to mongo");
        app.listen(config.server.port, () => {
            console.log(`listening to port ${config.server.port}`);
        })
    })
    .catch((err) => {
        console.log(err);
        throw new Error("mongo connection failed");
    })