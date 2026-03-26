import Link from "next/link";
import { siteContent, ServiceCategory, Testimonial } from "@/config/siteContent";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Makeup artist and brow specialist in Salford, Manchester (M7).",
  openGraph: {
    title: "LKSTUDIOUK",
    description: "Makeup artist and brow specialist in Salford, Manchester (M7).",
    url: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteContent.brandName,
    description: "Makeup artist and brow specialist in Salford, Manchester (M7).",
    areaServed: "Salford, Manchester, M7",
    serviceType: ["Makeup Artist", "Brow Specialist"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salford",
      addressRegion: "Manchester",
      postalCode: "M7",
      addressCountry: "GB",
    },
    url: siteContent.siteUrl,
    bookingUrl: siteContent.setmoreBookingUrl,
    sameAs: [siteContent.contact.instagramUrl],
    openingHours: siteContent.contact.openingHours,
  };

  return (
    <div className="flex flex-col items-center">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="w-full h-[80vh] flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight animate-fade-in">
          {siteContent.hero.title}
        </h1>
        {siteContent.hero.subtitle ? (
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 animate-slide-up">
            {siteContent.hero.subtitle}
          </p>
        ) : null}
        <Link
          href="/book"
          data-testid="primary-book-cta"
          className={`bg-black text-white px-8 py-4 rounded-[var(--radius)] text-lg font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl animate-slide-up ${
            siteContent.hero.subtitle ? "" : "mt-4"
          }`}
        >
          {siteContent.hero.cta}
        </Link>
      </section>

      <section className="w-full py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Services</h2>
              <p className="text-gray-500">Tailored treatments for your unique beauty</p>
            </div>
            <Link
              href="/services"
              className="hidden md:flex items-center text-sm font-medium border-b border-black pb-1 hover:text-gray-600 transition-colors"
            >
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
              {siteContent.services.slice(0, 2).map((category: ServiceCategory) => (
                <Link
                  key={category.id}
                  href="/services"
                  className="group block border border-gray-200 rounded-[var(--radius)] p-4 transition-all hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                >
                  <div className="h-60 md:h-72 bg-gray-100 rounded-[var(--radius)] mb-5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <span className="font-serif text-3xl italic">{category.title}</span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-serif font-medium mb-2">{category.title}</h3>
                      {category.description ? <p className="text-gray-500 text-sm">{category.description}</p> : null}
                    </div>
                    <ArrowRight
                      size={18}
                      className="mt-1 shrink-0 text-gray-300 group-hover:text-black transition-colors"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/services" className="inline-flex items-center text-sm font-medium border-b border-black pb-1">
              View All Services <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold mb-16">Client Love</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {siteContent.testimonials.map((testimonial: Testimonial, index: number) => (
              <div key={index} className="bg-white p-8 rounded-[var(--radius)] shadow-sm">
                <div className="flex justify-center mb-6 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-lg text-gray-600 italic mb-6">“{testimonial.text}”</p>
                <p className="font-medium font-serif">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

