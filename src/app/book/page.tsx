import { siteContent } from "@/config/siteContent";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book",
  description: "Book your appointment with LKSTUDIOUK.",
  openGraph: {
    title: "Book",
    description: "Book your appointment with LKSTUDIOUK.",
    url: "/book",
  },
};

export default function BookPage() {
  const renderWithContactLink = (text: string) => {
    const parts = text.split(/(contact us)/gi);
    return parts.map((part, i) => {
      if (/^contact us$/i.test(part)) {
        return (
          <Link
            key={`contact-${i}`}
            href="/contact"
            className="underline decoration-gray-300 underline-offset-4 hover:decoration-black transition-all"
          >
            {part}
          </Link>
        );
      }
      return <span key={`text-${i}`}>{part}</span>;
    });
  };

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Book an Appointment</h1>
          <p className="text-gray-500 text-lg mb-8">
            We look forward to welcoming you to {siteContent.brandName}.
          </p>
          <p className="font-medium">
            By choosing to book with us, you are agreeing to all of the{" "}
            <Link
              href="/policies"
              className="underline decoration-gray-300 underline-offset-4 hover:decoration-black transition-all"
            >
              policies
            </Link>
            .
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-6 md:p-10">
          <div className="bg-white rounded-[var(--radius)] p-6 md:p-8 shadow-sm">
            {/* SETMORE_EMBED_CODE_HERE */}
            <div className="min-h-[560px] w-full rounded-[var(--radius)] border border-dashed border-gray-200 bg-gray-50/40 flex items-center justify-center">
              <p className="text-sm text-gray-400 text-center px-6">
                Setmore booking embed will appear here.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href={siteContent.setmoreBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center bg-black text-white px-8 py-4 rounded-[var(--radius)] text-lg font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Open booking in a new tab
            </a>
          </div>
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">FAQ</h2>
          <div className="space-y-4">
            {siteContent.bookingFaq.map((item, index) => (
              <details key={index} className="border-b border-gray-100 last:border-0">
                <summary className="list-none cursor-pointer py-5 flex items-center justify-between gap-6">
                  <h3 className="text-lg font-medium">{item.question}</h3>
                  <span aria-hidden className="text-gray-400 shrink-0 text-lg leading-none">
                    ⌄
                  </span>
                </summary>
                <div className="pb-5 text-gray-600 leading-relaxed whitespace-pre-line">
                  {renderWithContactLink(item.answer)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
