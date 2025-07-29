import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { pageTransition, staggerContainer, childVariant } from "@/lib/utils"; // Not used
// import { useForm } from "react-hook-form"; // Not used
// import { zodResolver } from "@hookform/resolvers/zod"; // Not used
// import { z } from "zod"; // Not used
// import { apiRequest } from "@/lib/queryClient"; // Not used
// import { useToast } from "@/hooks/use-toast"; // Not used
// import { useLocation } from "wouter"; // Not used
// import { ToastContainer, toast } from 'react-toastify'; // Not used
import { Link } from "react-router-dom";

// Define the Project type
type Project = {
  image: string;
  title: string;
  details: string;
  link: string;
  description: string;
};

function PortfolioPage() {
  const socialLinks = [
    { icon: "fab fa-linkedin-in", url: "https://linkedin.com" },
    { icon: "fab fa-twitter", url: "https://twitter.com" },
    { icon: "fab fa-github", url: "https://github.com" },
    { icon: "fab fa-facebook-f", url: "https://facebook.com" },
  ];

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("https://back123-in3w.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1E293B] ">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#39509A]/5 dark:bg-[#39509A]/10 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#39509A]/5"></div>
          <div className="absolute top-24 -left-16 w-52 h-52 rounded-full bg-[#39509A]/5"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#325fff] my-6">
              Our Latest Projects
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore our latest projects that showcase innovation, quality, and impact.
            </p>
        </motion.div>
        </div>
    </section>

    {/* latest projects */}
    <section>
        <div className="py-10 bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(projects) && projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.image?.startsWith('http') ? project.image : `https://back123-in3w.onrender.com${project.image}`}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <p className="text-sm text-gray-600 mb-4">{project.details?.slice(0, 80)}</p>
                <a target="_blank" href={project.link}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>

    {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#325fff] to-[#325fff]/80 rounded-3xl p-12 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="relative">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
                    <i className="fas fa-rocket mr-2"></i>
                    Ready to Start?
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                    Let's discuss how we can help transform your business with our
                    innovative solutions.
                  </p>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-[#325fff] rounded-xl font-medium hover:bg-white/90 transition-colors duration-300"
                    >
                      Get in Touch
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
    </div>
  );
};

export default PortfolioPage;
