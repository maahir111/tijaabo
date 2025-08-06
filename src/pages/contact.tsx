import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pageTransition, staggerContainer, childVariant } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ToastContainer, toast } from 'react-toastify';

function ContactPage() {

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      color: "blue",
      title: "Location",
      content: ["123 Tech Avenue", "San Francisco, CA 94107"],
    },
    {
      icon: "fas fa-envelope",
      color: "indigo",
      title: "Email",
      content: [
        { text: "info@relsoft.com", link: "mailto:info@relsoft.com" },
        { text: "support@relsoft.com", link: "mailto:support@relsoft.com" },
      ],
    },
    {
      icon: "fas fa-phone",
      color: "violet",
      title: "Phone",
      content: [
        { text: "+1 (415) 555-0123", link: "tel:+14155550123" },
        { text: "+1 (415) 555-0124", link: "tel:+14155550124" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "fab fa-linkedin-in", url: "https://linkedin.com" },
    { icon: "fab fa-twitter", url: "https://twitter.com" },
    { icon: "fab fa-github", url: "https://github.com" },
    { icon: "fab fa-facebook-f", url: "https://facebook.com" },
  ];

  const [result, setResult] = React.useState("");
  const [showResult, setShowResult] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "b7dce00f-c89f-4a65-959c-37d8973e8a02");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("We'll get back to you as soon as possible.");
      setShowResult(true);
      (event.target as HTMLFormElement).reset(); // saxitaan muhiim ah
    } else {
      console.log("Error", data);
      setResult(data.message);
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setShowResult(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showResult]);

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
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have a question or want to discuss your project? We're here to
              help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#F4F7FC] dark:bg-[#1E293B] p-8 rounded-2xl shadow-lg h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold text-[#325fff] mb-6">
                Contact Information
              </h2>
              <div className="space-y-6 flex-grow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#39509A]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#325fff]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Address
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      mogadisho, somaila
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#39509A]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#325fff]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      info@corevana.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#39509A]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#325fff]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +252 616289502
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#39509A]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#325fff]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Working Hours
                    </h3>
                    <div className="space-y-1 text-gray-600 dark:text-gray-300">
                      <p>Saturday -  Wednesday: 8:00 AM - 5:00 PM</p>
                      <p>Thursday: 10:00 AM - 3:00 PM</p>
                      <p>Friday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#F4F7FC] dark:bg-[#1E293B] p-8 rounded-2xl shadow-lg h-full flex flex-col">
              <h2 className="text-2xl font-bold text-[#325fff] mb-6">Send us a Message</h2>
              <form onSubmit={onSubmit} className="space-y-6 flex-grow flex flex-col">
                <div className="flex-grow space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input type="text" name="name" placeholder="Name" required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#325fff] focus:border-transparent transition-colors"/>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE"></input>
                    <input type="email" name="email" placeholder="Email" required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#325fff] focus:border-transparent transition-colors"/>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input type="text" name="subject"  placeholder="subject" required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#325fff] focus:border-transparent transition-colors"/>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea name="message"  placeholder="message" required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#325fff] focus:border-transparent transition-colors resize-none"></textarea>
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#325fff] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#325fff] transition-colors mt-auto">
                  Summit
                </button>
              </form>
            </motion.div>
            {result && showResult && (
              <span className="fixed right-10 bottom-10 bg-slate-200 p-10 rounded-lg">{result}</span>
            )}
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Find answers to common questions about our services and process
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What services do you offer?",
                  answer:
                    "We provide comprehensive solutions including Digital Marketing, Graphic Design, Mobile Development, UI/UX Design — all tailored to help your business grow.",
                },
                {
                  question: "How do you approach new projects?",
                  answer:
                    "We begin with a discovery phase to understand your business goals and requirements. Then we create a detailed proposal and roadmap. Once approved, we follow an agile development process with regular updates and feedback sessions to ensure the final product meets your expectations.",
                },
                {
                  question: "What is your typical timeline for projects?",
                  answer:
                    "Project timelines vary based on complexity and scope. Simple websites might take 4-6 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial proposal after understanding your specific requirements.",
                },
                {
                  question: "Do you work with international clients?",
                  answer:
                    "Absolutely. Garaad Tech proudly works with clients from all over the world remotely.",
                },
                {
                  question: "Can I request revisions after the project is complete?",
                  answer:
                    "Yes. We include a set number of revisions in our packages to ensure you’re completely satisfied.",
                },
                {
                  question:
                    "Do you provide maintenance and support after launch?",
                  answer:
                    "Yes, we offer ongoing maintenance and support packages to keep your application secure, up-to-date, and running smoothly. We can customize a support plan based on your specific needs and budget.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;