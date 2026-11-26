import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Layout,
  Cloud,
  Database,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
} from "lucide-react";
import HoverButton from "../components/ui/HoverButton";
import { AnimatedBeamMultipleOutputDemo } from "../components/AnimatedBeamDemo";
import SpotlightCard from "../components/ui/SpotlightCard";
import { Seo, useSeoSettings, organizationSchema, breadcrumbSchema } from "../lib/seo";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const services = [
  {
    icon: <Code className="w-8 h-8 text-navy-700" />,
    title: "Web Development",
    description:
      "Custom, high-performance websites tailored to your brand. We build scalable solutions using React, Next.js, and modern frameworks.",
    features: ["Custom Web Apps", "E-commerce Solutions", "CMS Integration"],
  },
  {
    icon: <Smartphone className="w-8 h-8 text-navy-700" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that provide seamless user experiences on iOS and Android devices.",
    features: ["React Native", "Flutter", "iOS & Android Native"],
  },
  {
    icon: <Layout className="w-8 h-8 text-navy-700" />,
    title: "UI/UX Design",
    description:
      "User-centric design that drives engagement. We create intuitive interfaces and beautiful experiences that users love.",
    features: ["Wireframing", "Prototyping", "User Research"],
  },
  {
    icon: <Cloud className="w-8 h-8 text-navy-700" />,
    title: "Cloud Solutions",
    description:
      "Secure and scalable cloud infrastructure. We help you migrate, manage, and optimize your applications on AWS, Azure, or GCP.",
    features: ["Cloud Migration", "DevOps", "Serverless Architecture"],
  },
  {
    icon: <Cpu className="w-8 h-8 text-navy-700" />,
    title: "AI & Machine Learning",
    description:
      "Leverage the power of AI to automate processes and gain insights. We build intelligent models tailored to your business data.",
    features: ["Predictive Analytics", "NLP", "Computer Vision"],
  },
  {
    icon: <Database className="w-8 h-8 text-navy-700" />,
    title: "Data Analytics",
    description:
      "Turn data into actionable insights. We build robust data pipelines and visualization dashboards to help you make informed decisions.",
    features: ["Big Data", "BI Dashboards", "Data Warehousing"],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep into your business goals, requirements, and target audience to build a solid foundation.",
  },
  {
    num: "02",
    title: "Strategy & Design",
    desc: "We create a comprehensive roadmap and design intuitive prototypes that align with your vision.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Our experts build your solution using cutting-edge technologies, ensuring cleaner code and scalability.",
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "We deploy your product with precision and provide ongoing support to help you scale effortlessly.",
  },
];

const Services = () => {
  const settings = useSeoSettings();
  return (
    <div className="bg-white text-navy-900 min-h-screen overflow-x-hidden">
      <Seo page="services" fallbackTitle="Services | Skiez Technologies" jsonLd={[organizationSchema(settings), breadcrumbSchema(settings, [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]} />
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
           <div className="absolute inset-0 bg-grid" />
           <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full glow-brand" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-block mb-4"
          >
            <span className="eyebrow">
              Transforming Ideas into Reality
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gradient-muted font-display !leading-[1.05] !tracking-[-0.035em]"
          >
            Our Expertise. <br /> Your Growth.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We deliver top-tier digital solutions, from web and mobile apps to AI-driven insights. Partner with us to build technology that matters.
          </motion.p>
        </div>
        
        <div className="relative z-10 w-full flex justify-center mt-12 mb-0">
             <AnimatedBeamMultipleOutputDemo className="!bg-transparent !border-0 !shadow-none" />
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="pt-0 pb-20 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <SpotlightCard
                key={index}
                className="h-full"
              >
                <div className="relative z-10 flex flex-col h-full p-8 group">
                  <div className="mb-6 p-4 rounded-2xl w-fit border border-navy-100 bg-navy-50 shadow-[0_10px_30px_-12px_rgba(11,31,58,0.22)] group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-navy-900 group-hover:text-navy-900 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed flex-grow group-hover:text-slate-600 transition-colors">
                    {service.description}
                  </p>

                  <div className="border-t border-slate-200 pt-6 mt-auto">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600 group-hover:text-navy-800 transition-colors">
                          <CheckCircle2 className="w-4 h-4 mr-3 text-navy-500 group-hover:text-navy-900 transition-colors" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Work</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Our streamlined process ensures transparency and quality at every step of the journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-navy-900/0 via-navy-900/25 to-navy-900/0 z-0" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative z-10 text-center"
              >
                <div className="w-20 h-20 mx-auto bg-white rounded-full border border-slate-200 ring-8 ring-slate-50 flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(11,31,58,0.22)] group hover:border-navy-300 transition-colors duration-300">
                  <span className="font-display text-2xl font-bold text-gradient transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Tech Stack inspired) --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">Skiez?</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              We don't just write code; we build digital assets that add value to your business. Our team is committed to excellence, innovation, and your success.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Expert Team", desc: "Developers with years of industry experience." },
                { title: "Scalable Code", desc: "Architecture designed to grow with you." },
                { title: "24/7 Support", desc: "We are always here when you need us." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl border border-navy-100 bg-navy-50 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-navy-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-200/50 to-navy-100/50 rounded-3xl blur-2xl" />
            <div className="relative surface rounded-3xl p-8 md:p-12 overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                   <div className="border border-slate-200 bg-slate-50 p-6 rounded-2xl text-center">
                        <h3 className="text-3xl font-bold text-navy-900 mb-1">98%</h3>
                        <p className="text-xs text-slate-600">Client Satisfaction</p>
                   </div>
                   <div className="border border-slate-200 bg-slate-50 p-6 rounded-2xl text-center">
                        <h3 className="text-3xl font-bold text-navy-900 mb-1">50+</h3>
                        <p className="text-xs text-slate-600">Projects Delivered</p>
                   </div>
                   <div className="border border-slate-200 bg-slate-50 p-6 rounded-2xl text-center col-span-2">
                        <h3 className="text-3xl font-bold text-navy-900 mb-1">10+</h3>
                        <p className="text-xs text-slate-600">Countries Served</p>
                   </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top,_#1c355f_0%,_#0b1f3a_55%,_#071428_100%)] p-12 md:p-20 shadow-[0_40px_100px_-40px_rgba(11,31,58,0.6)] text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-dark" />
                
                <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-white mb-6">
                    Ready to Transform Your Business?
                </h2>
                <p className="relative z-10 text-navy-200 text-lg mb-10 max-w-2xl mx-auto">
                    Let's discuss how we can help you achieve your goals with our premium technology services.
                </p>
                <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">

                    <HoverButton text="Start a Project" href="/contact" />
                    <Link to="/" className="btn-ghost-dark !px-8 !py-4 !text-base">
                        View Portfolio
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
