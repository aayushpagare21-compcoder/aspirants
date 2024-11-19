import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "../../ui/input";
import UploadIcon from "../Logo/UploadLogo";

type ImageUploaderProps = {
  onUpload: (files: File[]) => void;
  maxFileSize?: number; // Max file size in bytes
  maxNumberOfImages?: number; // Max number of images allowed
};

type Status = "idle" | "error" | "success" | "loading";

const getStatusMessage = (status: Status, error: string | null): string => {
  const messages: Record<Status, string> = {
    idle: "Please upload images of your answers.",
    error: error ?? "An error occurred while uploading images.",
    success: "All images uploaded successfully.",
    loading: "Uploading images...",
  };
  return messages[status];
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  maxFileSize = 1024 * 1024 * 5, // Default 5MB
  maxNumberOfImages = 3, // Default 3 images
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isMaxLimitReached = images.length >= maxNumberOfImages;

    if (inputRef.current) {
      inputRef.current.disabled = isMaxLimitReached;
    }

    setStatus(isMaxLimitReached ? "success" : "idle");
  }, [images, maxNumberOfImages]);

  const validateAndPrepareFiles = (
    files: FileList,
  ): { validFiles: File[]; validPreviews: string[] } => {
    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") && file.size <= maxFileSize) {
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      } else {
        setStatus("error");
        setError(
          `Only image files less than ${maxFileSize / 1024 / 1024}MB are allowed.`,
        );
      }
    });

    return { validFiles, validPreviews };
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const { validFiles, validPreviews } = validateAndPrepareFiles(files);

    const newImages = [...images, ...validFiles].slice(0, maxNumberOfImages);
    const newPreviews = [...previews, ...validPreviews].slice(
      0,
      maxNumberOfImages,
    );

    setImages(newImages);
    setPreviews(newPreviews);
    onUpload(newImages);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <div className="image-uploader w-full">
      <div
        className="mb-2 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted p-6 text-center text-muted-foreground"
        onClick={handleClick}
      >
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          id="image-upload-input"
          className="hidden"
          ref={inputRef}
        />
        <UploadIcon />
        <div>{getStatusMessage(status, error)}</div>
      </div>

      <div className="preview-container mt-4 flex flex-wrap gap-4">
        {previews.map((src, index) => (
          <div key={index} className="relative">
            <Image
              src={src}
              alt={`Preview ${index + 1}`}
              width={40}
              height={40}
              className="rounded border object-cover"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-xs text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
