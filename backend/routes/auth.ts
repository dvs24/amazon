import express from "express";
import users from "../models/userDetail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req: any, res: any) => {
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

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).send({
      message:
        "Password must contain at least one capital letter, one number, one special character and length of eight letters",
    });
  }

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new users({
      name: name,
      email: email,
      password: hashedPassword,
    }).save();
   
    if (newUser) {
      return res.status(200).send({ message: "User created successfully" });
    }
  } catch (error) {
    console.log("signup :", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/signin", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Please provide the email" });
    }

    if (!password) {
      return res.status(400).send({ message: "Please provide the password" });
    }

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = await jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "2d",
      }
    );

    return res.status(200).send({ message: "Login successfully", data : {
      token : token,
      email : email
    } });
  } catch (error) {
    console.log("signin :", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
