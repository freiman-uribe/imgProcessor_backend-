import AWS from "aws-sdk";
import sharp from "sharp";
import { Buffer } from "buffer";
import moment from "moment-timezone";

import ImageRepositoryImpl from "../../adapters/repositories/ImageRepositoryImpl";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const imageRepository = new ImageRepositoryImpl();

class ImageService {
  static async processImage(userId: string, imageBuffer: Buffer): Promise<any> {
    const pngBuffer = await sharp(imageBuffer).png().toBuffer();
    const imageUrl = await this.uploadToS3(pngBuffer);
    const date = moment.tz("America/Bogota").format('YYYY-MM-DD HH:mm:ss');
    const timestamp = moment.utc(date).toDate();

    const imageData = {
      userId,
      url: imageUrl,
      timestamp,
    };

    return await imageRepository.save(imageData);
  }

  static async uploadToS3(buffer: Buffer): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("AWS_S3_BUCKET_NAME is not defined");
    }

    const params = {
      Bucket: bucketName,
      Key: `images/${Date.now()}.png`,
      Body: buffer,
      ContentType: "image/png",
    };

    const { Location } = await s3.upload(params).promise();
    return Location;
  }

  static async getImagesByDate(startDate: Date, endDate: Date) {
    return await imageRepository.findByDateRange(startDate, endDate);
  }

  static async getImageCountGroupedByHour() {
    return await imageRepository.countImagesGroupedByHour();
  }
}

export default ImageService;