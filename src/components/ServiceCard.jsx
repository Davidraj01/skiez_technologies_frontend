"use client";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Business & Management",
    description: "Helping companies with strategy, operations and leadership.",
    image: "https://images.pexels.com/photos/7698734/pexels-photo-7698734.jpeg?auto=compress&cs=tinysrgb&w=800",
    hoverGif:
      "https://cdn.pixabay.com/animation/2022/11/01/18/38/18-38-04-285_512.gif",
  },
  {
    title: "IT & Technology Consulting",
    description:
      "Advising on software, cybersecurity and digital transformation.",
    image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&w=800",
    hoverGif:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bTNiN2N6cmdpNmVyNXE3dm81eHdqd2xyZGVoa3R2eGVkcGZ5aDZrbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ML15sUZFNyMy0Yv55m/giphy.gif",
  },
  {
    title: "Marketing & Branding Consulting",
    description:
      "Assisting with branding, digital marketing and sales strategies.",
    image: "https://images.pexels.com/photos/7661184/pexels-photo-7661184.jpeg?auto=compress&cs=tinysrgb&w=800",
    hoverGif:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJmNnZ4M3JsYWx6enFueHNnNm5oOTF1bm4wMjA2dWRoMW9kd2s2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gHiRWOaXGGHOY5w6f3/giphy.gif",
  },
];

export default function ServiceCard() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-50 py-24 md:py-32">
      <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center px-6 text-center md:mb-16">
        <div className="mb-6 h-1 w-14 rounded-full bg-navy-900" />
        <h2 className="font-display text-4xl font-bold tracking-tight text-navy-900 md:text-6xl">
          Services
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={cn(
              "group relative h-[26rem] w-full rounded-3xl overflow-hidden cursor-pointer border border-slate-200 bg-navy-900 shadow-[0_24px_50px_-28px_rgba(11,31,58,0.55)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-30px_rgba(11,31,58,0.7)]"
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
            {/* Readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/5 transition-opacity duration-700 group-hover:opacity-95"></div>

            {/* Index chip */}
            <div className="absolute left-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 font-display text-sm font-semibold text-white backdrop-blur-md">
              0{index + 1}
            </div>

            {/* Text content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
              <div className="mb-5 h-px w-12 bg-gradient-to-r from-white to-transparent transition-all duration-700 group-hover:w-24" />
              <h3 className="font-display text-white font-bold text-2xl sm:text-[1.7rem] leading-tight tracking-tight mb-3">
                {card.title}
              </h3>
              <p className="text-slate-300/90 text-sm sm:text-[15px] leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Subtle brand tint on hover */}
            <div className="absolute inset-0 bg-navy-900/0 transition-all duration-700 group-hover:bg-navy-900/10"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
