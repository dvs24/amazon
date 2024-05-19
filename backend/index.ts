import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/products"
import authRoutes from "./routes/auth"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Connection string
const connectionUrl = process.env.MONGODB_URL as string;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

// Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => console.log("Listening on port", port));
