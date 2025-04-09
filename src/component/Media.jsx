import React, { useEffect, useState, useRef } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Comments from "./Comments"; // Import the Comments component

const Media = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/profile/media`, { credentials: "include" })
      .then((res) => res.json())
      .then(setMedia)
      .catch(console.error);
  }, []);

  return (
    <section className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Instagram Feed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {media.map((item) => (
          <>
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              {item.media_type === "CAROUSEL_ALBUM" && item.children ? (
                <SimpleCarousel images={item.children.data} />
              ) : item.media_type === "IMAGE" ? (
                <img
                  src={item.media_url}
                  alt=""
                  className="w-full object-cover"
                />
              ) : item.media_type === "VIDEO" ? (
                <video controls className="w-full">
                  <source src={item.media_url} type="video/mp4" />
                </video>
              ) : null}
              <Comments
                mediaId={item.id} // Pass the media ID to the Comments component
              />
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

// 🔁 Simple Carousel Component
const SimpleCarousel = ({ images }) => {
  const ref = useRef(null);
  let index = 0;

  const next = () => {
    if (!ref.current) return;
    index = (index + 1) % images.length;
    ref.current.src = images[index].media_url;
  };

  const prev = () => {
    if (!ref.current) return;
    index = (index - 1 + images.length) % images.length;
    ref.current.src = images[index].media_url;
  };

  return (
    <div className="relative">
      <img
        ref={ref}
        src={images[0].media_url}
        alt="Carousel"
        className="w-full h-auto object-cover"
      />
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Media;
