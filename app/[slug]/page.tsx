"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../slug.module.css";

const SLUG_MESSAGES: Record<string, string> = {
  hi: "Gitphin says hi!",
  excited: "Are you excited for Shore?",
  "coming-soon": "Something big is coming...",
};

export default function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/form");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [slug, router]);

  if (!slug) return null;

  const message = SLUG_MESSAGES[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <div className={`glass ${styles.messageCard}`}>
          <h1 className={styles.title}>
            {message}
          </h1>
          <p className={styles.subtitle}>
            The mystery unfolds in {countdown}s...
          </p>
        </div>

        <button 
          onClick={() => router.push("/form")}
          className={styles.button}
        >
          Get Started Now
        </button>
<div className={`${styles.mascotWrapper}`}>
          <Image
            src="/gitfin.png"
            alt="Gitphin Mascot"
            width={600}
            height={600}
            className={styles.mascot}
            priority
          />
        </div>

      </div>
    </main>
  );
}
