import React, { useRef, useState } from "react";
import { Input } from "../../ui/input";
import UploadIcon from "../Logo/UploadLogo";

type PDFUploaderProps = {
  onUpload: (file: File | null) => void;
  maxFileSize: number;
};

type Status = "idle" | "error" | "success" | "loading";

const getStatusMessage = (
  status: Status,
  error: string | null,
): React.ReactElement => {
  const messages: Record<Status, React.ReactElement> = {
    idle: <p> </p>,
    error: (
      <p className="text-red-500">
        {" "}
        {error ?? "An error occurred while uploading the file."}{" "}
      </p>
    ),
    success: <p className="text-green-500"> PDF uploaded successfully. </p>,
    loading: <p> Uploading PDF... </p>,
  };
  return messages[status];
};

const PDFUploader: React.FC<PDFUploaderProps> = ({ onUpload, maxFileSize }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const validateAndPrepareFile = (file: File): boolean => {
    if (file.type !== "application/pdf") {
      setStatus("error");
      setError("Only PDF files are allowed.");
      return false;
    }

    if (file.size > maxFileSize) {
      setStatus("error");
      setError(`File size must be less than ${maxFileSize / 1024 / 1024}MB.`);
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (validateAndPrepareFile(selectedFile)) {
      setPreview(URL.createObjectURL(selectedFile));
      setStatus("success");
      setError(null);
      onUpload(selectedFile);
    } else {
      setPreview(null);
      onUpload(null);
    }
  };

  const handleRemoveFile = () => {
    setPreview(null);
    setStatus("idle");
    setError(null);
    onUpload(null);
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <div className="pdf-uploader w-full">
      {!preview && (
        <div
          className="mb-2 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted p-6 text-center text-muted-foreground"
          onClick={handleClick}
        >
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            id="pdf-upload-input"
            className="hidden"
            ref={inputRef}
            name="answer_pdf"
          />
          <UploadIcon />
          <i className="font-bold"> Please upload pdf of your answer.</i>
        </div>
      )}
      <i className="text-center">{getStatusMessage(status, error)}</i>

      {preview && (
        <div className="preview-container mt-4 flex flex-col items-center gap-2">
          <embed
            src={preview}
            type="application/pdf"
            className="h-48 w-full max-w-md rounded border"
          />
          <button
            onClick={handleRemoveFile}
            className="rounded bg-red-500 px-4 py-2 text-sm text-white"
          >
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
