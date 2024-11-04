import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Image from "next/image";
import { HeartFilledIcon } from "@radix-ui/react-icons";

export const BlogIntroCard = ({
  heading,
  description,
  image,
  user,
  date,
  likeCount,
  topics,
  paper,
  words,
}: {
  heading: string;
  description: string;
  image: string;
  user: string;
  date: string;
  likeCount: number;
  topics: string[];
  paper: string;
  words: number;
}) => {
  return (
    <div>
      <Card className="max-h-[500px] max-w-[100vw] overflow-auto p-4 sm:max-w-[50vw]">
        <div>
          <CardHeader>
            <CardTitle className="mb-2 font-[family-name:var(--font-gtsuper-medium)] font-bold leading-[1.2rem]">
              <div className="mb-2 flex gap-2">
                <div className="relative h-6 w-6 overflow-hidden">
                  <Image
                    src={image}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col justify-end text-sm">{user}</div>
              </div>
              <div>{`${heading} (${words} words)`}</div>
            </CardTitle>
            <CardDescription>
              <div className="mb-4 text-muted text-muted-foreground">
                {description}...
              </div>
              <div className="flex justify-center text-primary-foreground">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex items-center gap-1">
                    <div className="text-sm"> {date} </div>
                    <div className="text-sm"> {paper} </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartFilledIcon className="mt-1" />
                    <div> {likeCount} </div>
                  </div>
                  <div className="col-span-2 text-sm">
                    {" "}
                    {topics.map((topic) => topic)}{" "}
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
};
