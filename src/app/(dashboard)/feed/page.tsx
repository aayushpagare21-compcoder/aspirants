import { BlogIntroCard } from "../../components/dashboard/blog";
import { Divider } from "@/app/components/shared/Divider/Divider";

export default async function WelcomePage() {
  const rawTopics = ["Science and Technology", "Sociology"];
  const topics = rawTopics.map((t, i) =>
    i === rawTopics.length - 1 ? `${t}` : `${t} | `,
  );
  return (
    <div>
      <Divider />
      <div className="mt-4 flex flex-col items-center justify-center gap-8">
        <BlogIntroCard
          heading="Discuss the key drivers and challenges in India's innovation ecosystem. Suggest measure for growth of innovation ecosystem in India"
          description="India's innovation landscape has been on a remarkable upward trajectory, as evidenced by its climb from 81st to 40th position in the Global Innovation Index between 2015 and 2022."
          image="https://lh3.googleusercontent.com/a/ACg8ocLWwz8dK3VxzfEOHBXoLySEzZ4piv9oDdvmBwil_HCBlMNFIdoL=s96-c"
          user="Aayush Pagare"
          date="30 Oct, 2024"
          paper="GS Paper-1"
          topics={topics}
          likeCount={50}
          words={250}
          marks={15}
        />
        <BlogIntroCard
          heading="Discuss the key drivers and challenges in India's innovation ecosystem. Suggest measure for growth"
          description="India's innovation landscape has been on a remarkable upward trajectory, as evidenced by its"
          image="https://lh3.googleusercontent.com/a/ACg8ocLWwz8dK3VxzfEOHBXoLySEzZ4piv9oDdvmBwil_HCBlMNFIdoL=s96-c"
          user="Aayush Pagare"
          date="30 Oct, 2024"
          paper="GS Paper-1"
          topics={topics}
          likeCount={50}
          words={250}
          marks={15}
        />
        <BlogIntroCard
          heading="Discuss the key drivers and challenges in India's innovation ecosystem. Suggest measure for growth of innovation ecosystem in India"
          description="India's innovation landscape has been on a remarkable upward trajectory, as evidenced by its climb from 81st to 40th position in the Global Innovation Index between 2015 and 2022."
          image="https://lh3.googleusercontent.com/a/ACg8ocLWwz8dK3VxzfEOHBXoLySEzZ4piv9oDdvmBwil_HCBlMNFIdoL=s96-c"
          user="Aayush Pagare"
          date="30 Oct, 2024"
          paper="GS Paper-1"
          topics={topics}
          likeCount={50}
          words={250}
          marks={15}
        />
      </div>
    </div>
  );
}
