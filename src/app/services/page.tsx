// Libraries
import { siteContent } from "@/config/siteContent";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

// Metadata & tagging
export const metadata: Metadata = {
  title: "Services",
  description: "Browse brow and makeup services at LKSTUDIOUK in Salford, Manchester.",
  openGraph: {
    title: "Services",
    description: "Browse brow and makeup services at LKSTUDIOUK in Salford, Manchester.",
    url: "/services",
  },
};

// Main Content
export default function ServicesPage() {
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
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Our Services</h1>
            <p className="text-white/80 text-lg mb-8">
              Explore our range of treatments designed to enhance your natural beauty.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-white/80 font-medium">Please read our policies before booking</p>
              <div className="flex gap-4">
                <Link
                  href="/policies"
                  className="bg-white text-black border border-white px-8 py-3 rounded-[var(--radius)] font-medium hover:bg-white/90 transition-all"
                >
                  Read Policies
                </Link>
                <Link
                  href="/book"
                  className="bg-white text-black border border-white px-8 py-3 rounded-[var(--radius)] font-medium hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {siteContent.services.map((category) => (
            <div key={category.id} id={category.id} className="space-y-8 scroll-mt-28">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-3xl font-serif font-medium">{category.title}</h2>
                <p className="text-gray-500 mt-2">{category.description}</p>
              </div>

              {category.note && (
                <p className="text-sm text-gray-400 italic bg-gray-50 p-3 rounded-lg inline-block">
                  {category.note}
                </p>
              )}

              <div className={category.id === "makeup" ? "space-y-10" : "space-y-6"}>
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-dashed border-gray-200 last:border-0 hover:bg-gray-50 transition-colors px-4 rounded-lg -mx-4"
                  >
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      {item.description && (
                        <p className="text-gray-500 text-sm mt-1 max-w-md">{item.description}</p>
                      )}
                      <div className="flex items-center text-gray-400 text-sm mt-2">
                        {item.duration && (
                          <>
                            <Clock size={14} className="mr-1.5" />
                            <span>{item.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                      <span className="font-medium text-lg">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          <div className="max-w-4xl mx-auto bg-white/90 border border-white/20 backdrop-blur-sm rounded-[var(--radius-card)] p-8 md:p-16 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Ready to book?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Secure your appointment today. A deposit is required for all bookings.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center bg-white text-black border border-white px-8 py-4 rounded-[var(--radius)] font-medium hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
