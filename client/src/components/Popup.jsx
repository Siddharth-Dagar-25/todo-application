import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const [input, setInput] = useState(popupContent.text);

  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
      });
  };

  return (
    <div className="backdrop fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 grid place-items-center">
  <div className="popup relative bg-gray-600 w-full sm:w-[400px] max-w-[90%] h-auto p-4">
    <RxCross1 className="cross absolute top-0 right-0 m-2.5 cursor-pointer" onClick={() => setShowPopup(false)} />
    <h1 className="text-center font-extrabold text-2xl p-2 text-white">Update ToDo</h1>

    <div className="popup__input_holder mt-7.5 flex flex-col sm:flex-row justify-center gap-2.5 pb-7.5 px-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Update ToDo..."
        className="bg-white text-black placeholder-gray-700 w-full h-[35px] px-2 rounded-xl mb-2 sm:mb-0"
      />
      <button className="bg-red-500 text-xl w-full sm:w-[105px] h-[30px] text-white hover:bg-red-400 rounded-lg" onClick={updateToDo}>Update</button>
    </div>
  </div>
</div>

  );
};

export default Popup;
