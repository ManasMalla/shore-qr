"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { use } from "react";

// Map slugs to specific messages
const SLUG_MESSAGES: Record<string, string> = {
  "hi": "Gitphin says hi!",
  "excited": "Gitphin says Excited for Shore!",
  "coming-soon": "Gitphin says \"ShoRe coming soon\"",
};

export default function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [timeLeft, setTimeLeft] = useState(10);

  // Determine message: use mapped message or fallback to decoding the slug
  const message = SLUG_MESSAGES[slug] || decodeURIComponent(slug).replace(/-/g, " ");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/form");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[var(--shore-light)] to-[var(--shore-sand)]">
      <div className="animate-float mb-8">
        <Image
          src="/gitphin.jpg"
          alt="Gitphin Mascot"
          width={300}
          height={300}
          className="rounded-full shadow-2xl border-4 border-[var(--shore-teal)]"
          priority
        />
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-[var(--shore-dark)] mb-6 animate-fade-in">
        {message}
      </h1>

      <p className="text-lg text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        Redirecting to the mystery form in {timeLeft}s...
      </p>

      <button
        onClick={() => router.push("/form")}
        className="px-8 py-4 bg-[var(--shore-teal)] text-white text-xl font-bold rounded-full shadow-lg hover:bg-[var(--shore-ocean)] transition-transform hover:scale-105 active:scale-95 animate-fade-in"
        style={{ animationDelay: "1s" }}
      >
        Get Started Now
      </button>
    </main>
  );
}
