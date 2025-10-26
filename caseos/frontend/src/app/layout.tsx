import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "CaseOS · Module 1",
  description: "Evidence intake and management",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
