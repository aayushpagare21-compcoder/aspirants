export const AIToolsContainer = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) => {
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center">
      <div className="flex w-[100vw] flex-col items-center gap-4 p-8 md:w-[50vw]">
        <div className="mb-4 text-left text-[2rem] leading-none">
          <span className="text-tertiary">AI</span> {heading}
        </div>
        {children}
      </div>
    </div>
  );
};
