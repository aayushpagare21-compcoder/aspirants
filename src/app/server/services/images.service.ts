import sharp from "sharp";

export async function mergeImagesVertically(
  imageBuffers: Buffer[],
): Promise<Buffer> {
  try {
    // Get metadata of all images to calculate the final image height
    const metadataPromises = imageBuffers.map((buffer) =>
      sharp(buffer).metadata(),
    );
    const metadata = await Promise.all(metadataPromises);
    // Calculate the total height and max width of the final image
    const totalHeight = metadata.reduce(
      (sum, { height }) => sum + (height || 0),
      0,
    );
    const maxWidth = Math.max(...metadata.map(({ width }) => width || 0));
    // Create a blank image with the calculated dimensions
    let yOffset = 0;
    const compositeImages = imageBuffers.map((buffer, index) => {
      const { height = 0 } = metadata[index];
      const image = { input: buffer, top: yOffset, left: 0 };
      yOffset += height;
      return image;
    });
    const finalImageBuffer = await sharp({
      create: {
        width: maxWidth,
        height: totalHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    })
      .composite(compositeImages)
      .png()
      .toBuffer();

    return finalImageBuffer;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    throw new Error("Failed to merge images");
  }
}
