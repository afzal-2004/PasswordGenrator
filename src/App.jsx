/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [cpyMessage, setCoppyMessage] = useState("");
  const PasswordRef = useRef(null);

  const PasswordGenrate = useCallback(() => {
    let Pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_}{[]:';.>,</?`~|";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      Pass += str.charAt(char);
    }
    setPassword(Pass);
  }, [length, charAllowed, numberAllowed, setPassword]);
  const CopyClipBoard = useCallback(() => {
    PasswordRef.current?.select();

    window.navigator.clipboard.writeText(Password);
    setPassword("");
  }, [Password]);

  useEffect(() => {
    PasswordGenrate();
  }, [length, charAllowed, numberAllowed, PasswordGenrate]);

  return (
    <>
      <center>
        <div className=" bg-slate-600 p-2 rounded-xl  sm:w-[500px] ">
          <h1 className="  lg:text-2xl sm: text-xl  sm:max-w-md text-center text-[20px]   font-semibold w-[100%]">
            {" "}
            Password Genrater
          </h1>
          <p className="text-sm mt-[5%]  opacity-40 text-white block  h-[22px] ">
            {cpyMessage}
          </p>

          <div className=" w-full flex cursor-pointer mt-[5%]">
            <input
              type="text"
              readOnly
              value={Password}
              ref={PasswordRef}
              placeholder={`Password`}
              className=" w-[85%]   p-2  rounded-xl cursor-pointer "
            />
            <button
              className=" bg-green-600 py-2  px-4 rounded-xl   ml-[3%]"
              onClick={() => {
                CopyClipBoard();
                // setCoppyMessage("Copied");
                Password.length === 0
                  ? setCoppyMessage("Please genrate An Valid password")
                  : setCoppyMessage("Copied");
              }}
            >
              Copy
            </button>
          </div>
          <div className=" mt-[5%] flex flex-col justify-evenly">
            <section className=" flex justify-start items-center  sm:gap-x-5 gap-x-3 ">
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                onChange={(e) => {
                  setlength(e.target.value);
                  setCoppyMessage("");
                }}
                className=" w-[70%] bg-blue-500 cursor-pointer"
              />
              <label
                htmlFor="Range"
                className=" flex   font-semibold items-center  text-white w-[25%]  justify-between
                sm:justify-evenly"
              >
                <p>Length</p>
                <p>{length}</p>
              </label>
            </section>
            <section className=" flex justify-start items-center  sm:gap-x-5 gap-x-3">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed(!charAllowed);
                  setCoppyMessage("");
                }}
              />
              <label
                htmlFor="Range"
                className=" flex   font-semibold items-center  text-white  justify-between
                sm:justify-evenly"
              >
                <p> Special Character</p>
              </label>
            </section>
            <section className=" flex justify-start items-center  sm:gap-x-5 gap-x-3">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setnumberAllowed(!numberAllowed);
                  setCoppyMessage("");
                }}
              />
              <label
                htmlFor=""
                className=" flex   font-semibold items-center  text-white  justify-between
                sm:justify-evenly"
              >
                <p> Numbers</p>
              </label>
            </section>
          </div>
          <button
            className=" border border-red-300 rounded-2xl text-white bg-blue-500  font-semibold px-3  py-2 "
            onClick={() => {
              PasswordGenrate();
              setCoppyMessage("");
              console.log(Password);
            }}
          >
            {" "}
            Genrate Password
          </button>
        </div>
      </center>
    </>
  );
}

export default App;
