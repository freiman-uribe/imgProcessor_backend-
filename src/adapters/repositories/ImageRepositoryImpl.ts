
import { ImageModel } from "../../domain/models/Image";
import ImageRepository from "../../domain/repositories/ImageRepository";

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
      console.error('🚀 error:', error)
    }
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<any[]> {
    return await ImageModel.find({
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }

  async countImagesGroupedByHour(): Promise<any[]> {
    const result = await ImageModel.aggregate([
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