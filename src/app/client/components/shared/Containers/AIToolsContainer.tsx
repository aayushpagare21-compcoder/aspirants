export const AIToolsContainer = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) => {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex w-full max-w-screen-md flex-grow flex-col items-center gap-4 p-8">
        <div className="mb-4 text-left text-[2rem] leading-none">
          <span className="text-tertiary">AI </span> {heading}
        </div>
        {children}
      </div>
    </div>
  );
};
