import React, {useState, useEffect} from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Users2 } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { Eye } from "lucide-react";
import { Target } from "lucide-react";
import {pageTransition, staggerContainer, childVariant, heroPatternCSS,} from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { API_BASE_URL } from './config';


const variants = {
  initial: { x: 300, opacity: 0, },
  animate: { x: 0, opacity: 1, },
  exit: { x: -300, opacity: 0, },
};

type Testimonial = {
  _id: string;
  image: string;
  fullName: string;
  subject: string;
  text: string;
  rating: number;
};

function Portifolio(){

const partners = [
  { name: "Microsoft", icon: "fab fa-microsoft" },
  { name: "AWS", icon: "fab fa-aws" },
  { name: "Google", icon: "fab fa-google" },
  { name: "Salesforce", icon: "fab fa-salesforce" },
];

const services = [
  {
    icon: "fas fa-bullhorn",
    color: "[#39509A]",
    title: "Digital Marketing Solutions",
    description:
      "Strategic digital marketing services that drive growth, engagement, and conversion through data-driven campaigns and optimization.",
    link: "/services#ai",
    tags: ["Digital Marketing", "Social Media Marketing", "Analytics"],
    features: ["Custom Social Media Strategies", "Email Marketing Campaigns", "SEO Optimization Solutions"],
  },
  {
    icon: "fas fa-code",
    color: "[#39509A]",
    title: "Web Development",
    description:
      "Modern web applications built with React, TypeScript, and other cutting-edge technologies to deliver exceptional user experiences.",
    link: "/services#web",
    tags: ["Web", "Frontend", "Backend"],
    features: ["React", "TypeScript", "Node.js"],
  },
  {
    icon: "fas fa-columns",
    color: "[#39509A]",
    title: "CMS Design",
    description:
      "Custom content management systems that make content creation and management simple, secure, and efficient.",
    link: "/services#cms",
    tags: ["CMS", "Content", "Management"],
    features: ["Custom CMS", "Headless CMS", "Content Strategy"],
  },
  {
    icon: "fas fa-pen-nib",
    color: "[#39509A]",
    title: "Graphic Design",
    description:
      "Color, form, and creativity combined – our graphic design creates unforgettable visuals that speak directly and clearly.",
    link: "/services#training",
    tags: ["Training", "Education", "Development"],
    features: ["Custom Training", "Workshops", "Mentoring"],
  },
  // {
  //   icon: "fas fa-mobile-alt",
  //   color: "[#39509A]",
  //   title: "Mobile Development",
  //   description:
  //     "Native and cross-platform mobile applications that deliver exceptional experiences across iOS and Android devices.",
  //   link: "/services#mobile",
  //   tags: ["Mobile", "iOS", "Android"],
  //   features: ["Native Apps", "Cross-platform", "UI/UX"],
  // },
  // {
  //   icon: "fas fa-server",
  //   color: "[#39509A]",
  //   title: "Cloud Solutions",
  //   description:
  //     "Expert cloud architecture, migration, and management services for AWS, Azure, and Google Cloud platforms.",
  //   link: "/services#cloud",
  //   tags: ["Cloud", "DevOps", "Infrastructure"],
  //   features: ["AWS", "Azure", "GCP"],
  // },
];

// Fetch testimonials from backend
const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
const testimonialsPerPage = 3;
const total = testimonials.length;
const canSlide = total > testimonialsPerPage;
const [current, setCurrent] = useState(0);

useEffect(() => {
  fetch(`${API_BASE_URL}/api/testimonials`)
    .then((res) => res.json())
    .then((data) => setTestimonials(data))
    .catch((err) => console.error("Error fetching testimonials:", err));
}, []);

// Auto-play effect only if canSlide
useEffect(() => {
  if (!canSlide) return;
  const interval = setInterval(() => {
    setCurrent((prev) =>
      prev + 1 + testimonialsPerPage > total
        ? 0
        : prev + 1
    );
  }, 3000);
  return () => clearInterval(interval);
}, [total, canSlide]);

const nextSlide = () => {
  setCurrent((prev) =>
    prev + 1 + testimonialsPerPage > total ? 0 : prev + 1
  );
};
const prevSlide = () => {
  setCurrent((prev) =>
    prev - 1 < 0 ? Math.max(0, total - testimonialsPerPage) : prev - 1
  );
};

let visibleTestimonials = testimonials;
if (canSlide) {
  visibleTestimonials = testimonials.slice(current, current + testimonialsPerPage);
  if (visibleTestimonials.length < testimonialsPerPage) {
    visibleTestimonials = [
      ...visibleTestimonials,
      ...testimonials.slice(0, testimonialsPerPage - visibleTestimonials.length),
    ];
  }
}

useEffect(() => {
  window.scrollTo(0, 0);
}, []);



  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 pb-16 md:py-28 bg-[#F4F7FC] dark:bg-[#1E293B] overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#39509A]/5 animate-pulse"></div>
          <div className="absolute top-1/2 -left-12 w-40 h-40 rounded-full bg-[#39509A]/5 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-20 right-1/4 w-56 h-56 rounded-full bg-[#39509A]/5 animate-pulse delay-2000"></div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #39509A10 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="md:w-1/2 md:pr-8 mb-10 md:mb-0"
              variants={childVariant}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#194aff] mr-2 animate-pulse"></span>
                Welcome to corevana Tech
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                variants={childVariant}
              >
                Elevate your business with{" "}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-[#325fff] to-[#4c75ff]/80 bg-clip-text text-transparent">
                    Digital Solutions
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-2 bg-[#39509A]/20 rounded-full -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </span>{" "}
                and smart technology
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl"
                variants={childVariant}
              >
                Empowering your business growth through creative, high-quality digital solutions that drive impact and lasting success.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                variants={childVariant}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[#325fff] hover:bg-[#4c75ff]/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/services"
                    className="inline-flex justify-center items-center px-6 py-3 border-2 border-[#4c75ff] text-base font-medium rounded-xl text-[#4c75ff] hover:bg-[#39509A]/10 shadow-lg hover:shadow-xl transition-all duration-300">
                    Our Services
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="md:w-1/2 relative" variants={childVariant}>
              <motion.div
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-full h-72 sm:h-80 bg-gradient-to-br rom-[#4c75ff]/20 to-[#4c75ff]/10 dark:from-[#4c75ff]/10 dark:to-[#4c75ff]/5 rounded-2xl overflow-hidden p-5 backdrop-blur-sm border border-[#39509A]/10 dark:border-[#39509A]/20 shadow-xl">
                  {/* Animated background elements */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "radial-gradient(circle at 0% 0%, #39509A10 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, #39509A10 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, #39509A10 0%, transparent 50%)",
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Floating elements */}
                  {/* <motion.div
                    className="animate-float"
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute top-8 left-8 w-16 h-16 rounded-xl bg-[#4c75ff]/20 backdrop-blur-md border border-[#4c75ff]/30 shadow-lg"></div>
                    <div className="absolute top-14 right-10 w-12 h-12 rounded-xl bg-[#4c75ff]/20 backdrop-blur-md border border-[#4c75ff]/30 shadow-lg"></div>
                    <div className="absolute bottom-16 left-16 w-20 h-20 rounded-xl bg-[#4c75ff]/20 backdrop-blur-md border border-[#4c75ff]/30 shadow-lg"></div>
                    <div className="absolute bottom-10 right-12 w-24 h-16 rounded-xl bg-[#4c75ff]/20 backdrop-blur-md border border-[#4c75ff]/30 shadow-lg"></div>
                  </motion.div> */}

                  {/* Code visualization */}
                  {/* <div className="relative z-10 mt-4">
                    <motion.div
                      className="inline-block text-4xl mb-4"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <i className="fas fa-code text-[#4c75ff]"></i>
                    </motion.div> */}

                    {/* Code editor style container */}
                    <div className="bg-[#1E93B]/50 rounded-xl p-4 backdrop-blur-sm border border-[#39509A]/20">
                      {/* Code header */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>

                      {/* Code content */}
                      {/* <div className="font-mono text-sm space-y-2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center"
                        >
                          <span className="text-[#39509A]">const</span>
                          <span className="text-green-500 ml-2">future</span>
                          <span className="text-[#39509A]/80 ml-2">=</span>
                          <span className="text-[#39509A]/80 ml-2">await</span>
                          <span className="text-yellow-500 ml-2">corevana</span>
                          <span className="text-[#39509A]/80">.</span>
                          <span className="text-blue-400">build</span>
                          <span className="text-[#39509A]/80">(</span>
                          <span className="text-purple-400">yourIdea</span>
                          <span className="text-[#39509A]/80">);</span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                          className="flex items-center"
                        >
                          <span className="text-[#39509A]">const</span>
                          <span className="text-green-500 ml-2">result</span>
                          <span className="text-[#39509A]/80 ml-2">=</span>
                          <span className="text-yellow-500 ml-2">future</span>
                          <span className="text-[#39509A]/80">.</span>
                          <span className="text-blue-400">transform</span>
                          <span className="text-[#39509A]/80">(</span>
                          <span className="text-purple-400">innovation</span>
                          <span className="text-[#39509A]/80">);</span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 }}
                          className="flex items-center"
                        >
                          <span className="text-[#39509A]">console</span>
                          <span className="text-[#39509A]/80">.</span>
                          <span className="text-blue-400">log</span>
                          <span className="text-[#39509A]/80">(</span>
                          <span className="text-green-500">result</span>
                          <span className="text-[#39509A]/80">);</span>
                        </motion.div>
                      </div> */}
                      <div className="bg-gray-900 text-green-400 font-mono p-6 rounded-lg shadow-xl border border-green-500 w-full max-w-xl mx-auto">
  <div className="mb-2 text-sm text-gray-400">corevana@digital ~ $</div>

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="whitespace-pre-wrap"
  >
    $ initializing your digital vision...
  </motion.p>

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="whitespace-pre-wrap"
  >
    $ connecting to innovation engine...
  </motion.p>

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
    className="whitespace-pre-wrap"
  >
    $ deploying smart technology ⚙️
  </motion.p>

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
    className="text-blue-400 font-bold mt-4"
  >
    ✔ Success: Corevana is now powering your business 🚀
  </motion.p>
</div>

                    </div>

                    {/* Tagline */}
                    <motion.div
                      className="my-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <div className="font-tech text-xl font-medium  dark:text-white">
                        One Stop Solution For everything
                      </div>
                    </motion.div>
                  </div>
                {/* </div> */}
              </motion.div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#39509A] to-[#39509A]/80 rounded-2xl -z-10 opacity-50 blur-2xl"></div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.6, staggerChildren: 0.1 }}
          >

              {/* ------------------------------------------ shirkadaha --------------------------------------------- */}

            {/* {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex justify-center"
                variants={childVariant}
              >
                <div className="h-7 text-[#39509A]/60 dark:text-[#39509A]/40 flex items-center">
                  <i className={`${partner.icon} text-xl mr-2`}></i>
                  <span className="font-medium text-sm">{partner.name}</span>
                </div>
              </motion.div>
            ))} */}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-white dark:bg-[#1E293B] relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#39509A]/5 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#39509A]/5 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-[#39509A]/5 animate-pulse delay-2000"></div>
        </div>



        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16 items-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex w-24 mx-auto items-center px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium mb-10">
              <i className="fas fa-info-circle text-center mr-2"></i>
              About
            </motion.div>
            <div className="sm:flex gap-36 ">
              <div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#4c75ff] to-[#325fff]/80 bg-clip-text text-transparent">
                  Who We Are
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="sm:text-3xl text-lg md:text-lg mb-4 sm:w-[500px]  text-slate-600 dark:text-slate-400 ">
                  At Corevana , we are driven by innovation, powered by passion, and committed to delivering excellence. Founded in 2024, we began as a small startup with a bold vision: to transform the way businesses leverage technology. Today, we stand as a trusted leader in the tech industry, providing cutting-edge solutions that empower clients to thrive in a rapidly evolving digital world.
                </motion.p>
              </div>
              <div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#4c75ff] to-[#325fff]/80 bg-clip-text text-transparent flex items-center gap-2"><Target className="text-[#325fff]"/>
                  Mission
                  </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mt-2">
                  To provide our clients with innovative, high-quality, and affordable design and development services that meet their business needs.
                </motion.p>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4 mt-6 bg-gradient-to-r from-[#4c75ff] to-[#325fff]/80 bg-clip-text text-transparent flex items-center gap-2"><Eye className="text-[#325fff]"/>
                  Vision
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }} 
                  className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mt-2">
                    To become the leading technology solutions provider in Africa, delivering high-quality, globally competitive digital services
                </motion.p>
            </div>
            </div>
          </motion.div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium mb-6"
            >
              <i className="fas fa-cogs mr-2"></i>
              Our Services
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#4c75ff] to-[#325fff]/80 bg-clip-text text-transparent"
            >
              What We Offer
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Comprehensive solutions to help your business grow in the digital age. From high-quality web development to modern and effective services – we've got it all ready for you.
            </motion.p>
          </motion.div>

          {/* Service Categories Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="px-4 py-2 rounded-full bg-[#4c75ff] text-white text-sm font-medium hover:bg-[#325fff]/90 transition-colors duration-300">
              All Services
            </button>
            <button className="px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium hover:bg-[#39509A]/20 transition-colors duration-300">
              Digital Marketing
            </button>
            <button className="px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium hover:bg-[#39509A]/20 transition-colors duration-300">
              Web Development
            </button>
            {/* <button className="px-4 py-2 rounded-full bg-[#39509A]/10 text-[#39509A] text-sm font-medium hover:bg-[#39509A]/20 transition-colors duration-300">
              Mobile Apps
            </button> */}
            <button className="px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium hover:bg-[#39509A]/20 transition-colors duration-300">
              Graphic Design
            </button>
            <button className="px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium hover:bg-[#39509A]/20 transition-colors duration-300">
              CMS Design
            </button>
            <button className="px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium hover:bg-[#39509A]/20 transition-colors duration-300">
              UI/UX Design
            </button>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative bg-white dark:bg-[#1E293B]/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-800/50 hover:border-[#39509A]/20 dark:hover:border-[#39509A]/20"
                variants={childVariant}
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#39509A]/5 to-transparent rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>

                {/* Service icon with animation */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#39509A]/10 flex items-center justify-center">
                    <i
                      className={`${service.icon} text-[#325fff] text-2xl`}
                    ></i>
                  </div>
                </motion.div>

                {/* Service content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#325fff] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-[#39509A]/5 text-[#325fff]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                        >
                          <i className="fas fa-check-circle text-[#325fff] mr-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn more link with animation */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-[#325fff] hover:text-[#39509A]/80 font-medium group"
                    >
                      Learn more
                      <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                    </Link>
                  </motion.div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#39509A]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#39509A]/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-[#325fff] hover:bg-[#4c75ff]/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <i className="fas fa-comments mr-2"></i>
              Talk to an expert
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#F4F7FC] dark:bg-[#1E293B] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#39509A]/5 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#39509A]/5 animate-pulse delay-1000"></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium mb-6"
            >
              <i className="fas fa-star mr-2"></i>
              Why Choose Us
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#325fff] to-[#4c75ff]/80 bg-clip-text text-transparent"
            >
              Trusted by Industry Leaders
            </motion.h2>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-2 gap-x-0 gap-y-2 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
          >
            {[
              {
                number: "100+",
                label: "Projects Completed",
                h: " Trusted Expertise",
                p: "With years of experience in tech and design, we deliver reliable solutions that meet real business needs",
                // icon: "fas fa-check-circle",
              },
              { number: "50+", label: "Happy Clients",
                h: " Creative & Clean Design",
                p: "From websites to user interfaces, we focus on clarity, creativity, and a smooth user experience.",
                // icon: "fas fa-users" 
              },
              { number: "24/7", label: "Support",
                h: "  Secure & Modern Technologies",
                p: "Your security is our priority. We use the latest tools and best practices to keep your data and systems safe.",
                // icon: "fas fa-headset" 
              },
              {
                number: "5+",
                label: "Years Experience",
                h: " Custom & Scalable Solutions",
                p: "Every business is different. We build technology that grows with you, tailored to your specific goals.",
                // icon: "fas fa-calendar-alt",
              },
              {
                number: "5+",
                label: "Years Experience",
                h: " Strong Communication",
                p: "We value transparency and clear communication to keep you informed at every stage of the project.",
                // icon: "fas fa-calendar-alt",
              },
              {
                number: "5+",
                label: "Years Experience",
                h: "Timely & Reliable Execution",
                p: "We deliver projects when promised  with speed, precision, and attention to quality.",
                // icon: "fas fa-calendar-alt",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={childVariant}
              >
                <div className="sm:w-[450px] h-[150px] mx-auto mb-4 rounded-xl bg-slate-50 shadow-lg flex flex-col px-3 items-center justify-center">
                  {/* <h1 className={`${stat.h} text-[#39509A] text-2xl`}></h1> */}
                  <h1 className="text-2xl font-bold text-[#4c75ff]">{stat.h}</h1>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{stat.p}</p>
                </div>
                {/* <div className="text-3xl font-bold text-[#39509A] mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div> */}
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Plans Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold mb-4">Pricing Plans</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Choose the perfect plan for your business needs
              </p>
            </div>

            {/* Pricing Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
            >
              {[
                {
                  name: "Starter",
                  price: "150",
                  description: "Perfect for small businesses and startups",
                  features: [
                    "Simple Logo Design",
                    "Social Media Cover Design",
                    "5 Social media posters ",
                    "Business card & Letterhead",
                    "WordPress website",
                  ],
                  color: "from-blue-500 to-blue-600",
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "400",
                  description: "Ideal for growing businesses",
                  features: [
                    "Business Profile Book Design",
                    "Business card & Letterhead",
                    "Digital Marketing Package (ads setup & 10 post designs)",
                    "social Media Kit ",
                    "Professional MERN Stack Website ",
                  ],
                  color: "from-[#39509A] to-[#39509A]/80",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "1200",
                  description: "For large organizations with complex needs",
                  features: [
                    "Core Branding",
                    "Marketing Collatera",
                    "24/7 Support",
                    "Digital Marketing Package (ads setup & 10 post designs)",
                    "Professional UI / UX Design",
                    "Full-stack website with admin dashboard and advanced functionality",
                  ],
                  color: "from-purple-500 to-purple-600",
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-white dark:bg-[#1E293B]/50 rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? "border-[#325fff] dark:border-[#325fff]" : ""
                  }`}
                  variants={childVariant}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#325fff] text-white text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="text-center  mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-[#325fff]">
                        ${plan.price}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 ml-2">
                        /month
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <i className="fas fa-check-circle text-[#325fff] mr-3"></i>
                        <span className="text-slate-600 dark:text-slate-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/contact"
                    className={`block w-full py-3 px-6 rounded-xl text-center font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-[#325fff] text-white hover:bg-[#4c75ff]/90"
                        : "bg-[#39509A]/10 text-[#325fff] hover:bg-[#39509A]/20"
                    }`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#39509A]/10 text-[#325fff]">
                <i className="fas fa-info-circle mr-2"></i>
                <span>
                  All plans include a 14-day free trial. No credit card
                  required.
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Process Timeline */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold mb-4">Our Process</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                A systematic approach to delivering exceptional results through
                careful planning and execution
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Timeline line with gradient */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#325fff] via-[#39509A]/50 to-[#325fff]"></div>

              {/* Timeline items */}
              {[
                {
                  title: "Discovery",
                  description:
                    "We analyze your requirements and goals to create a tailored solution.",
                  icon: "fas fa-search",
                  details: [
                    "Requirements gathering",
                    "Goal analysis",
                    "Solution planning",
                  ],
                  color: "from-blue-500 to-blue-600",
                  duration: "1-2 Weeks",
                  deliverables: [
                    "Project Scope",
                    "Requirements Doc",
                    "Initial Proposal",
                  ],
                },
                {
                  title: "Planning",
                  description:
                    "Detailed project planning and resource allocation for optimal execution.",
                  icon: "fas fa-tasks",
                  details: [
                    "Resource allocation",
                    "Timeline creation",
                    "Risk assessment",
                  ],
                  color: "from-purple-500 to-purple-600",
                  duration: "2-3 Weeks",
                  deliverables: [
                    "Project Plan",
                    "Resource Schedule",
                    "Risk Matrix",
                  ],
                },
                {
                  title: "Development",
                  description:
                    "Agile development process with regular updates and feedback.",
                  icon: "fas fa-code",
                  details: [
                    "Sprint planning",
                    "Regular updates",
                    "Quality assurance",
                  ],
                  color: "from-green-500 to-green-600",
                  duration: "4-6 Weeks",
                  deliverables: [
                    "Working Prototype",
                    "Feature Implementation",
                    "Code Review",
                  ],
                },
                {
                  title: "Delivery",
                  description:
                    "Thorough testing and smooth deployment of your solution.",
                  icon: "fas fa-rocket",
                  details: [
                    "Testing & QA",
                    "Deployment",
                    "Post-launch support",
                  ],
                  color: "from-orange-500 to-orange-600",
                  duration: "1-2 Weeks",
                  deliverables: ["Final Product", "Documentation", "Training"],
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative mb-16 last:mb-0 ${
                    index % 2 === 0 ? "md:pr-1/2 md:pl-8" : "md:pl-1/2 md:pr-8"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Step number with animation */}
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#1E293B] border-2 border-[#325fff] flex items-center justify-center z-10 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg font-bold text-[#325fff]">
                      {index + 1}
                    </span>
                  </motion.div>

                  {/* Step card with enhanced design */}
                  <div className="relative bg-white dark:bg-[#1E293B]/50 rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl transition-all duration-300 group">
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>

                    {/* Header with enhanced styling */}
                    <div className="flex items-center mb-6">
                      <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mr-4 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className={`${step.icon} text-white text-2xl`}></i>
                      </motion.div>
                      <div>
                        <h4 className="text-2xl font-semibold group-hover:text-[#325fff] transition-colors duration-300">
                          {step.title}
                        </h4>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Duration: {step.duration}
                        </div>
                      </div>
                    </div>

                    {/* Description with improved typography */}
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details list with enhanced styling */}
                    <div className="space-y-3 mb-6">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          className="flex items-center text-base text-slate-600 dark:text-slate-400 group/item"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <i className="fas fa-check-circle text-[#325fff] mr-3 group-hover/item:scale-110 transition-transform duration-200"></i>
                          {detail}
                        </motion.div>
                      ))}
                    </div>

                    {/* Deliverables section */}
                    <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
                      <h5 className="text-sm font-semibold text-[#325fff] mb-3">
                        Key Deliverables
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map(
                          (deliverable, deliverableIndex) => (
                            <span
                              key={deliverableIndex}
                              className="px-3 py-1 text-sm rounded-full bg-[#39509A]/10 text-[#325fff]"
                            >
                              {deliverable}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Progress indicator with enhanced design */}
                    <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Progress
                        </span>
                        <span className="text-[#325fff] font-medium">
                          {Math.round((index + 1) * 25)}%
                        </span>
                      </div>
                      <div className="mt-3 h-3 bg-slate-200/50 dark:bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(index + 1) * 25}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Summary with enhanced design */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-8 py-4 rounded-full bg-[#39509A]/10 text-[#325fff] shadow-lg">
                <i className="fas fa-clock mr-3 text-xl"></i>
                <span className="font-medium text-lg">
                  Average Project Timeline: 8-12 Weeks
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Testimonials */}
          <div className="relative overflow-hidden min-h-[300px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                style={{ position: "absolute", width: "100%" }}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <div key={testimonial._id || index} className="bg-white dark:bg-[#1E293B]/50 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image?.startsWith('http') ? testimonial.image : `${API_BASE_URL}${testimonial.image}`}
                        alt={testimonial.fullName}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.fullName}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {testimonial.subject}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-4 flex text-[#325fff]">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-600">{testimonial.rating}/5</span>
                      {/* {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))} */}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#325fff] to-[#325fff]/80 mix-blend-multiply"></div>
            </div>
            <div className="relative py-16 px-8 sm:py-24 sm:px-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  Let's discuss how our solutions can help you achieve your
                  goals.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-[#325fff bg-white hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Portifolio;
