import { useState, useRef, useEffect } from "react";
import "./ImageUploader.css"; // Import the styles below
interface ImageUploaderProps {
  onChange: (file: File) => void;
  defaultValue?: string;
}

export default function ImageUploader({
  onChange,
  defaultValue,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
    }
  }, [defaultValue]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      e.target.files && e.target.files.length > 0 ? e.target.files[0] : "";
    if (file) {
      const previewUrl = URL.createObjectURL(file)!;
      setPreview(previewUrl);

      if (onChange) onChange(file);
    }
  };

  const handleContainerClick = () => {
    if (preview) {
      setPreview(undefined);
      return;
    }
    fileInputRef.current?.click();
  };
 
  return (
    <div className="upload-container" onClick={handleContainerClick}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        id="image"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div className="upload-area">
        {preview ? (
          <img src={preview} alt="Profile Preview" className="preview-image" />
        ) : (
          <div className="upload-placeholder">
            <img src="/assets/uploadicon.png" alt="upload icon" />
          </div>
        )}
      </div>
    </div>
  );
}
