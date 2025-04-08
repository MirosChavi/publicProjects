import express, { Request, Response, Router } from "express";
import User from "../modules/auth/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    nickname: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

router.post("/register", async (req: RegisterRequest, res: Response) => {
  try {
    const { email, password, nickname } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { nickname }] });
    if (existingUser) {
      return console.log("This email or nickname already exists");
    }

    const newUser = new User({
      email,
      password,
      nickname,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
});

router.post(
  "/login",
  async (req: LoginRequest, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return console.log("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return console.error("Incorrect password");
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          nickname: user.nickname,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "20d" }
      );

      res.status(200).json({ token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server error", error: (error as Error).message });
    }
  }
);

export default router;
