import { Link } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";


// Responsive feature list component
const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 text-sm sm:text-base">
    {features.map((feature, idx) => (
      <li
        key={idx}
        className="flex items-start p-3 rounded-lg hover:bg-[#39509A]/5 transition-colors duration-300 group"
      >
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300">
          <i className="fas fa-check text-green-500 text-xs"></i>
        </div>
        <span className="text-slate-700 dark:text-slate-300 group-hover:text-[#325fff] dark:group-hover:text-[#325fff] transition-colors duration-300">
          {feature}
        </span>
      </li>
    ))}
  </ul>
);

// Service type definition
interface Service {
  id: string;
  icon: string;
  color: string;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  // {
  //   id: "ai",
  //   icon: "fas fa-robot",
  //   color: "[#39509A]",
  //   title: "AI Solutions",
  //   description:
  //     "Custom artificial intelligence solutions including machine learning models, predictive analytics, and natural language processing.",
  //   features: [
  //     "Machine Learning Model Development",
  //     "Natural Language Processing",
  //     "Computer Vision Systems",
  //     "Predictive Analytics",
  //     "AI Integration with Existing Systems",
  //     "Conversational AI & Chatbots",
  //   ],
  // },
  {
    id: "Camera",
    icon: "fas fa-video",
    color: "[#39509A]",
    title: "Camera & vedio editing",
    description: 
    "Professional video shooting and editing services using high-quality cameras and modern editing tools to create stunning, cinematic content tailored to your vision.",
    features: [
      "High-quality video shooting (HD & 4K resolution)",
      "Professional video editing with smooth transitions",
      "Color correction & grading for cinematic looks",
      "Audio enhancement and noise reduction",
      "Green screen (chroma key) effects",
      "Social media ready formats (YouTube, Instagram, TikTok)",
    ],
  },
  {
    id: "web",
    icon: "fas fa-code",
    color: "[#39509A]",
    title: "Web Development",
    description:
      "Modern web applications built with React, TypeScript, and other cutting-edge technologies to deliver exceptional user experiences.",
    features: [
      "Frontend Development (React, Vue, Angular)",
      "Backend Systems (Node.js, Python, Java)",
      "Progressive Web Applications",
      "E-commerce Platforms",
      "CMS Integration",
      "Performance Optimization",
    ],
  },
  {
    id: "digital-marketing",
    icon: "fas fa-bullhorn",
    color: "[#39509A]",
    title: "Digital Marketing",
    description:
      "Strategic digital marketing services that drive growth, engagement, and conversion through data-driven campaigns and optimization.",
    features: [
      "SEO & Content Strategy",
      "Social Media Marketing",
      "PPC & Paid Advertising",
      "Email Marketing Campaigns",
      "Analytics & Performance Tracking",
      "Conversion Rate Optimization",
    ],
  },
  {
    id: "Graphic Design",
    icon: "fas fa-pen-nib",
    color: "[#39509A]",
    title: "Graphic Design",
    description:
      "Color, form, and creativity combined – our graphic design creates unforgettable visuals that speak directly and clearly.",
    features: [
      "Logo & Brand Identity Design",
      "Marketing Materials",
      "Social Media Posters",
      "Packaging & Product Design",
      "Motion Graphics & Animations",
      "Visual Identity Design",
      "Print Design",
    ],
  },
  {
    id: "cms",
    icon: "fas fa-columns",
    color: "[#39509A]",
    title: "CMS Design",
    description:
      "Custom content management systems that make content creation and management simple, secure, and efficient.",
    features: [
      "Custom CMS Development",
      "WordPress Solutions",
      "Headless CMS Architecture",
      "Content Workflow Automation",
      "Multi-channel Publishing",
      "CMS Migration & Integration",
    ],
  },
  // {
  //   id: "training",
  //   icon: "fas fa-laptop-code",
  //   color: "[#39509A]",
  //   title: "Coding Training",
  //   description:
  //     "Comprehensive training programs to help your team master the latest programming languages and development practices.",
  //   features: [
  //     "Full-stack Development Programs",
  //     "Language-specific Courses",
  //     "DevOps & CI/CD Practices",
  //     "Agile Development Methodology",
  //     "Test-driven Development",
  //     "Code Reviews & Best Practices",
  //   ],
  // },
  // {
  //   id: "mobile",
  //   icon: "fas fa-mobile-alt",
  //   color: "[#39509A]",
  //   title: "Mobile Development",
  //   description:
  //     "Native and cross-platform mobile applications that deliver exceptional experiences across iOS and Android devices.",
  //   features: [
  //     "iOS & Android Native Apps",
  //     "Cross-platform Development (React Native, Flutter)",
  //     "Mobile App Design",
  //     "App Store Optimization",
  //     "App Maintenance & Updates",
  //     "Mobile Backend Services",
  //   ],
  // },
  {
    id: " UI/UX Design",
    icon: "fas fa-vector-square",
    color: "[#39509A]",
    title: " UI/UX Design",
    description:
      "Modern design that simplifies usability while beautifully guiding the user’s experience. We create visually appealing interfaces paired with user experiences that truly meet real needs.",
    features: [
      "User Interface (UI)",
      "User Experience (UX)",
      "Wireframing & Prototyping",
      "Interaction Design",
      "Usability Analysis & Optimization",
      "Responsive & Adaptive Design",
    ],
  },
  // {
  //   id: "ai-agents",
  //   icon: "fas fa-brain",
  //   color: "[#39509A]",
  //   title: "AI Agents for Business",
  //   description:
  //     "Custom AI agents and automation solutions that transform business operations, customer service, and data processing workflows.",
  //   features: [
  //     "Custom GPT Solutions",
  //     "Intelligent Customer Service Agents",
  //     "Document Processing Automation",
  //     "Business Process Automation",
  //     "Data Analysis Agents",
  //     "Multi-agent Systems & Workflows",
  //   ],
  // },
  {
    id: "branding",
    icon: "fas fa-palette",
    color: "[#39509A]",
    title: "Branding",
    description:
      "Comprehensive branding solutions that build memorable, cohesive brand identities that resonate with your target audience.",
    features: [
      "Brand Strategy Development",
      "Visual Identity Design",
      "Logo & Typography",
      "Brand Guidelines",
      "Brand Messaging & Voice",
      "Rebranding & Brand Refresh",
    ],
  },
];

