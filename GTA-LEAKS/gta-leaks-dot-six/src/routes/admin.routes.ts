import express, { NextFunction, Request, Response } from "express";
import { checkAdminRole, verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/panel",
  verifyToken as (req: Request, res: Response, next: NextFunction) => void,
  checkAdminRole as (req: Request, res: Response, next: NextFunction) => void,
  (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Welcome to the admin panel",
    });
  }
);

export default router;
