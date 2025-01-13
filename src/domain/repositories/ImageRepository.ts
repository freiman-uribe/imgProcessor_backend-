export default class ImageRepository {
  async saveImage(userId: string, url: string, timestamp: Date): Promise<any> {
    throw new Error("Method not implemented");
  }

  async findImagesBetweenDates(startDate: Date, endDate: Date): Promise<any> {
    throw new Error("Method not implemented");
  }

  async countImagesGroupedByHour(): Promise<any> {
    throw new Error("Method not implemented");
  }
}