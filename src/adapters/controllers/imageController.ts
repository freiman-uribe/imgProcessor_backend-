import { Request, Response } from "express";
import imageService from "../../application/services/imageService";
import { UserInterface } from "../../infrastructure/types/index";

interface AuthRequest extends Request {
  user?: UserInterface;
  file?: Express.Multer.File;
}

class ImageController {
  static async uploadImage(req: AuthRequest, res: Response): Promise<any> {
    try {
      if (!req.user || !req.user.id || !req.file) {
        return res.status(400).send("Usuario o archivo no proporcionado");
      }
      const userId = req.user.id.toString();
      const imageUrl = await imageService.processImage(userId, req.file.buffer);
      res.status(201).json({ url: imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al procesar la imagen");
    }
  }

  static async getImagesByDate(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;
    try {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      end.setUTCHours(23, 59, 59, 999);

      const images = await imageService.getImagesByDate(start, end);
      res.json(images);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al obtener las imágenes");
    }
  }

  static async getImagesGroupedByHour(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const groupedImages = await imageService.getImageCountGroupedByHour();
      res.json(groupedImages);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Error al obtener la cantidad de imágenes procesadas");
    }
  }
}

export default ImageController;