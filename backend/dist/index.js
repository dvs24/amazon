"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = __importDefault(require("./routes/products"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middleware setup
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow any request from the same domain (but different ports)
        if (origin && origin.includes("pike.replit.dev")) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Connection string
const connectionUrl = process.env.MONGODB_URL;
mongoose_1.default
    .connect(connectionUrl)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
// Routes
app.use("/products", products_1.default);
app.use("/auth", auth_1.default);
app.listen(port, () => console.log("Listening on port", port));
