const GallerySection = () => {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
  ];

  return (
    <section className="pt-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Our Gallery
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-10">
          A glimpse into our life-saving journey — from donation drives,
          awareness programs, and community events. Every picture tells a story
          of hope, compassion, and unity.
        </p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded shadow hover:shadow-xl"
            >
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
