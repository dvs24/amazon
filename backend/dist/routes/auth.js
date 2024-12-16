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
const userDetail_1 = __importDefault(require("../models/userDetail"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name) {
        return res.status(400).send({ message: "Please provide the name" });
    }
    if (!email) {
        return res.status(400).send({ message: "Please provide the email" });
    }
    if (!password) {
        return res.status(400).send({ message: "Please provide the password" });
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send({
            message: "Password must contain at least one capital letter, one number, one special character and length of eight letters",
        });
    }
    try {
        const existingUser = yield userDetail_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exist" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield new userDetail_1.default({
            name: name,
            email: email,
            password: hashedPassword,
        }).save();
        if (newUser) {
            return res.status(200).send({ message: "User created successfully" });
        }
    }
    catch (error) {
        console.log("signup :", error);
        return res.status(500).send({ message: "Internal server error" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Please provide the email" });
        }
        if (!password) {
            return res.status(400).send({ message: "Please provide the password" });
        }
        const user = yield userDetail_1.default.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "Invalid email or password" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid email or password" });
        }
        const token = yield jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });
        return res.status(200).send({ message: "Login successfully", data: {
                token: token,
                email: email
            } });
    }
    catch (error) {
        console.log("signin :", error);
        return res.status(500).send({ message: "Internal server error" });
    }
}));
exports.default = router;
