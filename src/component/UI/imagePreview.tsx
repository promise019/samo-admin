import { useEffect, useState } from "react";

interface ImagePreviewProps {
  image: File | null;
  onChange: (file: File | null) => void;
}

export default function ImagePreview({ image, onChange }: ImagePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onChange(file);
        }}
      />

      {preview && (
        <div className="relative w-40">
          <img src={preview} alt="Preview" className="rounded-md border" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 rounded"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
