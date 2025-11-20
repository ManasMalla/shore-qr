"use client";

import { useState } from "react";

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScaSjf33bc8L7uaReF3TGe0JDBc7vlv81qMb2w13g4YM9GUeQ/formResponse";
    
    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="glass p-12 rounded-3xl shadow-2xl max-w-lg w-full animate-fade-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            You're In!
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Your response has been recorded. Get ready for the waves of SHORE'26!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 md:py-24 md:px-8 bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 md:mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Unlock the Mystery
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 font-light">
            Tell us your wildest dreams for the fest
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-12 md:space-y-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          
          {/* Section 1: Basics */}
          <div className="glass p-6 md:p-10 rounded-3xl gap-16 flex flex-col md:space-y-10">
            <div className="space-y-3">
              <label htmlFor="name" className="block text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="entry.1637171628"
                required
                className="glass-input w-full p-4 md:p-5 rounded-2xl text-lg outline-none text-gray-800 placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="entry.69633790"
                required
                className="glass-input w-full p-4 md:p-5 rounded-2xl text-lg outline-none text-gray-800 placeholder-gray-400"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Section 2: Vibe Check */}
          <div className="glass p-6 md:p-10 rounded-3xl space-y-10">
            <div className="space-y-6">
              <label className="block text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                If SHORe Fest were a feeling, what would it be?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {["Wild", "Nostalgic", "Chill", "Electric", "Connected", "Euphoric"].map((option) => (
                  <label key={option} className="relative group flex cursor-pointer">
                    <input
                      type="radio"
                      name="entry.1737925053"
                      value={option}
                      className="peer"
                    />
                    <div className="p-4 md:p-6 rounded-2xl hover:bg-white transition-all peer-checked:border-[var(--shore-teal)] peer-checked:bg-teal-50 peer-checked:text-[var(--shore-teal)] peer-checked:shadow-md text-center font-medium text-gray-600 text-lg w-max">
                      {option}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label htmlFor="artist" className="block text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                Which artist has the crowd screaming every word?
              </label>
              <input
                type="text"
                id="artist"
                name="entry.1071965879"
                className="glass-input w-full p-4 md:p-5 rounded-2xl text-lg outline-none text-gray-800 placeholder-gray-400"
                placeholder="e.g. The Weeknd, Taylor Swift..."
              />
            </div>
          </div>

          {/* Section 3: Experiences */}
          <div className="glass p-6 md:p-10 rounded-3xl space-y-10">
            <div className="space-y-6">
              <label className="block text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                Secret experiences that would make it legendary?
              </label>
              <div className="space-y-4">
                {[
                  "Interactive Art Installations",
                  "Silent Disco (with a mystery genre?)",
                  "Food Truck Alley with wild, unique eats",
                  "A chill-out zone with hammocks & fairy lights",
                  "Pop-up performances & flash mobs",
                  "Gaming/VR Zone",
                  "Mystery Workshop (e.g., DIY, dance, mixology)"
                ].map((option) => (
                  <label key={option} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/50 transition-colors cursor-pointer active:bg-white/80">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        name="entry.1921250719"
                        value={option}
                        className="w-6 h-6 text-[var(--shore-teal)] rounded-lg border-gray-300 focus:ring-[var(--shore-teal)]"
                      />
                    </div>
                    <span className="text-lg text-gray-700 leading-snug">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: The Big Ideas */}
          <div className="glass p-6 md:p-10 rounded-3xl space-y-10">
            <div className="space-y-6">
              <label htmlFor="food" className="block text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                Must-have festival food or drink?
              </label>
              <input
                type="text"
                id="food"
                name="entry.1828563634"
                className="glass-input w-full p-4 md:p-5 rounded-2xl text-lg outline-none text-gray-800 placeholder-gray-400"
                placeholder="Be specific!"
              />
            </div>

            <div className="space-y-6">
              <label htmlFor="onething" className="block text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                One thing to make SHORE'26 the talk of campus?
              </label>
              <textarea
                id="onething"
                name="entry.667833844"
                rows={5}
                className="glass-input w-full p-4 md:p-5 rounded-2xl text-lg outline-none text-gray-800 placeholder-gray-400 resize-none leading-relaxed"
                placeholder="No idea is too big..."
              ></textarea>
            </div>
          </div>

          {/* Section 5: Secret Agent */}
          <div className="glass p-6 md:p-10 rounded-3xl space-y-8">
            <label className="block text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
              Want to be a secret agent for the fest?
            </label>
            <div className="space-y-4">
              {[
                "Yes! Consider Me in!🥳",
                "Nah! Not This Time, but keep me posted😊"
              ].map((option) => (
                <label key={option} className="flex items-center space-x-4 p-5 rounded-2xl border border-transparent bg-white/30 hover:bg-white/60 hover:border-gray-200 transition-all cursor-pointer shadow-sm">
                  <input
                    type="radio"
                    name="entry.709184390"
                    value={option}
                    className="w-6 h-6 text-[var(--shore-teal)] focus:ring-[var(--shore-teal)]"
                  />
                  <span className="text-lg text-gray-800 font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-gradient-to-r from-[var(--shore-teal)] to-[var(--shore-ocean)] text-white text-xl md:text-2xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mb-12"
          >
            {loading ? "Sending..." : "Submit Your Vision"}
          </button>
        </form>
      </div>
    </main>
  );
}
