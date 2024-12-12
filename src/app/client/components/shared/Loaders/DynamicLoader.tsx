"use client";
import { useState, useEffect } from "react";

interface DynamicLoaderProps {
  messages: string[];
}

const DynamicLoader = ({ messages }: DynamicLoaderProps) => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [timer, setTimer] = useState(60); // Initialize the timer at 60 seconds

  // Handles the message switching logic
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) =>
        prevIndex < messages.length - 1 ? prevIndex + 1 : prevIndex,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  // Updates the current message whenever the message index changes
  useEffect(() => {
    setCurrentMessage(messages[messageIndex]);
  }, [messageIndex, messages]);

  // Handles the countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="flex h-[100%] w-[100%] flex-col items-center justify-center gap-8">
      <div className="text-center text-[1.5rem] font-semibold text-black">
        <em>{currentMessage}</em>
      </div>
      <div className="text-[2rem] font-bold text-red-500">{timer}</div>
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>

      <style jsx>{`
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        .circle {
          width: 1rem;
          height: 1rem;
          background-color: #d7265e;
          border-radius: 50%;
          animation: bounce 1.2s infinite;
        }
        .circle:nth-child(2) {
          animation-delay: 0.2s;
        }
        .circle:nth-child(3) {
          animation-delay: 0.4s;
        }
        .circle:nth-child(4) {
          animation-delay: 0.6s;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1rem);
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicLoader;
