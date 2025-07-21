import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/use-theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import PrivateRoute from "./dhasbord/PrivateRoute";


// Lazy load components
const Home = lazy(() => import("@/pages/home"));
const Services = lazy(() => import("@/pages/services"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const NotFound = lazy(() => import("./pages/404"));

// Dashboard components
const Dashboard = lazy(() => import("./dhasbord/Dashboard"));
const AddProjectPage = lazy(() => import("./dhasbord/AddProjectPage"));
const MessagesPage = lazy(() => import("./dhasbord/MessagesPage"));
const AddTestimonialPage = lazy(() => import("./dhasbord/AddTestimonialPage"));
const LoginPage = lazy(() => import("./dhasbord/LoginPage"));
const Layout = lazy(() => import("./dhasbord/Layout"));
const AdminRedirect = lazy(() => import("./dhasbord/AdminRedirect"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39509A]"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-[#1E293B]">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Main website routes */}
                <Route path="/" element={ <><Navbar /> <main><Home /></main> <Footer /> </>} />

                <Route path="/services" element={<><Navbar /><main><Services /></main><Footer /></>} />

                <Route path="/about" element={<><Navbar /><main><About /></main><Footer /></>} />

                <Route path="/contact" element={<><Navbar /><main><Contact /></main><Footer /></>} />

                <Route path="/portfolio" element={<><Navbar /><main><Portfolio /></main><Footer /></>} />
                
                {/* Admin login route (public) */}
                <Route path="/admin/login" element={<LoginPage />} />
                
                {/* Admin root route - redirect based on auth status */}
                <Route path="/admin" element={<AdminRedirect />} />
                
                {/* Admin protected routes */}
                <Route path="/admin" element={<PrivateRoute />}>
                  <Route element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="add-project" element={<AddProjectPage />} />
                    <Route path="edit-project/:id" element={<AddProjectPage />} />
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="add-testimonial" element={<AddTestimonialPage />} />
                    <Route path="edit-testimonial/:id" element={<AddTestimonialPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
