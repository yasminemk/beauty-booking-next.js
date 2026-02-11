import { siteContent } from "@/content/siteContent";
import { Mail, MapPin, Instagram } from "lucide-react";

export default function BookPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Book an Appointment</h1>
        <p className="text-gray-500 text-lg mb-12">
          We look forward to welcoming you to {siteContent.brandName}.
        </p>

        <div className="bg-white rounded-[var(--radius)] p-8 shadow-sm mb-12">
          <p className="mb-6 font-medium">To book, please use our online booking system or contact us directly.</p>
          
          <button className="bg-black text-white w-full py-4 rounded-[var(--radius)] font-medium hover:bg-gray-800 transition-all mb-4">
            Book Now
          </button>
          <p className="text-xs text-gray-400">
            *Opens in a new window
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white rounded-[var(--radius)] flex items-center justify-center mb-3 shadow-sm">
              <Mail size={18} />
            </div>
            <p>{siteContent.contact.email}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-10 h-10 bg-white rounded-[var(--radius)] flex items-center justify-center mb-3 shadow-sm">
              <Instagram size={18} />
            </div>
            <p>{siteContent.contact.instagram}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-10 h-10 bg-white rounded-[var(--radius)] flex items-center justify-center mb-3 shadow-sm">
              <MapPin size={18} />
            </div>
            <p>{siteContent.contact.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
