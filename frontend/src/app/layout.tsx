"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className="w-full h-full" cz-shortcut-listen="true">
            {children}
          </body>
        </html>
      </QueryClientProvider>
    </>
  );
}
