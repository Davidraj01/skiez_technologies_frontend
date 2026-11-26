import { motion } from "framer-motion";
import { Building2, ShoppingBag, GraduationCap, Stethoscope, Store, Building } from "lucide-react";
import HoverButton from "../components/ui/HoverButton";
import BlurImage from "../components/ui/BlurImage";
import imgStartups from "../assets/optimized/startups.webp";
import imgEcommerce from "../assets/optimized/e-commerce.webp";
import imgEducation from "../assets/optimized/education.webp";
import imgHealthcare from "../assets/optimized/healthcare.webp";
import imgSme from "../assets/optimized/sme.webp";
import imgEnterprise from "../assets/optimized/enterprise.webp";
import { Seo, useSeoSettings, organizationSchema, breadcrumbSchema } from "../lib/seo";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const industries = [
  { name: "Startups", icon: <Building2 className="w-6 h-6 text-navy-700"/>, img: imgStartups },
  { name: "E-commerce", icon: <ShoppingBag className="w-6 h-6 text-navy-700"/>, img: imgEcommerce },
  { name: "Education", icon: <GraduationCap className="w-6 h-6 text-navy-700"/>, img: imgEducation },
  { name: "Healthcare", icon: <Stethoscope className="w-6 h-6 text-navy-700"/>, img: imgHealthcare },
  { name: "SME", icon: <Store className="w-6 h-6 text-navy-700"/>, img: imgSme },
  { name: "Enterprise", icon: <Building className="w-6 h-6 text-navy-700"/>, img: imgEnterprise },
];

export default function About() {
  const settings = useSeoSettings();
  return (
    <div className="bg-white min-h-screen text-navy-900 font-sans overflow-x-hidden">
      <Seo page="about" fallbackTitle="About | Skiez Technologies" jsonLd={[organizationSchema(settings), breadcrumbSchema(settings, [{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
           <div className="absolute inset-0 bg-grid" />
           <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full glow-brand" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="inline-block mb-6"
                >
                    <span className="eyebrow">
                        About Skiez Technologies
                    </span>
                </motion.div>
                
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight"
                >
                    Innovative Digital Solutions, Built for Growth in <span className="text-gradient">Skiez.</span>
                </motion.h1>
                
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl"
                >
                    Skiez Technologies helps businesses transform ideas into scalable
                    digital products through modern web development, software solutions,
                    and technology consulting.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, rotateY: -10, rotateX: 5 }}
                animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-1/2 perspective-1000"
            >
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-navy-900/10 border border-slate-200 bg-slate-50 p-2 transform transition-transform hover:scale-[1.02]">
                    <BlurImage
                        className="rounded-xl w-full object-cover"
                        src="https://res.cloudinary.com/tailwindmasterkit/image/upload/f_auto,q_auto,w_1200/v1627290155/assets/untitled-design-47png-a821832209.png"
                        alt="Skiez Team"
                    />
                 </div>
            </motion.div>
        </div>
      </section>

      {/* --- INDUSTRIES SECTION --- */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-navy-900 to-transparent mx-auto"/>
            </motion.div>

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            >
                {industries.map((item, idx) => (
                    <motion.div
                        key={idx}
                        variants={fadeInUp}
                        className="group flex flex-col items-center gap-4 p-6 surface surface-hover rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                         <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-navy-700 transition-colors">
                             <BlurImage src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"/>
                         </div>
                         <div className="text-center">
                             <h3 className="font-semibold text-slate-600 group-hover:text-navy-900 transition-colors">{item.name}</h3>
                         </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* --- DETAILS SECTION --- */}
      <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
             <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
             >
                 <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Technology driven by <span className="text-gradient">Passion.</span>
                 </h2>
                 <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    Founded in 2013 by Dr. S. Davidraj, Skiez Technologies is a leading
                    provider of innovative, scalable custom IT solutions. We specialize in Full Stack
                    Development, UI/UX Design, and Mobile App Development.
                 </p>
                 <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    We also offer result-driven Digital Marketing services to help businesses grow
                    their online presence and generate quality leads.
                 </p>


                 <div className="flex gap-4">
                    <HoverButton text="Refer Now" href="/contact" />
                 </div>
             </motion.div>

             <div className="relative">
                 {/* This could be the masonry grid or a feature image. Let's make a mini grid */}
                 <div className="grid grid-cols-2 gap-4">
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="rounded-2xl overflow-hidden h-48 w-full shadow-lg"
                     >
                        <BlurImage 
                           src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80" 
                           className="object-cover h-full w-full"
                        />
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl overflow-hidden h-48 w-full shadow-lg translate-y-8"
                     >
                        <BlurImage 
                           src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" 
                           className="object-cover h-full w-full"
                        />
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl overflow-hidden h-48 w-full shadow-lg"
                     >
                        <BlurImage 
                           src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=600&q=80" 
                           className="object-cover h-full w-full"
                        />
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="rounded-2xl overflow-hidden h-48 w-full shadow-lg translate-y-8"
                     >
                        <BlurImage 
                           src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" 
                           className="object-cover h-full w-full"
                        />
                     </motion.div>
                 </div>
             </div>
          </div>
      </section>

    </div>
  );
}
