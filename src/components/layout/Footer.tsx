import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    toast.success("Thank you! You have successfully subscribed.");
    setEmail("");
  };

  return (
    <footer className="bg-[#F4F7FC] dark:bg-[#1E293B] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#39509A]/5 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#39509A]/5 animate-pulse delay-1000"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center">
              <img
                className="w-[180px]"
                src="https://i.postimg.cc/tTq8cd1p/Screenshot-2025-07-20-105044-removebg-preview.png"
                alt=""
              />
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Building innovative software solutions that transform businesses
              and drive growth in the digital age.
            </p>
            <div className="flex space-x-4">
              {["facebook", "twitter", "linkedin", "github"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#39509A]/10 flex items-center justify-center text-[#325fff] hover:bg-[#325fff] hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fab fa-${social}`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#325fff]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Portfolio", to: "/portfolio" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to }) => (
                <NavLink key={label} to={to}>
                  <li className="text-slate-600 dark:text-slate-400 hover:text-[#325fff] transition-colors duration-300 flex items-center">
                    <i className="fas fa-chevron-right text-xs mr-2 text-[#325fff]"></i>
                    {label}
                  </li>
                </NavLink>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#325fff]">
              Our Services
            </h3>
            <ul className="space-y-4">
              {[
                "Digital Marketing",
                "Graphic Design",
                "CMS Design",
                "Web Development",
              ].map((service) => (
                <motion.li key={service} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <NavLink
                    to="/services"
                    className="text-slate-600 dark:text-slate-400 hover:text-[#325fff] transition-colors duration-300 flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2 text-[#325fff]"></i>
                    {service}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#325fff]">Contact Us</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: "fas fa-map-marker-alt",
                  text: "Muqdisho, Somalia",
                },
                {
                  icon: "fas fa-phone",
                  text: "+252 616289502",
                },
                {
                  icon: "fas fa-envelope",
                  text: "info@corevanatech.com",
                },
                {
                  icon: "fas fa-clock",
                  text: "Sat - Thur: 8:00 AM - 5:00 PM",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3 text-slate-600 dark:text-slate-400"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className={`${item.icon} text-[#325fff] mt-1`}></i>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-[#325fff] mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Stay updated with our latest news, insights, and industry trends.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-[#1E293B]/50 focus:outline-none focus:ring-2 focus:ring-[#325fff] focus:border-transparent transition-all duration-300"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-[#325fff] text-white font-medium hover:bg-[#325fff]/90 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </form>
            <Toaster />
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} corevana. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-slate-600 dark:text-slate-400 hover:text-[#325fff] text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-600 dark:text-slate-400 hover:text-[#325fff] text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
