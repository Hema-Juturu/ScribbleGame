import { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "/src/components/User";
import { v4 as uuidv4 } from "uuid";
import { FaCirclePlay } from "react-icons/fa6";
import Layout from "/src/Layouts/MainLayout";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const id = uuidv4();
    localStorage.setItem("uid", id);
    localStorage.setItem("name", name);
    // Navigate to the new route after successful submission
    navigate("/channel");
  };

  return (
    <Layout>
      <div className="w-screen h-screen a-center">
        <User />
        <form
          onSubmit={handleSubmit}
          className="z-10 absolute flex flex-col gap-4"
        >
          <div className="flex gap-4">
            <input
              type="text"
              id="first_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-1"
              placeholder="Enter Name"
              required
            />
            <button
              type="submit"
              className="flex justify-center px-4 py-2 text-sm text-slate-200 bg-slate-800 border border-teal-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
            >
              <div className="h-full a-center">PLAY</div>
              <div className="h-full a-center pl-1 pt-[1px]">
                <FaCirclePlay />
              </div>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
