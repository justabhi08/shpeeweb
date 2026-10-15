"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? "Please try again.");
      if (response.ok) form.reset();
    } catch {
      setMessage("Unable to send your message right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-two-cols">
        <input name="name" placeholder="Name *" minLength={2} required />
        <input name="email" type="email" placeholder="Email *" required />
      </div>
      <input name="phone" type="tel" placeholder="Phone number *" minLength={7} required />
      <textarea name="message" placeholder="Message" rows={8} minLength={5} required />
      <button className="primary-button" type="submit" disabled={loading}>{loading ? "SENDING..." : "SEND"} <Send size={17} /></button>
      {message ? <p className="form-response">{message}</p> : null}
    </form>
  );
}
