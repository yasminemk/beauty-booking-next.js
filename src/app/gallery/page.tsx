import Gallery from "@/components/Gallery";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Gallery</h1>
        <p className="text-gray-500 text-lg">
          A glimpse into our studio and the transformations we create.
        </p>
      </div>
      
      <Gallery />
    </div>
  );
}
