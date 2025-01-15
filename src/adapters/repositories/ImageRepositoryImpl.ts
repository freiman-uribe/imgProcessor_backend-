
import { ImageModel } from "../../domain/models/Image";
import ImageRepository from "../../domain/repositories/ImageRepository";
import { UserInterface } from "../../infrastructure/types/index";

class ImageRepositoryImpl extends ImageRepository {
  async save(imageData: {
    userId: string;
    url: string;
    timestamp: Date;
  }): Promise<any> {
    try {
      const newImage = new ImageModel(imageData);
      const result = await newImage.save();
      return result;
    } catch (error) {
      console.error("🚀 error:", error);
    }
  }
  async findByDateRange(startDate: Date, endDate: Date): Promise<any[]> {
    const images = await ImageModel.find({
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("userId", "name");

    return images.map((image) => {
      const imageObject = image.toObject();
      const user = imageObject.userId as unknown as UserInterface;
      const { userId, ...rest } = imageObject;
      return {
        ...rest,
        name: user.name,
      };
    });
  }

  async countImagesGroupedByHour(
    startDate: Date,
    endDate: Date
  ): Promise<any> {
    const result = await ImageModel.aggregate([
      {
        $match: {
          timestamp: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $hour: "$timestamp" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          Hora: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    return result;
  }
}

export default ImageRepositoryImpl;