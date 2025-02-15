import { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "/src/components/User";
import Logout from "/src/components/Logout";
import { TbArrowsJoin } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import { FaClipboard } from "react-icons/fa6";

import Layout from "/src/Layouts/MainLayout";



const Channel = () => {
  const [channel, setChannel] = useState("");
  const [roomCode, setroomCode] = useState("");
  const [joinRoom,setJoinRoom]=useState("");
  const [buttonText, setButtonText] = useState('Room not created');
  const navigate = useNavigate();
  const copyText = async () => {
    if(!roomCode){
      setButtonText('Create Room to copy!');
      setTimeout(() => {
        setButtonText('Room not created');
      }, 2000);
      return 
    }
    try {
      await navigator.clipboard.writeText(roomCode);
      console.log(roomCode, 'Text copied to clipboard!');
      setButtonText('Copied!');
      setTimeout(() => {
        setButtonText('Copy Room Link');
      }, 2000);
    } catch (err) {
      console.error('Failed to Copy Room Link: ', err);
    }
  };
  return (
    <Layout>
      <div className="w-screen h-screen a-center ">
        <User />
        <Logout />
        <div className="z-50">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                id="first_name"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-1"
                placeholder="Enter Name"
                required
              />
              
              <div className="flex flex-row">
                <input
                  type="text"
                  id="roomCode"
                  value={joinRoom}
                  onChange={(e) => setJoinRoom(e.target.value)}
                  className="bg-gray-700 border  border-gray-600 text-white text-sm rounded-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-1"
                  placeholder="Enter Room Link"
                />
                <button
                  type="submit"
                  className="flex justify-center px-4 py-2 m-1 text-sm text-slate-200 bg-slate-700 border border-cyan-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
                  onClick={() => {
                    navigate(`${joinRoom}`);
                  }}
                >
                  <div className="h-full a-center">Join Room</div>
                  <div className="h-full a-center pl-1 pt-[2px]">
                    <TbArrowsJoin className="text-lg" />
                  </div>
                </button>
              </div>
              <button
                onClick={() => {
                  const str = "/dcanvas/"+Math.floor(Math.random() * 10 ** 8);
                  setButtonText('Copy Room Link');
                  setroomCode(str);
                }}
                className="flex justify-center px-4 py-2 text-sm text-slate-200 bg-slate-700 border border-cyan-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
              >
                <div className="h-full a-center">Create Room</div>
                <div className="h-full a-center pl-1 pt-[2px]">
                  <IoMdAddCircleOutline className="text-lg" />
                </div>
              </button>
           
            <button
              onClick={() => {
                navigate(`${roomCode}`);
              }}
              className="flex justify-center px-4 py-2 text-sm text-slate-200 bg-cyan-600 border border-cyan-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
            >
              <div className="h-full a-center">PLAY</div>
              <div className="h-full a-center pl-1 pt-[2px]">
                <FaCirclePlay className="text-lg" />
              </div>
            </button>
            <button
               onClick={()=>{copyText()}}
               className="flex gap-4 justify-center px-4 py-2 text-sm text-slate-200 bg-slate-700 border border-cyan-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
             >
               <div className="h-full a-center">{buttonText}</div>
               <div className="h-full a-center pl-1 pt-[2px]">
                 <FaClipboard className="text-lg"/>
               </div>
             </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Channel;
