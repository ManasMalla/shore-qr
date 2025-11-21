"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";

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
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Shore Mystery
          </h1>
          <p className={styles.subtitle}>
            Scan the code to unlock the secret
          </p>
        </div>

        <div className={`glass ${styles.scannerCard}`}>
          <div id="reader" className={styles.scannerWrapper}></div>
        </div>

        {scanResult && (
          <div className={styles.successMessage}>
            Redirecting you to the mystery...
          </div>
        )}
      </div>
    </main>
  );
}
