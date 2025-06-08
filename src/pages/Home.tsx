import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
    const [delay, setDelay] = useState(0.5);

    const titleText = "Make Better Course Decisions";
    const descriptionText =
        "Our advanced decision-making system helps you evaluate and rank courses based on multiple criteria using the PFS-CIMAS-ARTASI methodology.";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-8 -mt-10"
        >
            <motion.svg
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                width="280"
                height="210"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-2xl"
            >
                {/* Brain outline */}
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    d="M200 50 C 300 50, 350 150, 300 250 C 250 300, 150 300, 100 250 C 50 150, 100 50, 200 50"
                    stroke="#6366f1"
                    strokeWidth="4"
                    fill="none"
                />

                {/* Connected nodes representing decision points */}
                <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 }}
                    cx="150"
                    cy="120"
                    r="10"
                    fill="#818cf8"
                />
                <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3 }}
                    cx="250"
                    cy="120"
                    r="10"
                    fill="#818cf8"
                />
                <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 }}
                    cx="200"
                    cy="180"
                    r="10"
                    fill="#818cf8"
                />
                <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 }}
                    cx="150"
                    cy="220"
                    r="10"
                    fill="#818cf8"
                />
                <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.6 }}
                    cx="250"
                    cy="220"
                    r="10"
                    fill="#818cf8"
                />

                {/* Connection lines */}
                <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.7, duration: 0.3 }}
                    x1="150"
                    y1="120"
                    x2="250"
                    y2="120"
                    stroke="#818cf8"
                    strokeWidth="2"
                />
                <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                    x1="150"
                    y1="120"
                    x2="200"
                    y2="180"
                    stroke="#818cf8"
                    strokeWidth="2"
                />
                <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.9, duration: 0.3 }}
                    x1="250"
                    y1="120"
                    x2="200"
                    y2="180"
                    stroke="#818cf8"
                    strokeWidth="2"
                />
                <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2.0, duration: 0.3 }}
                    x1="200"
                    y1="180"
                    x2="150"
                    y2="220"
                    stroke="#818cf8"
                    strokeWidth="2"
                />
                <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2.1, duration: 0.3 }}
                    x1="200"
                    y1="180"
                    x2="250"
                    y2="220"
                    stroke="#818cf8"
                    strokeWidth="2"
                />
            </motion.svg>

            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-theme-400 flex flex-wrap justify-center"
            >
                {titleText.split(" ").map((word, index) => (
                    <motion.span
                        key={index}
                        initial={{ y: 10 }}
                        animate={{
                            y: [0, -7, 0],
                        }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                        className="inline-block"
                    >
                        {word}&nbsp;
                    </motion.span>
                ))}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-400 text-center max-w-2xl flex flex-wrap justify-center"
            >
                {descriptionText.split(" ").map((word, index) => (
                    <motion.span
                        key={index}
                        initial={{ y: 10 }}
                        animate={{
                            y: [0, -7, 0],
                        }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.05,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                        className="inline-block"
                    >
                        {word}&nbsp;
                    </motion.span>
                ))}
            </motion.p>

            <div className="flex gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onAnimationComplete={() => setDelay(0)}
                >
                    <NavLink
                        to="/calculator"
                        className="bg-theme-400 text-white block w-[120px] py-2 rounded-md text-center"
                    >
                        Get Started
                    </NavLink>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay * 1.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onAnimationComplete={() => setDelay(0)}
                >
                    <Link
                        to="https://docs.google.com/forms/d/e/1FAIpQLSdEHmdIXLdKHnzdc5pjfoz_zmaoKgvK2Kf_XS4giRdRSKffaQ/viewform?usp=dialog"
                        className="border-2 border-theme-400 text-theme-400 block w-[120px] py-2 rounded-md text-center hover:bg-theme-400 hover:text-white transition-all duration-300"
                        target="_blank"
                    >
                        Survey
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Home;
