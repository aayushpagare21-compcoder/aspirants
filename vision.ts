import AWS from "aws-sdk";

// Initialize the Amazon Textract client
const textract = new AWS.Textract({ region: "us-east-1" });

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const params = {
    Document: {
      Bytes: buffer,
    },
  };

  try {
    const data = await textract.detectDocumentText(params).promise();
    const extractedText =
      data.Blocks?.filter((block) => block.BlockType === "LINE")
        .map((block) => block.Text)
        .join("\n") || "";

    return extractedText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

export default extractTextFromPDF;
