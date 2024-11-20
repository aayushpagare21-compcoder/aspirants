import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (
    buffer: Buffer, 
    folder?: string
): Promise<{ secure_url: string; public_id: string }> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    reject(new Error('Failed to upload image'));
                } else if (result) {
                    resolve({
                        secure_url: result.secure_url,
                        public_id: result.public_id,
                    });
                }
            }
        );
        stream.end(buffer);
    });
};

export const getImage = (publicId: string): string => {
    try {
        return cloudinary.url(publicId);
    } catch {
        throw new Error('Failed to get image');
    }
};
