import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingBookingButton } from "@/components/FloatingBookingButton";

export const metadata: Metadata = {
  title: "Stitch - Luxury Beauty Salon",
  description: "Experience the pinnacle of sophisticated self-care at Stitch. Luxury beauty treatments, skin therapy, hair styling, and personalized massage rituals.",
  keywords: ["Luxury Salon", "Beauty Clinic", "Facial Care", "Hair Styling", "Body Care", "Stitch Salon"],
  authors: [{ name: "Stitch Luxury Salon" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-surface">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <FloatingBookingButton />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
