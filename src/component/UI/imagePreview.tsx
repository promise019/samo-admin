import { useState } from "react";

export default function ImagePreview() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-4 w-full">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border border-gray-100 p-3"
      />

      {preview && (
        <img
          src={preview}
          alt="Selected preview"
          className="w-48 h-48 object-cover rounded-md"
        />
      )}
    </div>
  );
}
