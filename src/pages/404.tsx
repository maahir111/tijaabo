import { motion } from "framer-motion";
import { Link } from "wouter";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1E293B] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-[#39509A] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <NavLink to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#39509A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2A3B7A] transition-colors"
          >
            Go Back Home
          </motion.button>
        </NavLink>
      </motion.div>
    </div>
  );
};

export default NotFound;
