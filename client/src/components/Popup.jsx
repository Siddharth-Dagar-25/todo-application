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
      <div className="popup relative bg-gray-600 w-[400px] h-[150px] p-2.5">
        <RxCross1 className=" cross absolute top-0 right-0 m-2.5 cursor-pointer" onClick={() => setShowPopup(false)} />
        <h1 className="text-center font-medium text-2xl p-2  ">Update ToDo</h1>

        <div className="popup__input_holder mt-7.5 flex justify-center gap-2.5 pb-7.5 px-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Update ToDo..."
            className="bg-white text-black placeholder-gray-700 w-[350px] h-[35px] absolute bottom-12 px-2  "
          />
          <button className="bg-white text-xl w-[100px] absolute bottom-2 text-black hover:bg-gray-300 rounded-lg" onClick={updateToDo}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
