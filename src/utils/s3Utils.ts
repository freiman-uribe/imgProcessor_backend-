import AWS from "aws-sdk";
import { Buffer } from "buffer";

require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadToS3(buffer: Buffer): Promise<string> {
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
