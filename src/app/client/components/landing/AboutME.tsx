"use client";
import Image from "next/image";
import { GithubLogo } from "../shared/Logo/GithubLogo";
import { LinkdenLogo } from "../shared/Logo/Linkden";
import { Medium } from "../shared/Logo/Medium";
import { GmailLogo } from "../shared/Logo/GmailLogo";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

export const AboutMe = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto mt-16 max-w-3xl rounded-lg md:p-12"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-end"
      >
        <Image
          className="h-24 w-24 rounded-full bg-gray-300 md:rounded-none"
          src="/Aayush.jpeg"
          alt="Your Name"
          width={96} // Set width for responsiveness
          height={96} // Set height proportionally
          layout="intrinsic" // Ensures the aspect ratio is preserved
        />

        <div className="flex flex-col items-center justify-center px-4">
          <h2 className="text-2xl font-semibold">
            Hello<span className="text-tertiary"> World!😉</span>
          </h2>
          <div className="mt-2 text-sm text-muted-foreground">
            {`I’m`} <span className="text-tertiary"> Aayush </span> a
            <span className="text-tertiary"> software engineer </span> who
            enjoys solving problems and building impactful products. Outside of
            <span className="text-tertiary">
              {" "}
              software engineer{" "}
            </span> work, {`I’m`} a{" "}
            <span className="text-tertiary"> pianist </span> and a{" "}
            <span className="text-tertiary"> history enthusiast</span>, always
            eager to explore new{" "}
            <span className="text-tertiary"> ideas and perspectives. </span> If{" "}
            {`you’d `}like to connect, feel free to reach out.
          </div>
        </div>
      </motion.div>
      <div className="mb-8 mt-6 flex justify-center gap-2">
        <motion.div variants={itemVariants}>
          <Medium link="https://medium.com/@aayushpagare21" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <GithubLogo link="https://github.com/aayushpagare21-compcoder" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <LinkdenLogo link="https://www.linkedin.com/in/aayush-pagare-5817a81aa/" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <GmailLogo link="mailto:aayushpagare21@gmail.com" />
        </motion.div>
      </div>
    </motion.div>
  );
};
