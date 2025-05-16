import { useState, useEffect } from "react";

const AutoForm = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(localStorage.getItem("textarea"));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("textarea", text);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <>
      <p>Formです！</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
    </>
  );
};

export default AutoForm;
