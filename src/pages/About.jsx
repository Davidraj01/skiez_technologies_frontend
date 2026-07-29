import { motion } from "framer-motion";
import { Building2, ShoppingBag, GraduationCap, Stethoscope, Store, Building } from "lucide-react";
import HoverButton from "../components/ui/HoverButton";
import BlurImage from "../components/ui/BlurImage";

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
  { name: "Startups", icon: <Building2 className="w-6 h-6 text-cyan-400"/>, img: "/src/assets/startups.jpg" },
  { name: "E-commerce", icon: <ShoppingBag className="w-6 h-6 text-purple-400"/>, img: "/src/assets/e-commerce.jpg" },
  { name: "Education", icon: <GraduationCap className="w-6 h-6 text-pink-400"/>, img: "/src/assets/education.jpg" },
  { name: "Healthcare", icon: <Stethoscope className="w-6 h-6 text-emerald-400"/>, img: "/src/assets/healthcare.jpg" },
  { name: "SME", icon: <Store className="w-6 h-6 text-orange-400"/>, img: "/src/assets/sme.jpg" },
  { name: "Enterprise", icon: <Building className="w-6 h-6 text-blue-400"/>, img: "/src/assets/enterprise.jpg" },
];

export default function About() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] will-change-transform translate-z-0" />
           <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] will-change-transform translate-z-0" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm"
                >
                    <span className="text-sm font-medium text-cyan-400">
                        About Skiez Technologies
                    </span>
                </motion.div>
                
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight"
                >
                    Innovative Digital Solutions, Built for Growth in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skiez.</span>
                </motion.h1>
                
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl"
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
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-slate-700 bg-slate-800 p-2 transform transition-transform hover:scale-[1.02]">
                    <BlurImage
                        className="rounded-xl w-full object-cover"
                        src="https://res.cloudinary.com/tailwindmasterkit/image/upload/v1627290155/assets/untitled-design-47png-a821832209.png"
                        alt="Skiez Team"
                    />
                 </div>
            </motion.div>
        </div>
      </section>

      {/* --- INDUSTRIES SECTION --- */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
                <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"/>
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
                        className="group flex flex-col items-center gap-4 p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
                    >
                         <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-cyan-500 transition-colors">
                             <BlurImage src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"/>
                         </div>
                         <div className="text-center">
                             <h3 className="font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">{item.name}</h3>
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
                    Technology driven by <span className="text-cyan-400">Passion.</span>
                 </h2>
                 <p className="text-slate-400 text-lg leading-relaxed mb-6">
                    Founded in 2013 by Dr. S. Davidraj, Skiez Technologies is a leading
                    provider of innovative, scalable custom IT solutions. We specialize in Full Stack
                    Development, UI/UX Design, and Mobile App Development.
                 </p>
                 <p className="text-slate-400 text-lg leading-relaxed mb-8">
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
