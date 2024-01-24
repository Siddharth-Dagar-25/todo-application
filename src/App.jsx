import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import Navbar from "./components/Navbar.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "./components/UserContext.jsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useUser();

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);
  
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
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  // Function to highlight search query in ToDo text
  const highlightSearch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="bg-yellow-300">{part}</span> : 
        <span key={index}>{part}</span>
    );
  };

  return (
    <main className="h-screen overflow-auto font-inter bg-zinc-400">
      <Navbar/>
      <div className="mx-auto max-w-fit items-center justify-center pt-5 h-full">
        <h1 className="text-center text-5xl font-extrabold">ToDo Application</h1>

        <div className="flex justify-center gap-2.5 mt-5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add ToDo..."
            className="p-2.5 bg-gray-500 text-white outline-none border-none w-[300px] placeholder-white rounded-xl"
          />
          <button 
            onClick={saveToDo}
            className="p-2.5 w-24 bg-red-500 text-white outline-none border-none hover:bg-red-400 cursor-pointer rounded-xl"
          >
            Add
          </button>
        </div>

        <div className="absolute right-10 top-[165px] flex invisible lg:visible">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search ToDo..."
            className="p-2.5 bg-gray-500 text-white outline-none border-none w-[300px] placeholder-white rounded-xl"
          />
          <div className="">
            <MagnifyingGlassIcon className="h-10 w-10" />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {toDos
            .filter((el) => el.toDo.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((el) => (
              <ToDo
                key={el._id}
                text={highlightSearch(el.toDo, searchQuery)}
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