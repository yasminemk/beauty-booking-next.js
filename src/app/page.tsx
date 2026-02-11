import Link from "next/link";
import { siteContent, ServiceCategory, Testimonial } from "@/content/siteContent";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-[80vh] flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight animate-fade-in">
          {siteContent.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 animate-slide-up">
          {siteContent.hero.subtitle}
        </p>
        <Link
          href="/book"
          className="bg-black text-white px-8 py-4 rounded-[var(--radius)] text-lg font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl animate-slide-up"
        >
          {siteContent.hero.cta}
        </Link>
      </section>

      {/* Featured Services Preview */}
      <section className="w-full py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Services</h2>
              <p className="text-gray-500">Tailored treatments for your unique beauty</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center text-sm font-medium border-b border-black pb-1 hover:text-gray-600 transition-colors">
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
              {siteContent.services.slice(0, 2).map((category: ServiceCategory) => (
                <div key={category.id} className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-gray-100 rounded-[var(--radius)] mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                    {/* Placeholder for service image if we had one per category */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <span className="font-serif text-4xl italic">{category.title}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">{category.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{category.description}</p>
                  <Link href="/services" className="text-sm font-medium underline decoration-gray-300 underline-offset-4 group-hover:decoration-black transition-all">
                    Learn more
                  </Link>
                </div>
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

      {/* Testimonials */}
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
                <p className="text-lg text-gray-600 italic mb-6">"{testimonial.text}"</p>
                <p className="font-medium font-serif">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
