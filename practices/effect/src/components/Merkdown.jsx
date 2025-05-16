import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function Markdown() {
  const [mdText, setMdText] = useState("# こんにちは Markdown!");
  return (
    <div>
      <textarea
        rows={6}
        value={mdText}
        onChange={(e) => setMdText(e.target.value)}
      />
      <div style={{ border: "1px solid #ccc", padding: "1em" }}>
        <ReactMarkdown>{mdText}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Markdown;
