import { useState } from "react";
import HiddenItem from "../molecules/HiddenItem";
import OpenItem from "../molecules/OpenItem";
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen ? (
        <OpenItem setIsOpen={setIsOpen} />
      ) : (
        <HiddenItem setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default Menu;
