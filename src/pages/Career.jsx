import React, { useMemo, useState } from "react";
import jobsData from "../data/jobs.json";
import internshipsData from "../data/internships.json";
import traineeCoursesData from "../data/traineeCourses.json";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  MapPin,
  Clock,
  IndianRupee,
  X,
  Upload,
  ChevronRight,
  Heart,
  Globe,
  Zap,
  Users,
  Coffee,
} from "lucide-react";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

export default function Careers() {
  const [activeTab, setActiveTab] = useState("internships");
  const [selected, setSelected] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    resumeFile: null,
  });
  const [err, setErr] = useState("");

  const rawList =
    activeTab === "jobs"
      ? jobsData
      : activeTab === "internships"
      ? internshipsData
      : traineeCoursesData;

  const list = useMemo(() => rawList || [], [rawList]);

  const openDetails = (item) => {
    setSelected(item);
    setApplyOpen(false);
    setErr("");
  };

  const openApply = (item) => {
    setSelected(item);
    setApplyOpen(true);
    setErr("");
  };

  const handleForm = (e) => {
    const { name, value, files } = e.target;
    if (name === "resumeFile") {
      setForm((p) => ({ ...p, resumeFile: files?.[0] || null }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.name || !form.phone || !form.email || !form.resumeFile) {
      setErr("All fields are required.");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("phone", form.phone);
    fd.append("email", form.email);
    fd.append("roleId", selected?.id || "");
    fd.append("roleTitle", selected?.title || "");
    fd.append("category", activeTab);
    fd.append("resume", form.resumeFile);

    try {
      setSubmitting(true);
      await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
        }/api/apply`,
        fd
      );
      toast.success("Application submitted successfully!");
      setApplyOpen(false);
      setForm({ name: "", phone: "", email: "", resumeFile: null });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    { icon: <Globe className="w-6 h-6 text-blue-400" />, title: "Remote Friendly", desc: "Work from anywhere." },
    { icon: <Heart className="w-6 h-6 text-red-400" />, title: "Health & Wellness", desc: "Comprehensive health coverage." },
    { icon: <Zap className="w-6 h-6 text-yellow-400" />, title: "Growth", desc: "Learning budget & mentorship." },
    { icon: <Users className="w-6 h-6 text-purple-400" />, title: "Great Culture", desc: "Collaborative and fun team." },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* HERO SECTION */}
      <section className="relative py-20 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0 mix-blend-overlay"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative z-10 max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/50 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm">
            We are hiring!
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Join the <span className="text-cyan-500">Innovation</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            At Skiez, we build technology that shapes the future. Discover your next challenge and grow with a team of passionate creators.
          </p>
        </motion.div>
      </section>

      {/* BENFITS SECTION */}
      <section className="py-12 px-6 border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700">{b.icon}</div>
                <div>
                  <h3 className="font-semibold text-white">{b.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT Area */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "internships", label: "Internships", icon: <GraduationCap className="w-4 h-4" /> },
            { id: "jobs", label: "Full-time Jobs", icon: <Briefcase className="w-4 h-4" /> },
            { id: "trainee", label: "Trainee Programs", icon: <BookOpen className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelected(null);
                setApplyOpen(false);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-900/20"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* LISTINGS GRID */}
        <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {list.length > 0 ? (
            list.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeIn}
                className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/10 flex flex-col h-full"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="p-2 bg-slate-800 rounded-lg">
                        {activeTab === 'jobs' ? <Briefcase className="w-5 h-5 text-slate-400"/> : activeTab === 'internships' ? <GraduationCap className="w-5 h-5 text-slate-400"/> : <BookOpen className="w-5 h-5 text-slate-400"/>}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {item.shortDescription || item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.location && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    )}
                    {item.duration && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
                        <Clock className="w-3 h-3" /> {item.duration}
                      </span>
                    )}
                    {(item.fee || item.salary || item.stipend) && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-xs text-emerald-400">
                        <IndianRupee className="w-3 h-3" /> {item.fee || item.salary || item.stipend}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800 flex gap-3">
                  <button
                    onClick={() => openDetails(item)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => openApply(item)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors shadow-lg shadow-cyan-900/20"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
                <p className="text-slate-500 text-lg">No openings available at the moment. Check back soon!</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {/* DETAILS MODAL */}
        {selected && !applyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                 <h2 className="text-3xl font-bold text-white mb-2">{selected.title}</h2>
                 <div className="flex flex-wrap gap-3">
                    {selected.location && <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">{selected.location}</span>}
                    {selected.duration && <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">{selected.duration}</span>}
                 </div>
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
                <p>{selected.fullDescription || selected.description || selected.shortDescription}</p>

                {selected.responsibilities && selected.responsibilities.length > 0 && (
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Responsibilities</h4>
                        <ul className="space-y-2 list-none pl-0">
                            {selected.responsibilities.map((r, i) => (
                                <li key={i} className="flex gap-3 text-sm">
                                    <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5"/>
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selected.requirements && selected.requirements.length > 0 && (
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                        <ul className="space-y-2 list-none pl-0">
                            {selected.requirements.map((r, i) => (
                                <li key={i} className="flex gap-3 text-sm">
                                    <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5"/>
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-800 flex justify-end gap-3">
                <button onClick={() => setSelected(null)} className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors">Close</button>
                <button onClick={() => setApplyOpen(true)} className="px-8 py-3 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/20">Apply Now</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* APPLY MODAL */}
        {applyOpen && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => { setApplyOpen(false); setErr(""); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
               <button
                onClick={() => { setApplyOpen(false); setErr(""); }}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-1">Apply Now</h2>
              <p className="text-slate-400 text-sm mb-6">Applying for <span className="text-cyan-400">{selected.title}</span></p>

              <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Full Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleForm}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                        placeholder="John Doe"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Phone Number</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleForm}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                        placeholder="+91 9876543210"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleForm}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                        placeholder="john@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Resume (PDF/DOC)</label>
                    <div className="relative">
                        <input
                            type="file"
                            name="resumeFile"
                            onChange={handleForm}
                            accept=".pdf,.doc,.docx"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            required
                        />
                        <div className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center gap-3 text-slate-400">
                            <Upload className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm truncate w-full">
                                {form.resumeFile ? form.resumeFile.name : "Click to upload resume"}
                            </span>
                        </div>
                    </div>
                </div>

                {err && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {err}
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={() => { setApplyOpen(false); setErr(""); }}
                        className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-3 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
