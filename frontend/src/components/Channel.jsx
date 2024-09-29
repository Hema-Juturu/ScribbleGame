import { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "./User";
import Logout from "./Logout";
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
                            className="px-4 py-2 text-sm text-slate-200 bg-slate-800 border border-teal-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500 flex-shrink-0"
                        >
                            Join Room &gt;&gt;
                        </button>
                    </div>
                </form>
                <div className="a-center pt-8">
                    <button
                        onClick={() => {
                            const str = Math.floor(Math.random() * (10 ** 8)) + '';
                            navigate(`/dcanvas/${str}`);
                        }}
                        className="px-4 py-2 text-sm text-slate-200 bg-slate-800 border border-teal-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500 flex-shrink-0"
                    >
                        Create Room &gt;&gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Channel;
