import { useState } from "react";
export const useToggleBool = () => {
  const [bool, setBool] = useState(false);
  const toggle = () => {
    setBool(!bool);
    console.log(bool);
  };
  return { bool, toggle };
};
