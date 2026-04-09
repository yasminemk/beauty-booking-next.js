// Imports/libraries
import { siteContent } from "@/config/siteContent";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

// Metadata & tagging
export const metadata: Metadata = {
  title: "Our Policies",
  description: "Read our booking policies before securing your appointment.",
  openGraph: {
    title: "Our Policies",
    description: "Read our booking policies before securing your appointment.",
    url: "/policies",
  },
};

// Main Content
export default function PoliciesPage() {
  const { intro, items, outroTitle, outroText, agreementText } = siteContent.policies;

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
    <div className="w-full">
      <section className="relative isolate w-full overflow-hidden">
        <Image
          src="/images/grouppic1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_95%]"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center text-white">Our Policies</h1>
            <p className="text-white/80 text-lg text-center leading-relaxed">
              {intro}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/book"
                className="bg-white text-black border border-white px-8 py-3 rounded-[var(--radius)] font-medium hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-14 pb-20 md:pt-20 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {items.map((policy, index) => (
              <details
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
              {policy.title === "Prep For Your Appointment" ? (
                <summary className="list-none cursor-pointer pt-3 pb-10">
                  <div className="flex items-center justify-center gap-3 text-gray-900">
                    <h2 className="text-2xl font-serif font-medium text-center">{policy.title}</h2>
                    <span aria-hidden className="text-gray-400 text-lg leading-none">
                      ⌄
                    </span>
                  </div>
                </summary>
              ) : (
                <summary className="list-none cursor-pointer py-6 flex items-center justify-between gap-6">
                  <h2 className="text-2xl font-serif font-medium">{policy.title}</h2>
                  <span aria-hidden className="text-gray-400 shrink-0 text-lg leading-none">
                    ⌄
                  </span>
                </summary>
              )}

              <div className={policy.title === "Prep For Your Appointment" ? "pt-4 pb-1" : "pb-3"}>
                {policy.title === "Prep For Your Appointment" ? (
                  <div className="text-gray-600 leading-relaxed">
                    {(() => {
                      const parts = policy.content.split("\n- ");
                      const introText = parts[0];
                      const listItems = parts.slice(1);

                      return (
                        <>
                          <p className="mb-6">{renderWithContactLink(introText)}</p>
                          <ul className="space-y-4">
                            {listItems.map((item, i) => (
                              <li key={i} className="flex items-start group">
                                <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300" />
                                <span>{renderWithContactLink(item)}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {renderWithContactLink(policy.content)}
                  </div>
                )}
              </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <section className="relative isolate w-full overflow-hidden">
        <Image
          src="/images/grouppic1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_95%]"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-medium mb-4 text-white">{outroTitle}</h3>
            <p className="text-white/80 text-sm mb-12 max-w-2xl mx-auto">
              {outroText}
            </p>
            
            <p className="font-bold text-lg text-white">
              {agreementText}
            </p>
            <div className="mt-8">
              <Link
                href="/book"
                className="inline-flex items-center bg-white text-black border border-white px-8 py-4 rounded-[var(--radius)] font-medium hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
