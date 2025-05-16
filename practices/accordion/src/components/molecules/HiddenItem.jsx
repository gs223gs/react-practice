const HiddenItem = ({ setIsOpen }) => {
  return <div onClick={() => setIsOpen(true)}>閉じています！</div>;
};

export default HiddenItem;