// Floating navigation component
const FloatingNav = ({ services }: { services: Service[] }) => (
  <motion.div initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }} className="fixed right-4 top-28 transform -translate-y-1/2 z-50 hidden xl:block">
    <div className="bg-white dark:bg-[#1E293B] rounded-full shadow-lg p-2 space-y-2">
      {services.map((service: Service) => (
        <a
          key={service.id}
          href={`#${service.id}`}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#325fff] hover:bg-[#39509A]/10 transition-colors duration-300 group relative"
          title={service.title}
        >
          <i className={`${service.icon} text-sm`}></i>
          <span className="absolute right-full mr-2 px-2 py-1 rounded bg-white dark:bg-[#1E293B] shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {service.title}
          </span>
        </a>
      ))}
    </div>
  </motion.div>
);

// Scroll progress component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = `${(scrollPx / winHeightPx) * 100}%`;

      setScrollProgress((scrollPx / winHeightPx) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[#39509A]/10 z-50">
      <div
        className="h-full bg-[#325fff] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

// Scroll to top button component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-white dark:bg-[#1E293B] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#39509A]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <i className="fas fa-arrow-up text-[#325fff] relative z-10"></i>
          </div>
        </button>
      )}
    </>
  );
};

const ServicesPage = () => {
  return (
    <div className="">
      <ScrollProgress />
      <FloatingNav services={services} />
      <ScrollToTop />
      {/* Header */}
      <section className="relative py-16 md:py-24 bg-[#F4F7FC] dark:bg-[#1E293B] overflow-hidden">
        {/* Decorative background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#39509A]/5"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-[#39509A]/5"></div>
          <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-[#39509A]/5"></div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #39509A10 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Small decorative line and text */}
            <div className="flex items-center justify-center mb-6">

              <motion.div initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }} className="h-px w-8 bg-[#325fff] mr-3"></motion.div>

              <motion.span initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }} className="text-[#325fff] font-medium uppercase tracking-wider text-sm">
                What We Offer
              </motion.span>

              <motion.div initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }} className="h-px w-8 bg-[#325fff] ml-3"></motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Our{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#325fff] to-[#325fff] bg-clip-text text-transparent">
                  Services
                </span>
                <svg
                  className="absolute text-[#] -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,3 Q25,5 50,3 T100,3"
                    stroke="#325fff"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Description with enhanced styling */}
            <motion.p initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive technology solutions tailored to your
              business needs. Our expert team delivers innovation, quality, and
              results.
            </motion.p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {[
                { value: "8+", label: "Services Offered", delay: 0 },
                { value: "100+", label: "Projects Completed", delay: 0.2 },
                { value: "50+", label: "Happy Clients", delay: 0.4 },
                { value: "24/7", label: "Support Available", delay: 0.6 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: item.delay }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#325fff] mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>


            {/* Service categories pills */}
            <motion.div initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }} className="flex flex-wrap justify-center gap-3 mt-12">
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="px-4 py-2 rounded-full bg-white dark:bg-[#1E293B]/50 border border-[#39509A]/20 text-sm font-medium text-[#325fff] hover:bg-[#325fff] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <i className={`${service.icon} mr-2`}></i>
                  {service.title}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 fill-white dark:fill-[#0F172A]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg p-8 sm:p-10 border border-[#39509A]/10 dark:border-[#39509A]/20 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  {/* Enhanced decorative gradients */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#39509A]/10 via-[#39509A]/5 to-transparent -z-10 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#39509A]/10 via-[#39509A]/5 to-transparent -z-10 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#39509A]/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#39509A]/5 rounded-full blur-3xl"></div>

                  {/* Enhanced Header with interactive elements */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-[#39509A]/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#325fff] to-[#325fff]/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative">
                        <i
                          className={`${service.icon} text-2xl text-white`}
                        ></i>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-[#325fff] mb-1">
                        <div className="h-px w-10 bg-[#325fff]"></div>
                        <span className="uppercase tracking-wider font-medium">
                          Service {index + 1}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#325fff] to-[#325fff]/80 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  {/* Enhanced Content Grid with better spacing */}
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative">
                    {/* Left Column with improved typography */}
                    <div className="space-y-8">
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <NavLink to="/contact"
                          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[#325fff] hover:bg-[#325fff]/90 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                        >
                          <span className="relative z-10">Get Started</span>
                          <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#39509A]/0 via-white/10 to-[#39509A]/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                        </NavLink>
                        {/* <a
                          href="#"
                          className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#325fff] text-base font-medium rounded-xl text-[#325fff] hover:bg-[#39509A]/10 transition-all duration-300 hover:scale-105 group"
                        >
                          <span>Learn More</span>
                          <i className="fas fa-info-circle ml-2 group-hover:rotate-12 transition-transform duration-300"></i>
                        </a> */}
                      </div>
                    </div>

                    {/* Right Column with enhanced feature list */}
                    <div className="bg-gradient-to-br from-[#F4F7FC] to-white dark:from-[#1E293B]/50 dark:to-[#1E293B] rounded-xl p-6 sm:p-8 shadow-inner relative group">
                      <div className="absolute inset-0 bg-white/50 dark:bg-[#1E293B]/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <h3 className="text-lg font-semibold mb-6 text-[#325fff] flex items-center relative">
                        <div className="w-8 h-8 rounded-lg bg-[#39509A]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                          <i className="fas fa-star text-[#325fff]"></i>
                        </div>
                        Key Features
                      </h3>
                      <div className="relative">
                        <FeatureList features={service.features} />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Service badges */}
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    {index < 3 && (
                      <span className="px-3 py-1 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium flex items-center gap-2">
                        <i className="fas fa-star-half-alt text-[#325fff] text-xs"></i>
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#F4F7FC] to-white dark:from-[#1E293B] dark:to-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#39509A]/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#39509A]/5 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-[#39509A]/10 text-[#325fff] text-sm font-medium mb-4">
              Let's Collaborate
            </span>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#325fff] to-[#325fff]/80 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and how our
              services can help you achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <NavLink to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-[#325fff] hover:bg-[#325fff]/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Contact Our Team <i className="fas fa-arrow-right ml-2"></i>
              </NavLink>
              <NavLink to="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-[#325fff] bg-white dark:bg-[#1E293B] border-2 border-[#325fff] hover:bg-[#39509A]/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View Portfolio <i className="fas fa-images ml-2"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
