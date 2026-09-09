import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CourseRelay — Localization Opportunity Desk",
  description: "A rights-first demo for evaluating course localization opportunities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
