"use client";

import { useState } from "react";
import styles from "../form.module.css";

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
      <main className={styles.successWrapper}>
        <div className={`glass ${styles.successCard}`}>
          <div className={styles.successIcon}>
            ✓
          </div>
          <h1 className={styles.successTitle}>
            You're In!
          </h1>
          <p className={styles.successMessage}>
            Your response has been recorded. Get ready for the waves of SHORE'26!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Unlock the Mystery
          </h1>
          <p className={styles.subtitle}>
            Tell us your wildest dreams for the fest
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* Section 1: Basics */}
          <div className={styles.card}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="entry.1637171628"
                required
                className={styles.input}
                placeholder="John Doe"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="entry.69633790"
                required
                className={styles.input}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Section 2: Vibe Check */}
          <div className={styles.card}>
            <div className={styles.fieldGroup}>
              <label className={styles.questionLabel}>
                If SHORe Fest were a feeling, what would it be?
              </label>
              <div className={styles.grid}>
                {["Wild", "Nostalgic", "Chill", "Electric", "Connected", "Euphoric"].map((option) => (
                  <label key={option} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="entry.1737925053"
                      value={option}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="artist" className={styles.questionLabel}>
                Which artist has the crowd screaming every word?
              </label>
              <input
                type="text"
                id="artist"
                name="entry.1071965879"
                className={styles.input}
                placeholder="e.g. The Weeknd..."
              />
            </div>
          </div>

          {/* Section 3: Experiences */}
          <div className={styles.card}>
            <div className={styles.fieldGroup}>
              <label className={styles.questionLabel}>
                Secret experiences that would make it legendary?
              </label>
              <div className={styles.grid}>
                {[
                  "Interactive Art Installations",
                  "Silent Disco (with a mystery genre?)",
                  "Food Truck Alley with wild, unique eats",
                  "A chill-out zone with hammocks & fairy lights",
                  "Pop-up performances & flash mobs",
                  "Gaming/VR Zone",
                  "Mystery Workshop (e.g., DIY, dance, mixology)"
                ].map((option) => (
                  <label key={option} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="entry.1921250719"
                      value={option}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxText}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: The Big Ideas */}
          <div className={styles.card}>
            <div className={styles.fieldGroup}>
              <label htmlFor="food" className={styles.questionLabel}>
                Must-have festival food or drink?
              </label>
              <input
                type="text"
                id="food"
                name="entry.1828563634"
                className={styles.input}
                placeholder="Be specific!"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="onething" className={styles.questionLabel}>
                One thing to make SHORE'26 the talk of campus?
              </label>
              <textarea
                id="onething"
                name="entry.667833844"
                rows={6}
                className={styles.textarea}
                placeholder="No idea is too big..."
              ></textarea>
            </div>
          </div>

          {/* Section 5: Secret Agent */}
          <div className={styles.card}>
            <label className={styles.questionLabel}>
              Want to be a secret agent for the fest?
            </label>
            <div className={styles.grid}>
              {[
                "Yes! Consider Me in!🥳",
                "Nah! Not This Time, but keep me posted😊"
              ].map((option) => (
                <label key={option} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="entry.709184390"
                    value={option}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Sending..." : "Submit Your Vision"}
          </button>
        </form>
      </div>
    </main>
  );
}
