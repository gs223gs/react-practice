import Header from "../../components/header";
const Form = () => {
  return (
    <div>
      <h1>Contact</h1>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </form>
    </div>
  );
};

export default Form;

