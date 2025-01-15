import AWS from "aws-sdk";
import sharp from "sharp";
import { Buffer } from "buffer";
import moment from "moment-timezone";
import ImageRepositoryImpl from "../../adapters/repositories/ImageRepositoryImpl";
import { uploadToS3 } from "../../utils/s3Utils";

const imageRepository = new ImageRepositoryImpl();

class ImageService {
  static async processImage(userId: string, imageBuffer: Buffer): Promise<any> {
    const pngBuffer = await sharp(imageBuffer).png().toBuffer();
    const imageUrl = await uploadToS3(pngBuffer);
    const date = moment.tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
    const timestamp = moment.utc(date).toDate();

    const imageData = {
      userId,
      url: imageUrl,
      timestamp,
    };

    return await imageRepository.save(imageData);
  }

  static async getImagesByDate(startDate: Date, endDate: Date) {
    return await imageRepository.findByDateRange(startDate, endDate);
  }

  static async getImageCountGroupedByHour(startDate: Date, endDate: Date) {
    return await imageRepository.countImagesGroupedByHour(startDate, endDate);
  }
}

export default ImageService;