export const AIToolsContainer = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) => {
  return (
   <div className="flex justify-center min-h-screen"> 
     <div className="flex flex-col flex-grow gap-4 p-8 h-screen max-w-screen-md items-center">
      <div className="mb-4 text-left text-[2rem] leading-none">
        <span className="text-tertiary">AI </span> {heading}
      </div>
      {children}
    </div>
   </div>
  );
};
