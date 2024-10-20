import express from "express";
import products from "../models/products";
import delievery from "../models/delieverInfo";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { token } = req.query as { token: string };

    if (!token) {
      return res.status(400).send({
        messgae: "Token is required",
      });
    }

    const isAuthorizeuser = jwt.verify( token , process.env.JWT_SECRET!);

    if (isAuthorizeuser) {
      return res.status(200).send({
        message: "Authorize User",
      });
    } else {
      return res.status(401).send({
        message: "Unauthorize User",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.post("/delievery", async (req: any, res: any) => {
  const { fullName, state, city, apartment, landMark, area, phoneNumber } =
    req.body;
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

    const newDelievery = await new delievery({
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
  } catch (error: any) {
    console.log("delievery :", error);
    return res.status(500).send({ message: "An unexpected error occurred" });
  }
});

export default router;
