import React, { useEffect } from "react";
import { FiMessageCircle, FiZap, FiBarChart2, FiCheck } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import { cx } from "@/utils/cx";

/* Small icon circle (keeps same visual as before) */
const IconWrapper = ({ children }) => (
  <div className="inline-flex items-center justify-center rounded-full bg-white p-2 shadow-sm">
    {children}
  </div>
);

/* Simple check item */
const CheckItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-md bg-white/10">
      <FiCheck className="h-4 w-4" />
    </span>
    <span className="text-md">{text}</span>
  </li>
);

/* Mockup wrapper — adjusted so inner image sits flush with corners */
const AlternateImageMockup = (props) => {
  return (
    <div
      className={cx(
        // remove padding → remove gap between outer frame & image
        "w-full h-full rounded-[20px] bg-transparent lg:static",
        props.className
      )}
    >
      <div className="w-full h-full rounded-[20px] overflow-hidden">
        <div className="relative w-full h-full rounded-[20px] overflow-hidden">
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
    <section className="flex flex-col gap-12 overflow-hidden bg-primary py-16 sm:gap-16 md:gap-20 md:py-24 lg:gap-24">
      <div className="mx-auto w-full max-w-container px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <span className="text-sm font-semibold text-brand-secondary md:text-md">
            Features
          </span>
          <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
            Beautiful analytics to grow smarter
          </h2>
          <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-container flex-col gap-12 px-4 sm:gap-16 md:gap-20 md:px-8 lg:gap-24">
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

                <h2 className="mt-5 text-display-xs font-serif text-primary text-5xl md:text-display-sm text-white">
                  {b.title}
                </h2>

                <p className="mt-2 text-md text-tertiary md:mt-4 md:text-lg">
                  {b.text}
                </p>

                <ul className="mt-8 flex flex-col gap-4 pl-2 md:gap-5 md:pl-4">
                  {b.items.map((feat) => (
                    <CheckItem key={feat} text={feat} />
                  ))}
                </ul>
              </div>

              {/* Image Column */}
              <div
                className="relative w-full flex-1 lg:h-128"
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
                  />
                  {/* Dark mode image */}
                  <img
                    alt={`${b.title} - dashboard (dark)`}
                    src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-dark-01.webp"
                    className="hidden dark:block w-full h-full object-cover"
                    loading="lazy"
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
