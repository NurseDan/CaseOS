"use client";
import { useEffect, useState } from "react";
import CaseList from "@/src/components/CaseList";
import UploadDropzone from "@/src/components/UploadDropzone";
import EvidenceTable from "@/src/components/EvidenceTable";
import { getFiles } from "@/src/lib/api";

export default function Home() {
  const [caseId, setCaseId] = useState<number | undefined>(undefined);
  const [files, setFiles] = useState<any[]>([]);
  const load = async (id: number) => setFiles(await getFiles(id));

  useEffect(() => {
    if (caseId) load(caseId);
  }, [caseId]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">CaseOS · Module 1 (Evidence Intake)</h1>
      <CaseList onSelect={(id) => setCaseId(id)} />
      {caseId && (
        <section className="mt-4">
          <h2 className="font-semibold mb-2">Case #{caseId}</h2>
          <UploadDropzone caseId={caseId} onUploaded={() => load(caseId)} />
          <EvidenceTable files={files} />
        </section>
      )}
    </main>
  );
}
