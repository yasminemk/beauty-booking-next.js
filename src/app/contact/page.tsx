"use client";

import { siteContent } from "@/content/siteContent";
import { Mail, MapPin, Instagram } from "lucide-react";
import { useRef, useState } from "react";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="md:col-start-1 md:row-start-1">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Contact Us</h1>
          <p className="text-gray-500 text-lg mb-12 max-w-md">
            We'd love to hear from you. Whether you have a question about our services or need help booking, our team is here to assist.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-6 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-500">{siteContent.contact.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-6 shrink-0">
                <Instagram size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Instagram</h3>
                <p className="text-gray-500">{siteContent.contact.instagram}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-6 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-gray-500">{siteContent.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-[var(--radius)] p-8 md:p-12 md:col-start-2 md:row-start-1 md:row-span-2 h-full">
          <h2 className="text-2xl font-serif font-bold mb-6">Send a message</h2>

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
                phone: String(formData.get("phone") ?? ""),
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
              <label className="text-sm font-medium" htmlFor="phone">
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={30}
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
                className="w-full bg-white border border-gray-200 rounded-[var(--radius)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 resize-none min-h-[240px] md:min-h-[320px] flex-1"
              />
            </div>

            {errorMessage ? (
              <p className="text-sm text-red-600">{errorMessage}</p>
            ) : null}
            {isSuccess ? (
              <p className="text-sm text-green-700">Thanks — we’ve received your message.</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white w-full py-4 rounded-[var(--radius)] font-medium hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-[var(--radius)] p-4 md:p-6 h-[420px] md:col-start-1 md:row-start-2">
          <iframe
            title="Map of Greater Manchester (M7)"
            className="w-full h-full bg-white rounded-[var(--radius)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=M7%20Salford%20Greater%20Manchester&output=embed"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
