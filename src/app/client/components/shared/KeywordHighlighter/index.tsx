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
    color: "pink",
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

  //@ts-ignore
  return <>{getHighlightedText(children, keywords)}</>;
};

export default KeywordHighlighter;
