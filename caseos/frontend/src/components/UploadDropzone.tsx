"use client";
import { useState } from "react";
import { uploadFile } from "@/src/lib/api";

export default function UploadDropzone({ caseId, onUploaded }: { caseId: number; onUploaded: () => void }) {
  const [busy, setBusy] = useState(false);

  return (
    <div className="border p-3">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget as HTMLFormElement);
          setBusy(true);
          await uploadFile(caseId, form);
          setBusy(false);
          onUploaded();
          (e.currentTarget as HTMLFormElement).reset();
        }}
      >
        <input type="file" name="upload" required />
        <input type="text" name="uploader" placeholder="Your name (optional)" className="border mx-2 px-1" />
        <input type="text" name="source_note" placeholder="Source note" className="border mx-2 px-1" />
        <button className="border px-3" disabled={busy}>
          {busy ? "Uploading…" : "Upload"}
        </button>
      </form>
    </div>
  );
}
