"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UploadDropzone from "@/src/components/UploadDropzone";
import EvidenceTable from "@/src/components/EvidenceTable";
import { getFiles } from "@/src/lib/api";

export default function CaseDetailPage() {
  const params = useParams<{ id: string }>();
  const caseId = Number(params?.id);
  const [files, setFiles] = useState<any[]>([]);

  const reload = async () => {
    if (!Number.isFinite(caseId)) return;
    const data = await getFiles(caseId);
    setFiles(data);
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  if (!Number.isFinite(caseId)) {
    return <main className="p-6">Invalid case id.</main>;
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Case #{caseId}</h1>
      <UploadDropzone caseId={caseId} onUploaded={reload} />
      <EvidenceTable files={files} />
    </main>
  );
}
