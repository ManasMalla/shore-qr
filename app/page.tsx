"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";

export default function Home() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
        
        try {
            const url = new URL(decodedText);
            if (decodedText.startsWith("http")) {
                const path = url.pathname;
                if (path && path !== "/") {
                    router.push(path);
                } else {
                     const slug = path.split('/').pop();
                     if(slug) router.push(`/${slug}`);
                }
            } else {
                router.push(`/${decodedText}`);
            }
        } catch (e) {
            router.push(`/${decodedText}`);
        }
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear html5-qrcode scanner. ", error);
      });
    };
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-2xl w-full space-y-12">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--shore-teal)] to-[var(--shore-ocean)] tracking-tight">
            Shore Mystery
          </h1>
          <p className="text-xl text-gray-500 font-light tracking-wide">
            Scan the code to unlock the secret
          </p>
        </div>

        <div className="glass p-8 rounded-3xl shadow-2xl mx-auto max-w-md w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div id="reader" className="w-full overflow-hidden rounded-2xl border-2 border-gray-100"></div>
        </div>

        {scanResult && (
          <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 animate-fade-in">
            Redirecting you to the mystery...
          </div>
        )}
      </div>
    </main>
  );
}
