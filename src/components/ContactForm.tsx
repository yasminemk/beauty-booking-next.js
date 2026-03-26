"use client";

import { useRef, useState } from "react";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-5 h-full"
      onSubmit={async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setIsSuccess(false);
        setErrorMessage(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          instagramHandle: String(formData.get("instagramHandle") ?? ""),
          message: String(formData.get("message") ?? ""),
          company: String(formData.get("company") ?? ""),
        };

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = (await response.json().catch(() => null)) as
            | { ok?: boolean; error?: string }
            | null;

          if (!response.ok || !data?.ok) {
            setErrorMessage(data?.error || "Something went wrong. Please try again.");
            setIsSubmitting(false);
            return;
          }

          setIsSuccess(true);
          formRef.current?.reset();
        } catch {
          setErrorMessage("Something went wrong. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden" aria-hidden>
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            className="w-full bg-white border border-gray-200 rounded-[var(--radius)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className="w-full bg-white border border-gray-200 rounded-[var(--radius)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="instagramHandle">
          Instagram handle (optional)
        </label>
        <input
          id="instagramHandle"
          name="instagramHandle"
          type="text"
          maxLength={60}
          className="w-full bg-white border border-gray-200 rounded-[var(--radius)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="message">
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={8}
          maxLength={2000}
          className="w-full bg-white border border-gray-200 rounded-[var(--radius)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 resize-y min-h-[240px] md:min-h-[320px] flex-1"
        />
      </div>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
      {isSuccess ? <p className="text-sm text-green-700">Thanks — we’ve received your message.</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white w-full py-4 rounded-[var(--radius)] font-medium hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
