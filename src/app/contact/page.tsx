// Imports/libraries
import { siteContent } from "@/config/siteContent";
import { Mail, MapPin, Instagram } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

// Metadata & tagging
export const metadata: Metadata = {
  title: "Contact",
  description: "Contact LKSTUDIOUK for bookings and enquiries.",
  openGraph: {
    title: "Contact",
    description: "Contact LKSTUDIOUK for bookings and enquiries.",
    url: "/contact",
  },
};

//Main Content
export default function ContactPage() {
  return (
    <div className="relative isolate w-full overflow-hidden">
      <Image
        src="/images/grouppic1.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_15%]"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white/90 border border-white/20 rounded-[var(--radius-card)] p-8 md:p-12 md:col-start-1 md:row-start-1 h-full backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Contact Us</h1>
            <p className="text-gray-600 text-lg mb-12 max-w-md">
              We&apos;d love to hear from you. Whether you have a question about our services or need help booking, our team is here to assist.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-6 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-600">{siteContent.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-6 shrink-0">
                  <Instagram size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Instagram</h3>
                  <p className="text-gray-600">{siteContent.contact.instagram}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-6 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-600">{siteContent.contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 border border-white/20 rounded-[var(--radius-card)] p-8 md:p-12 md:col-start-2 md:row-start-1 md:row-span-2 h-full backdrop-blur-sm">
            <h2 className="text-2xl font-serif font-bold mb-6">Send a message</h2>
            <ContactForm />
          </div>

          <div className="bg-white/90 border border-white/20 rounded-[var(--radius-card)] p-4 md:p-6 h-[420px] md:col-start-1 md:row-start-2 backdrop-blur-sm">
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
    </div>
  );
}
