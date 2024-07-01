"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/api/status", (_, res) => {
    return res.status(200).json({
        success: true,
    });
});
app.get("/api/hello", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { visitor_name = "Mark" } = req.query;
    try {
        const client_ip = req.ip;
        const geo = yield axios_1.default.get(`https://get.geojs.io/v1/ip/geo/${client_ip}.json`);
        const location = geo.data.city;
        const greeting = `Hello, ${visitor_name}!, in ${location}`;
        return res.status(200).json({
            client_ip,
            greeting,
            location,
        });
    }
    catch (err) {
        console.log(err.message);
        return res.sendStatus(500);
    }
}));
app.listen(5500, () => {
    console.log("Server Running!");
});
exports.default = app;
