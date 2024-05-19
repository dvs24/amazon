import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title : String,
    imgUrl : String,
    price : Number
});

export default mongoose.model("products", ProductSchema);
