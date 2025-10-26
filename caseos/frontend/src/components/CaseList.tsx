"use client";
import { useEffect, useState } from "react";
import { getCases, createCase } from "@/src/lib/api";

export default function CaseList({ onSelect }: { onSelect: (id: number) => void }) {
  const [cases, setCases] = useState<any[]>([]);
  const [name, setName] = useState("");

  const refresh = async () => setCases(await getCases());
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <h2 className="font-semibold mb-2">Cases</h2>
      <div className="flex gap-2 mb-3">
        <input
          className="border px-2 py-1"
          placeholder="New case name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="border px-3"
          onClick={async () => {
            if (!name) return;
            await createCase({ name });
            setName("");
            refresh();
          }}
        >
          Create
        </button>
      </div>
      <ul className="space-y-1">
        {cases.map((c) => (
          <li key={c.id}>
            <button className="underline" onClick={() => onSelect(c.id)}>
              {c.name} · #{c.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
