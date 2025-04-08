import express, { NextFunction, Request, Response } from "express";
import Leak from "../modules/leaks/leak.model.js";
import { checkAdminRole, verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

//Настройка хранилища multer

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.get("/", async (_req: Request, res: Response) => {
  try {
    const leaks = await Leak.find({});
    res.json(leaks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Server error: ${error.message}` });
      console.log(error.message);
    } else {
      res.status(500).json({ message: "Unknown server error" });
      console.log("Unknown server error");
    }
  }
});

router.post(
  "/add",
  verifyToken as (req: Request, res: Response, next: NextFunction) => void,
  checkAdminRole as (req: Request, res: Response, next: NextFunction) => void,
  uploads.single("img"),
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
      const imagePath = `/images/${req.file?.filename}`;
      console.log(imagePath);
      const newLeak = new Leak({
        title,
        description,
        img: imagePath,
      });
      await newLeak.save();
      res
        .status(201)
        .json({ message: "Leak added successfully", imgPath: imagePath });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: `Error while creating leak: ${error.message}` });
      } else {
        res.status(500).json({ message: "Unexpected error" });
      }
    }
  }
);

export default router;
