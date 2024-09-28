import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            await fetch('http://localhost:4000/api/submitName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            // Navigate to the new route after successful submission
            navigate('/dcanvas');
        } catch (error) {
            console.error('Error sending name to backend:', error);
        }
    };

    return (
        <div className='bg-bghome bg-cover flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        className="px-4 py-2 text-sm text-slate-200 bg-slate-800 border border-teal-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500 flex-shrink-0"
                    >
                        PLAY &gt;&gt;
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Home;
