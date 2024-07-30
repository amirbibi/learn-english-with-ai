// src/utils/formatters.ts

import React from "react";

export const formatSection = (content: string): React.ReactNode[] => {
  return content.split("\n").map((line, index) => {
    if (line.startsWith("- ")) {
      return <li key={index}>{line.substring(2)}</li>;
    }
    if (line.match(/^[📝👍🔨🚀💡✨💪🧠🌳😃🌟🔍🔼]/u) || line.startsWith("**")) {
      return (
        <h4 key={index} style={{ fontWeight: "bold" }}>
          {line}
        </h4>
      );
    }
    return <p key={index}>{line}</p>;
  });
};
