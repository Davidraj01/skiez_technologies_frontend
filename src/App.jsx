import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { SeoProvider } from "./lib/seo";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Career = lazy(() => import("./pages/Career"));
const Contact = lazy(() => import("./pages/Contact"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const PrivacyTechnologies = lazy(() => import("./pages/Privacy"));
const TermsTechnologies = lazy(() => import("./pages/Terms"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogForm = lazy(() => import("./pages/admin/AdminBlogForm"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminSeo = lazy(() => import("./pages/admin/AdminSeo"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-10 h-10 animate-spin text-navy-700" />
  </div>
);

const SiteLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="relative bg-white text-navy-900 min-h-screen overflow-hidden">
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? "min-h-screen" : "pt-20 md:pt-24 min-h-screen"}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0e1424",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              fontSize: "14px",
            },
          }}
        />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/privacy" element={<PrivacyTechnologies />} />
            <Route path="/terms" element={<TermsTechnologies />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blogs/new"
              element={
                <ProtectedRoute>
                  <AdminBlogForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blogs/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminBlogForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/seo"
              element={
                <ProtectedRoute>
                  <AdminSeo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute>
                  <AdminMessages />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <SeoProvider>
          <SiteLayout />
        </SeoProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};

export default App;
