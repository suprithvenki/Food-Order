import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/food-controller.js";

import multer from "multer";
// Multer=to create image storage system

const foodRouter = express.Router();

//Image storage engine

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
//`${Date.now()}` for unique filename storage

const upload = multer({ storage: Storage });

foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list", listFood);

foodRouter.post("/remove",  removeFood);

export default foodRouter;
