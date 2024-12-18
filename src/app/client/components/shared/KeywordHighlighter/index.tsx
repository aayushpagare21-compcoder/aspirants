import React from "react";

interface KeywordHighlighterProps {
  children: React.ReactNode;
  keywords: string[];
  highlightStyle?: React.CSSProperties;
}

const KeywordHighlighter: React.FC<KeywordHighlighterProps> = ({
  children,
  keywords,
  highlightStyle,
}) => {
  const defaultHighlightStyle: React.CSSProperties = {
    color: "#D7265E",
  };

  const style = highlightStyle || defaultHighlightStyle;

  const getHighlightedText = (text: string, keywords: string[]) => {
    const regex = new RegExp(`(${keywords.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      keywords.some(
        (keyword) => keyword.toLowerCase() === part.toLowerCase(),
      ) ? (
        <span key={index} style={style}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  //@ts-expect-error: yeah this is neccessary to shut the lint up.
  return <>{getHighlightedText(children, keywords)}</>;
};

export default KeywordHighlighter;
