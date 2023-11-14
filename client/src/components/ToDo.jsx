import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({
  text,
  id,
  setUpdateUI,
  setShowPopup,
  setPopupContent,
  markComplete,
}) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
    <div className="toDo bg-slate-200 w-full md:w-auto h-auto flex items-center justify-between py-2 md:py-4 px-2 text-sm md:text-lg text-black rounded-xl">
  <div className="flex items-center flex-1">
    <input type="checkbox" className="mr-2 h-5 w-5 rounded-xl" />
    <span className="truncate">{text}</span> 
  </div>
  <div className="icons flex gap-2 md:gap-3 py-1 px-2 cursor-pointer">
    <AiFillEdit
      className="icon h-4 md:h-5 w-4 md:w-5 text-blue-700"
      onClick={updateToDo}
    />
    <RxCross1 className="icon h-4 md:h-5 w-4 md:w-5 text-red-500 " onClick={deleteTodo} />
  </div>
</div>

  );
};

export default ToDo;
