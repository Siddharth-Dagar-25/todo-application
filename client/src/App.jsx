import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import Navbar from "./components/Navbar.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "./components/UserContext.jsx";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  let navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useUser();
  setIsLoggedIn(true);

  console.log(isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      toast("Please log in to view this page", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return; 
    }
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="h-screen font-inter">
  <Navbar/>
  <div className="mx-auto max-w-fit  items-center justify-center">
    <h1 className="text-center text-3xl">ToDo App</h1>

    <div className="flex justify-center gap-2.5 mt-5">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Add a ToDo..."
        className="p-2.5 bg-gray-600 text-white outline-none border-none w-50 placeholder-white"
      />
      <button 
        onClick={saveToDo}
        className="p-2.5 bg-gray-600 text-white outline-none border-none hover:bg-gray-700 cursor-pointer"
      >
        Add
      </button>
    </div>

    <div className="mt-5 flex flex-col gap-5">
      {toDos.map((el) => (
        <ToDo
          key={el._id}
          text={el.toDo}
          id={el._id}
          setUpdateUI={setUpdateUI}
          setShowPopup={setShowPopup}
          setPopupContent={setPopupContent}
        />
      ))}
    </div>
  </div>
  {showPopup && (
    <Popup
      setShowPopup={setShowPopup}
      popupContent={popupContent}
      setUpdateUI={setUpdateUI}
    />
  )}
</main>

  );
};

export default App;
