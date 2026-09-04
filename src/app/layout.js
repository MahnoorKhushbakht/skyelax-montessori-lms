import "./globals.css";

export const metadata = {
  title: "SKYELAX - Montessori ERP & LMS",
  description: "A modern, multi-tenant Montessori ERP & LMS built for early childhood education tracking, AI pedagogical insights, and offline-first data caching.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-[#] initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}