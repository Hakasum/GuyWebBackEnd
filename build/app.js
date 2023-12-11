"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const ProfileController_1 = __importDefault(require("./Controllers/ProfileController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.get('/api/ping', (request, response) => {
    return response.send('hello');
});
app.use('/api/profiles', ProfileController_1.default);
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    console.log("connected to mongo");
    app.listen(config_1.config.server.port, () => {
        console.log(`listening to port ${config_1.config.server.port}`);
    });
})
    .catch((err) => {
    console.log(err);
    throw new Error("mongo connection failed");
});
//# sourceMappingURL=app.js.map