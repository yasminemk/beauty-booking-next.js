import Gallery from "@/components/Gallery";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Gallery</h1>
        <p className="text-gray-500 text-lg">
          A glimpse into our studio and the transformations we create.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      
      <Gallery />
    </div>
  );
}
