import React, { useEffect } from "react";
import { FiMessageCircle, FiZap, FiBarChart2, FiCheck } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import { cx } from "@/utils/cx";

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

/* Mockup wrapper — adjusted so inner image sits flush with corners */
const AlternateImageMockup = (props) => {
  return (
    <div
      className={cx(
        // remove padding → remove gap between outer frame & image
        "w-full h-full rounded-[24px] border border-slate-200 bg-slate-50 p-2 shadow-[0_40px_80px_-30px_rgba(11,31,58,0.25)] lg:static",
        props.className
      )}
    >
      <div className="w-full h-full rounded-[18px] overflow-hidden">
        <div className="relative w-full h-full aspect-[4/3] lg:aspect-auto rounded-[18px] overflow-hidden">
          {props.children}
        </div>
      </div>
    </div>
  );
};


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
      imgLeft: false, // image on right
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
      imgLeft: true, // image on left (order reversed on large)
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
      imgLeft: false,
      img: "https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241214.jpg?uid=R191945972&ga=GA1.1.937276663.1742193919&semt=ais_hybrid",
    },
  ];

  return (
    <section className="relative flex flex-col gap-16 overflow-hidden bg-white py-24 md:gap-24 md:py-32">
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

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 md:gap-28 md:px-8">
        {blocks.map((b, idx) => {
          // Alternate animation directions: text comes from left/right and image opposite
          const textAos = b.imgLeft ? "fade-left" : "fade-right";
          const imgAos = b.imgLeft ? "fade-right" : "fade-left";

          return (
            <div
              key={b.key}
              className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2 lg:gap-24 items-center"
            >
              {/* Text Column */}
              <div
                className={cx(
                  "max-w-xl flex-1 self-center",
                  // when image is left on large screens, we show text second (order-last)
                  b.imgLeft ? "lg:order-last" : ""
                )}
                data-aos={textAos}
              >
                <IconWrapper>{b.icon}</IconWrapper>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  0{idx + 1}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy-900 md:text-5xl">
                  {b.title}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                  {b.text}
                </p>

                <div className="mt-8 hairline" />
                <ul className="mt-8 flex flex-col gap-4 md:gap-5">
                  {b.items.map((feat) => (
                    <CheckItem key={feat} text={feat} />
                  ))}
                </ul>
              </div>

              {/* Image Column */}
              <div
                className="relative w-full flex-1 lg:h-[30rem]"
                data-aos={imgAos}
              >
                <AlternateImageMockup
                  className={b.imgLeft ? "lg:right-0" : "lg:left-0"}
                >
                  {/* Light mode image fills container and sits flush with rounded corners */}
                  <img
                    alt={`${b.title} - dashboard (light)`}
                    src={b.img}
                    className="w-full h-full object-cover block dark:hidden"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Dark mode image */}
                  <img
                    alt={`${b.title} - dashboard (dark)`}
                    src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-dark-01.webp"
                    className="hidden dark:block w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </AlternateImageMockup>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
