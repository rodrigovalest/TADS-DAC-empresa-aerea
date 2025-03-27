import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full" cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
