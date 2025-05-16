import "./App.css";
const Header = () => {
  return (
    <div className="outline-solid m-5">
      <header className=" flex items-center justify-between p-4 bg-gray-100 ">
        <h1 className="text-4xl">hello css</h1>
        <nav>
          <a href="#" className="outline-solid outline-gray-400 p-1 m-1">
            home
          </a>
          <a href="#" className="outline-solid outline-gray-400 p-1 m-1">
            about
          </a>
          <a href="#" className="outline-solid outline-gray-400 p-1 m-1">
            contact
          </a>
        </nav>
      </header>
    </div>
  );
};

const Imag = () => {
  return (
    <img
      src="https://skillicons.dev/icons?i=react"
      alt=""
      className=" p-5 outline-solid "
    />
  );
};

const Images = () => {
  return (
    <div className="grid grid-cols-4 gap-2 place-items-center p-10 m-10 outline-solid">
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
      <Imag />
    </div>
  );
};


function App() {
  return (
    <>
      <body className="flex flex-col h-screen">
        <Header />
        <main className=" flex-1 overflow-y-auto mt-20">
          <div>
            <div className="flex justify-center items-center p-10 m-10 outline-solid ">
              <div className="p-10 justify-center items-center">
                <p>hello!</p>
              </div>
              <div className="p-10 justify-center items-center">
                <p>CSS!</p>
              </div>
            </div>
            <div className=" sm:text-2xl md:text-4xl lg:text-8xl ">
              <h1>レスポンシブ</h1>
            </div>
            <Images />
          </div>
          <div className=" m-10">
            <h1 className=" text-5xl">Flex-box practice flex-box</h1>
            <div className=" flex justify-between">
              <div className=" w-[30%] bg-red-300 p-5 text-center">BOX1</div>
              <div className=" w-[30%] bg-red-300 p-5 text-center">BOX2</div>
              <div className=" w-[30%] bg-red-300 p-5 text-center">BOX3</div>
            </div>
          </div>
          <div className=" m-10 ">
            <h1 className=" text-5xl">Flex-box practice reverse</h1>
            <div className=" flex flex-wrap-reverse justify-between">
              <div className=" w-[50%] bg-red-300 p-5 text-center outline-solid m-3">
                BOX1
              </div>
              <div className=" w-[50%] bg-red-300 p-5 text-center outline-solid m-3">
                BOX2
              </div>
              <div className=" w-[50%] bg-red-300 p-5 text-center outline-solid m-3">
                BOX3
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
}

export default App;
