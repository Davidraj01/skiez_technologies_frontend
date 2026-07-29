import React from "react";
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
    icon: <Code className="w-8 h-8 text-cyan-400" />,
    title: "Web Development",
    description:
      "Custom, high-performance websites tailored to your brand. We build scalable solutions using React, Next.js, and modern frameworks.",
    features: ["Custom Web Apps", "E-commerce Solutions", "CMS Integration"],
  },
  {
    icon: <Smartphone className="w-8 h-8 text-purple-400" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that provide seamless user experiences on iOS and Android devices.",
    features: ["React Native", "Flutter", "iOS & Android Native"],
  },
  {
    icon: <Layout className="w-8 h-8 text-pink-400" />,
    title: "UI/UX Design",
    description:
      "User-centric design that drives engagement. We create intuitive interfaces and beautiful experiences that users love.",
    features: ["Wireframing", "Prototyping", "User Research"],
  },
  {
    icon: <Cloud className="w-8 h-8 text-blue-400" />,
    title: "Cloud Solutions",
    description:
      "Secure and scalable cloud infrastructure. We help you migrate, manage, and optimize your applications on AWS, Azure, or GCP.",
    features: ["Cloud Migration", "DevOps", "Serverless Architecture"],
  },
  {
    icon: <Cpu className="w-8 h-8 text-emerald-400" />,
    title: "AI & Machine Learning",
    description:
      "Leverage the power of AI to automate processes and gain insights. We build intelligent models tailored to your business data.",
    features: ["Predictive Analytics", "NLP", "Computer Vision"],
  },
  {
    icon: <Database className="w-8 h-8 text-orange-400" />,
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
  return (
    <div className="bg-slate-900 text-white min-h-screen overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-cyan-400">
              Transforming Ideas into Reality
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
          >
            Our Expertise. <br /> Your Growth.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We deliver top-tier digital solutions, from web and mobile apps to AI-driven insights. Partner with us to build technology that matters.
          </motion.p>
        </div>
        
        <div className="relative z-10 w-full flex justify-center mt-12 mb-0">
             <AnimatedBeamMultipleOutputDemo className="!bg-transparent !border-0 !shadow-none" />
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="pt-0 pb-20 px-6 bg-slate-900 relative">
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
                  <div className="mb-6 p-4 bg-slate-800/50 rounded-2xl w-fit border border-slate-700/50 shadow-lg shadow-cyan-900/10 group-hover:scale-110 group-hover:bg-slate-800 transition-all duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-8 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </p>

                  <div className="border-t border-slate-800 pt-6 mt-auto">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-400 group-hover:text-cyan-200 transition-colors">
                          <CheckCircle2 className="w-4 h-4 mr-3 text-cyan-600/70 group-hover:text-cyan-400 transition-colors" />
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
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Work</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Our streamlined process ensures transparency and quality at every step of the journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 z-0" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative z-10 text-center"
              >
                <div className="w-20 h-20 mx-auto bg-slate-900 rounded-full border-4 border-slate-800 flex items-center justify-center mb-6 shadow-xl shadow-cyan-900/20 group hover:border-cyan-500/50 transition-colors duration-300">
                  <span className="text-2xl font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Tech Stack inspired) --- */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-cyan-400">Skiez?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We don't just write code; we build digital assets that add value to your business. Our team is committed to excellence, innovation, and your success.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Expert Team", desc: "Developers with years of industry experience." },
                { title: "Scalable Code", desc: "Architecture designed to grow with you." },
                { title: "24/7 Support", desc: "We are always here when you need us." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
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
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-700/50 p-4 rounded-xl text-center">
                        <h3 className="text-3xl font-bold text-white mb-1">98%</h3>
                        <p className="text-xs text-slate-400">Client Satisfaction</p>
                   </div>
                   <div className="bg-slate-700/50 p-4 rounded-xl text-center">
                        <h3 className="text-3xl font-bold text-white mb-1">50+</h3>
                        <p className="text-xs text-slate-400">Projects Delivered</p>
                   </div>
                   <div className="bg-slate-700/50 p-4 rounded-xl text-center col-span-2">
                        <h3 className="text-3xl font-bold text-white mb-1">10+</h3>
                        <p className="text-xs text-slate-400">Countries Served</p>
                   </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[2.5rem] bg-gradient-to-r from-cyan-600 to-blue-600 p-12 md:p-20 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                
                <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-white mb-6">
                    Ready to Transform Your Business?
                </h2>
                <p className="relative z-10 text-cyan-100 text-lg mb-10 max-w-2xl mx-auto">
                    Let's discuss how we can help you achieve your goals with our premium technology services.
                </p>
                <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">

                    <HoverButton text="Start a Project" href="/contact" />
                    <button className="px-8 py-4 bg-cyan-700 text-white font-bold rounded-full hover:bg-cyan-800 transition-colors border border-cyan-500">
                        View Portfolio
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
