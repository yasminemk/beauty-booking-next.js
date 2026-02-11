import { siteContent } from "@/content/siteContent";
import { Mail, MapPin, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
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

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 h-full min-h-[400px]">
          {/* Map Placeholder */}
          <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-gray-400">
            Map Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
