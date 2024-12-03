import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";

export class S3Service {
  private static instance: S3Service;
  private s3Client: S3Client;
  private bucketName: string;

  private constructor(bucketName: string) {
    this.bucketName = bucketName;
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  static getInstance(bucketName: string): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service(bucketName);
    }
    return S3Service.instance;
  }

  async uploadFile(
    key: string,
    body: Buffer | Readable,
    contentType: string,
  ): Promise<void> {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
      },
    });

    try {
      await upload.done();
      console.log(`File uploaded successfully: ${key}`);
    } catch (error) {
      console.error(`Error uploading file: ${error}`);
      throw error;
    }
  }

  async getFile(key: string): Promise<Readable | undefined> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);

      // Return the readable stream from the S3 response
      return response.Body as Readable;
    } catch (error) {
      console.error(`Error getting file: ${error}`);
      throw error;
    }
  }
}
