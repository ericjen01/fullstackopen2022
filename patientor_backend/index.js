"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //json = middleware function in express which parses reqs with json payloads
const PORT = 3000;
app.get('/', (req, res) => {
    console.log("connected....");
    res.send('test');
});
app.listen(PORT, () => { console.log(`server running on ${PORT}`); });
