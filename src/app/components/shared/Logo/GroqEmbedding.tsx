import Link from "next/link";
import Image from "next/image";

export const Groq = () => {
  return (
    <Link href="https://groq.com" target="_blank" rel="noopener noreferrer">
      <Image
        src="https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg"
        alt="Powered by Groq for fast inference."
        height={100}
        width={100}
      />
    </Link>
  );
};
