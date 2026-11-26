"use client";
import React, { useRef, useState } from "react"; // Added useState
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../lib/api";
import { Seo, useSeoSettings, organizationSchema, breadcrumbSchema } from "../lib/seo";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const settings = useSeoSettings();
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Sending your message…");
    const formData = new FormData(form.current);

    api
      .post("/contact", {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      })
      .catch((err) => console.error("Couldn't save message:", err.message));

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      () => {
        toast.success("Message sent successfully! 🎉", { id: toastId });
        form.current.reset();
        setLoading(false);
      },
      (error) => {
        console.error(error.text);
        toast.error("Something went wrong. Please try again 😢", {
          id: toastId,
        });
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-white min-h-screen text-navy-900 font-sans overflow-x-hidden">
      <Seo page="contact" fallbackTitle="Contact | Skiez Technologies" jsonLd={[{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Skiez Technologies", mainEntity: organizationSchema(settings) }, breadcrumbSchema(settings, [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
           <div className="absolute inset-0 bg-grid" />
           <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full glow-brand" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="inline-block mb-4"
            >
                <span className="eyebrow">
                    Get in Touch
                </span>
            </motion.div>
            
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gradient-muted font-display !leading-[1.05] !tracking-[-0.035em]"
            >
                Let's have a talk.
            </motion.h1>
            
            <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
                Have a project in mind? We'd love to hear from you.
            </motion.p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10 pb-24">
        
        {/* Contact Info & Map */}
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
        >
            <div className="surface surface-hover rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Contact Info</h2>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <div className="p-3 rounded-xl border border-navy-100 bg-navy-50 text-navy-700">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 font-medium uppercase tracking-wide">Phone</p>
                            <a href="tel:+918220043041" className="text-lg font-semibold text-navy-900 hover:text-navy-700 transition-colors">+91 82200 43041</a>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="p-3 rounded-xl border border-navy-100 bg-navy-50 text-navy-700">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 font-medium uppercase tracking-wide">Email</p>
                            <a href="mailto:info@skiezdigital.com" className="text-lg font-semibold text-navy-900 hover:text-navy-700 transition-colors">info@skiezdigital.com</a>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="p-3 rounded-xl border border-navy-100 bg-navy-50 text-navy-700">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 font-medium uppercase tracking-wide">Address</p>
                            <p className="text-lg font-semibold text-navy-900 leading-snug">Chengalpattu / Chennai, Tamil Nadu, India</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200 h-[300px] relative grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl">
                <iframe
                    title="Skiez Technologies Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.254693386756!2d80.00480307428212!3d12.675498221302535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52fc27ea82ab43%3A0x881f8239a8d025af!2sSkiez%20Technologies%20India%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1768193287643!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="surface rounded-[2rem] p-8 md:p-10 relative overflow-hidden backdrop-blur-md">
                 <div className="absolute top-0 right-0 w-64 h-64 glow-brand rounded-full -translate-y-1/2 translate-x-1/2" />
                 
                 <h2 className="relative z-10 text-3xl font-bold text-navy-900 mb-2">Send us a message</h2>
                 <p className="relative z-10 text-slate-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                 <form ref={form} onSubmit={sendEmail} className="relative z-10 space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600 ml-1">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="field"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-600 ml-1">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="field"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-600 ml-1">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            required
                            className="field resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full !py-4 mt-4 !rounded-xl text-base disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                 </form>
            </div>
        </motion.div>
      </section>
    </div>
  );
}
