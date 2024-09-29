import { UserButton } from "@clerk/nextjs";

export const Welcome = () => {
  return (
    <>
      <h1> Welcome User </h1>
      <UserButton />
    </>
  );
};
