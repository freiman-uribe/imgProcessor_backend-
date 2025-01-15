import express from "express";
import ImageController from "../../adapters/controllers/imageController";
import auth from "../middleware/auth";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post(
  "/upload",
  auth,
  upload.single("image"),
  ImageController.uploadImage
);
router.get("/search", auth, ImageController.getImagesByDate);
router.get("/count", auth, ImageController.getImagesGroupedByHour);

export default router;