const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export async function getCases() {
  const res = await fetch(`${BASE}/cases`, { cache: "no-store" });
  return res.json();
}

export async function createCase(payload: { name: string; case_type?: string }) {
  const res = await fetch(`${BASE}/cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getFiles(caseId: number) {
  const res = await fetch(`${BASE}/cases/${caseId}/files`, { cache: "no-store" });
  return res.json();
}

export async function uploadFile(caseId: number, form: FormData) {
  const res = await fetch(`${BASE}/cases/${caseId}/files`, { method: "POST", body: form });
  return res.json();
}
