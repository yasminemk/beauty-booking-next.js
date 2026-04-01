import Gallery from "@/components/Gallery";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A glimpse into our studio and the transformations we create.",
  openGraph: {
    title: "Gallery",
    description: "A glimpse into our studio and the transformations we create.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="w-full">
      <section className="relative isolate w-full overflow-hidden">
        <Image
          src="/images/grouppic1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Our Gallery</h1>
            <p className="text-white/80 text-lg">
              A glimpse into our studio and the transformations we create.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </section>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <Gallery />
      </div>
    </div>
  );
}
