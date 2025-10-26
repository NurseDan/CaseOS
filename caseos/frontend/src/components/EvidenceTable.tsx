export default function EvidenceTable({ files }: { files: any[] }) {
  return (
    <table className="w-full border mt-3 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Filename</th>
          <th className="border p-2">Type</th>
          <th className="border p-2">Uploader</th>
          <th className="border p-2">Uploaded</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {files.map((f) => (
          <tr key={f.id}>
            <td className="border p-2">{f.filename}</td>
            <td className="border p-2">{f.mime_type}</td>
            <td className="border p-2">{f.uploader}</td>
            <td className="border p-2">{new Date(f.uploaded_at).toLocaleString()}</td>
            <td className="border p-2">{f.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
