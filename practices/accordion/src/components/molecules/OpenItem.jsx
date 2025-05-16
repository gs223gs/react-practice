const OpenItem = ({ setIsOpen }) => {
  return (
    <div onClick={() => setIsOpen(false)}>
      <div >中身が表示されています！！！</div>
      <div>アコーディオンメニューです！！！！</div>
    </div>
  );
};

export default OpenItem;

