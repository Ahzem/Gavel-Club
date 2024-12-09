import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  currentImage?: string;
}

export function ImageUpload({ onImageChange, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      onImageChange(file);
      setPreview(URL.createObjectURL(file));
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="image-upload">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`image-upload__dropzone ${
            isDragActive ? "image-upload__dropzone--active" : ""
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="image-upload__icon" />
          <p>Drag & drop an image here, or click to select</p>
          <span className="image-upload__hint">
            Supported formats: JPEG, PNG, WebP
          </span>
        </div>
      ) : (
        <div className="image-upload__preview">
          <img src={preview} alt="Preview" />
          <button
            title="Remove image"
            type="button"
            onClick={handleRemove}
            className="image-upload__remove"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
