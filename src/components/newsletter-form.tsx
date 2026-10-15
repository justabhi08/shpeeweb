"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? (response.ok ? "Subscribed successfully." : "Please try again."));
      if (response.ok) setEmail("");
    } catch {
      setMessage("Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <div className="newsletter-input-wrap">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your e-mail"
          aria-label="Email address"
          required
        />
        <button type="submit" aria-label="Subscribe" disabled={loading}>
          <ArrowRight size={20} />
        </button>
      </div>
      {message ? <p className="form-note">{message}</p> : null}
    </form>
  );
}
