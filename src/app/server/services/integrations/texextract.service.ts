import {
  TextractClient,
  StartDocumentTextDetectionCommand,
  GetDocumentTextDetectionCommand,
} from "@aws-sdk/client-textract";

export const maxDuration = 60;

export class TextractService {
  private static instance: TextractService;
  private textractClient: TextractClient;
  private bucketName: string;

  // Private constructor to prevent direct instantiation
  private constructor(bucketName: string) {
    this.bucketName = bucketName;
    this.textractClient = new TextractClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  // Static method to get the singleton instance
  public static getInstance(bucketName: string): TextractService {
    if (!TextractService.instance) {
      TextractService.instance = new TextractService(bucketName);
    }
    return TextractService.instance;
  }

  public async extractTextFromS3PDF(objectKey: string): Promise<string> {
    try {
      // Start the Textract document text detection
      const startCommand = new StartDocumentTextDetectionCommand({
        DocumentLocation: {
          S3Object: {
            Bucket: this.bucketName,
            Name: objectKey,
          },
        },
      });

      const startResponse = await this.textractClient.send(startCommand);
      const jobId = startResponse.JobId;

      if (!jobId) {
        throw new Error("Textract failed to start the job.");
      }

      console.log(`Textract Job started: ${jobId}`);

      // Wait for the Textract job to complete and get the result
      return await this.pollForJobCompletion(jobId);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw error;
    }
  }

  private async pollForJobCompletion(jobId: string): Promise<string> {
    let jobStatus = "";
    const pages: string[] = [];

    do {
      console.log("Checking Textract job status...");

      await new Promise((resolve) => setTimeout(resolve, 5000));
      const statusCommand = new GetDocumentTextDetectionCommand({
        JobId: jobId,
      });

      const statusResponse = await this.textractClient.send(statusCommand);
      jobStatus = statusResponse.JobStatus!;

      if (jobStatus === "FAILED") {
        throw new Error("Textract job failed.");
      }

      if (statusResponse.Blocks) {
        const textBlocks = statusResponse.Blocks.filter(
          (block) => block.BlockType === "LINE" && block.Text,
        );

        textBlocks.forEach((block) => {
          pages.push(block.Text!);
        });
      }
    } while (jobStatus !== "SUCCEEDED");

    console.log("Textract job completed successfully.");

    return pages.join("\n");
  }
}
