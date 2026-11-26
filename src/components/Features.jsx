import React, { useEffect } from "react";
import { FiMessageCircle, FiZap, FiBarChart2, FiCheck } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

/* Small icon circle (keeps same visual as before) */
const IconWrapper = ({ children }) => (
  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-navy-100 bg-navy-50 text-navy-900">
    {children}
  </div>
);

/* Simple check item */
const CheckItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900">
      <FiCheck className="h-3 w-3 text-white" />
    </span>
    <span className="text-[15px] leading-relaxed text-slate-600">{text}</span>
  </li>
);

export const FeaturesAlternatingLayout01 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1800,
      easing: "ease-in-out",
      once: true,
      offset: 120,
    });
  }, []);

  const blocks = [
    {
      key: "b1",
      title: "Market Research & Analysis",
      text: "Providing data-driven insights to support business decisions.",
      items: [
        "Leverage automation to move fast",
        "Always give customers a human to chat to",
        "Automate customer support and close leads faster",
      ],
      icon: <FiMessageCircle size={26} />,
      img: "https://media.istockphoto.com/id/1160025373/photo/business-plan-sketch-in-office.jpg?s=612x612&w=0&k=20&c=DseT1hi8dIWJSz2Ir1hk0uCIuz08UPovqCFN3ZZ33gg=",
    },
    {
      key: "b2",
      title: "Strategy Development",
      text: "Assisting in long-term planning and growth strategies.",
      items: [
        "Keep your customers in the loop with live chat",
        "Embed help articles right on your website",
        "Customers never have to leave the page to find an answer",
      ],
      icon: <FiZap size={26} />,
      img: "https://media.istockphoto.com/id/1224241045/photo/drawing-global-business-interface-on-office-desk.jpg?s=612x612&w=0&k=20&c=KAlldJ_Gp-UkqwzIWeGGFA8CeCjWcftUnB2tKNx_uag=",
    },
    {
      key: "b3",
      title: "Training & Development",
      text: "Educating employees or teams on best practices",
      items: [
        "Filter, export, and drilldown on the data quickly",
        "Save, schedule, and automate reports to your inbox",
        "Connect the tools you already use with 100+ integrations",
      ],

      icon: <FiBarChart2 size={26} />,
      img: "https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241214.jpg?uid=R191945972&ga=GA1.1.937276663.1742193919&semt=ais_hybrid",
    },
  ];

  return (
    <section className="relative flex flex-col gap-12 overflow-hidden bg-white py-20 md:gap-14 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 hairline" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full glow-brand opacity-60" />
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <span className="eyebrow">
            Features
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-navy-900 md:text-6xl">
            Beautiful analytics to grow smarter
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 md:mt-6 md:text-xl">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </p>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 md:gap-10 md:px-8">
        {blocks.map((b, idx) => (
          <article
            key={b.key}
            data-aos="fade-up"
            className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-28px_rgba(11,31,58,0.28)] transition-shadow duration-500 hover:shadow-[0_32px_70px_-26px_rgba(11,31,58,0.38)] lg:grid-cols-2"
          >
            {/* Text (left) */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <IconWrapper>{b.icon}</IconWrapper>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  0{idx + 1}
                </span>
              </div>

              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-navy-900 md:text-4xl">
                {b.title}
              </h2>

              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                {b.text}
              </p>

              <div className="mt-6 hairline" />
              <ul className="mt-6 flex flex-col gap-3.5">
                {b.items.map((feat) => (
                  <CheckItem key={feat} text={feat} />
                ))}
              </ul>
            </div>

            {/* Image (right), flush with the card edges */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[24rem]">
              <img
                alt={b.title}
                src={b.img}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
