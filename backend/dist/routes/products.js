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
const express_1 = __importDefault(require("express"));
const delieverInfo_1 = __importDefault(require("../models/delieverInfo"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).send({
                messgae: "Token is required",
            });
        }
        const isAuthorizeuser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (isAuthorizeuser) {
            return res.status(200).send({
                message: "Authorize User",
            });
        }
        else {
            return res.status(401).send({
                message: "Unauthorize User",
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
});
router.post("/delievery", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, state, city, apartment, landMark, area, phoneNumber } = req.body;
    try {
        if (!fullName) {
            return res.status(400).send({ message: "Full name is reuired" });
        }
        if (!state) {
            return res.status(400).send({ message: "state is reuired" });
        }
        if (!city) {
            return res.status(400).send({ message: "City is reuired" });
        }
        if (!apartment) {
            return res.status(400).send({ message: "Apartment is reuired" });
        }
        if (!landMark) {
            return res.status(400).send({ message: "Landmark is reuired" });
        }
        if (!area) {
            return res.status(400).send({ message: "Area is reuired" });
        }
        if (!phoneNumber) {
            return res.status(400).send({ message: "Phone number is reuired" });
        }
        if (phoneNumber.length !== 10) {
            return res.status(400).send({ message: "Phone number must be 10 digit" });
        }
        const newDelievery = yield new delieverInfo_1.default({
            fullName: fullName,
            phoneNumber: phoneNumber,
            apartment: apartment,
            area: area,
            landMark: landMark,
            city: city,
            state: state,
        }).save();
        if (newDelievery) {
            return res.status(201).send({ message: "Details saved successfully" });
        }
    }
    catch (error) {
        console.log("delievery :", error);
        return res.status(500).send({ message: "An unexpected error occurred" });
    }
}));
exports.default = router;
