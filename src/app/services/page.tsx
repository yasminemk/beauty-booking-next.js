import { siteContent } from "@/content/siteContent";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Services</h1>
        <p className="text-gray-500 text-lg mb-8">
          Explore our range of treatments designed to enhance your natural beauty.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">Please read our policies before booking</p>
          <div className="flex gap-4">
            <Link
              href="/policies"
              className="bg-white text-black border border-black px-8 py-3 rounded-[var(--radius)] font-medium hover:bg-gray-50 transition-all"
            >
              Read Policies
            </Link>
            <Link
              href="/book"
              className="bg-black text-white px-8 py-3 rounded-[var(--radius)] font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {siteContent.services.map((category) => (
          <div key={category.id} className="space-y-8">
            <div className="border-b border-gray-200 pb-4 mb-8">
              <h2 className="text-3xl font-serif font-medium">{category.title}</h2>
              <p className="text-gray-500 mt-2">{category.description}</p>
              {category.note && (
                <p className="text-sm text-gray-400 mt-2 italic bg-gray-50 p-3 rounded-lg inline-block">
                  {category.note}
                </p>
              )}
            </div>

            <div className="space-y-6">
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

      <div className="mt-20 md:mt-32 max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-16 text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">Ready to book?</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Secure your appointment today. A deposit is required for all bookings.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center bg-black text-white px-8 py-4 rounded-[var(--radius)] font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
        >
          Book Appointment <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
