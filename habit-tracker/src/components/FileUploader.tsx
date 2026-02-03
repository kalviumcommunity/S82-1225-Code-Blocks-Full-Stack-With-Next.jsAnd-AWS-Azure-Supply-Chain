"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FileUploader() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    // ✅ Validation
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("Only PNG or JPEG allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max file size is 2MB");
      return;
    }

    try {
      setUploading(true);

      // 1️⃣ Get presigned URL
      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const { uploadUrl } = await res.json();

      // 2️⃣ Upload directly to S3
      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      toast.success("File uploaded successfully!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
      />

      {uploading && <p>Uploading...</p>}
    </div>
  );
}
