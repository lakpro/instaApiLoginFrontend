import React, { useEffect, useState, useRef } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Comments from "./Comments";

const Media = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/profile/media`, { credentials: "include" })
      .then((res) => res.json())
      .then(setMedia)
      .catch(console.error);
  }, []);

  return (
    <section className="bg-black min-h-screen px-4 py-10 text-white">
      <h2
        className="text-5xl mb-10 text-center font-bold"
        style={{ fontFamily: "Cookie, cursive" }}
      >
        Instagram Feed
      </h2>

      <div className="grid gap-8 max-w-xl mx-auto">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-[#111] rounded-2xl shadow-lg overflow-hidden border border-white/10"
          >
            <div className="aspect-[1/1] w-full">
              {item.media_type === "CAROUSEL_ALBUM" && item.children ? (
                <SimpleCarousel images={item.children.data} />
              ) : item.media_type === "IMAGE" ? (
                <img
                  src={item.media_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : item.media_type === "VIDEO" ? (
                <video controls className="w-full h-full object-cover">
                  <source src={item.media_url} type="video/mp4" />
                </video>
              ) : null}
            </div>

            <div className="px-4 py-2">
              <Comments mediaId={item.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 🔁 Square Carousel Component
const SimpleCarousel = ({ images }) => {
  const ref = useRef(null);
  const indexRef = useRef(0);

  const updateImage = (newIndex) => {
    if (ref.current && images[newIndex]) {
      ref.current.src = images[newIndex].media_url;
      indexRef.current = newIndex;
    }
  };

  const next = () => updateImage((indexRef.current + 1) % images.length);
  const prev = () =>
    updateImage((indexRef.current - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-full group">
      <img
        ref={ref}
        src={images[0].media_url}
        alt="Carousel"
        className="w-full h-full object-cover transition-all duration-300"
      />

      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/25 hover:bg-black/60 text-white text-xl p-2 rounded-full shadow-lg transition cursor-pointer"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/25 hover:bg-black/60 text-white text-xl p-2 rounded-full shadow-lg transition cursor-pointer"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Media;
