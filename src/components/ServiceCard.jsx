"use client";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Business & Management",
    description: "Helping companies with strategy, operations and leadership.",
    image: "https://images.pexels.com/photos/7698734/pexels-photo-7698734.jpeg",
    hoverGif:
      "https://cdn.pixabay.com/animation/2022/11/01/18/38/18-38-04-285_512.gif",
  },
  {
    title: "IT & Technology Consulting",
    description:
      "Advising on software, cybersecurity and digital transformation.",
    image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg",
    hoverGif:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bTNiN2N6cmdpNmVyNXE3dm81eHdqd2xyZGVoa3R2eGVkcGZ5aDZrbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ML15sUZFNyMy0Yv55m/giphy.gif",
  },
  {
    title: "Marketing & Branding Consulting",
    description:
      "Assisting with branding, digital marketing and sales strategies.",
    image: "https://images.pexels.com/photos/7661184/pexels-photo-7661184.jpeg",
    hoverGif:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJmNnZ4M3JsYWx6enFueHNnNm5oOTF1bm4wMjA2dWRoMW9kd2s2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gHiRWOaXGGHOY5w6f3/giphy.gif",
  },
];

export default function ServiceCard() {
  return (
    <section className="bg-slate-900 py-20">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-10">
        Services
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={cn(
              "group relative h-96 w-full rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-in-out cursor-pointer border border-gray-700 hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]"
            )}
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundImage = `url(${card.hoverGif})`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundImage = `url(${card.image})`)
            }
          >
            {/* Dark overlay with fade-in */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>

            {/* Text content */}
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-3 drop-shadow-lg">
                {card.title}
              </h3>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Subtle overlay glow */}
            <div className="absolute inset-0 bg-teal-400/0 group-hover:bg-teal-400/10 transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
