"use client";
import { useEffect, useState } from "react";
import CaseList from "@/src/components/CaseList";
import { getFiles } from "@/src/lib/api";
import EvidenceTable from "@/src/components/EvidenceTable";

export default function CasesPage() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (selected) {
      getFiles(selected).then(setFiles);
    }
  }, [selected]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Cases</h1>
      <CaseList onSelect={(id) => setSelected(id)} />
      {selected && (
        <section>
          <h2 className="font-semibold">Evidence for Case #{selected}</h2>
          <EvidenceTable files={files} />
        </section>
      )}
    </main>
  );
}
