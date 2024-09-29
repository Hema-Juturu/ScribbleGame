import { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "/src/components/User";
import Logout from "/src/components/Logout";
import { TbArrowsJoin } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";

const Channel = () => {
    const [channel, setChannel] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e?.preventDefault(); // Prevent default form submission behavior
        // Navigate to the new route after successful submission
        navigate(`/dcanvas/${channel}`);
    };

    return (
        <div className='bg-bghome bg-cover flex items-center justify-center h-screen'>
            <User />
            <Logout />
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            id="first_name"
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-1"
                            placeholder="Enter Name"
                            required
                        />
                        <button
                            type="submit"
                            className="flex px-4 py-2 text-sm text-slate-200 bg-slate-800 border border-teal-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
                        >
                            <div className="h-full a-center">
                                Join Room
                            </div>
                            <div className="h-full a-center pl-1 pt-[2px]">
                                <TbArrowsJoin className="text-lg" />
                            </div>
                        </button>
                    </div>
                </form>
                <div className="a-center pt-8">
                    <button
                        onClick={() => {
                            const str = Math.floor(Math.random() * (10 ** 8)) + '';
                            navigate(`/dcanvas/${str}`);
                        }}
                        className="flex px-4 py-2 text-sm text-slate-200 bg-slate-800 border border-teal-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
                    >
                        <div className="h-full a-center">
                            Create Room
                        </div>
                        <div className="h-full a-center pl-1 pt-[2px]">
                            <IoMdAddCircleOutline className="text-lg" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Channel;
