import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "APSRA Astro Admin",
  description: "Premium APSRA Astro administration dashboard",
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        </Providers>
      </body>
    </html>
  );
}
