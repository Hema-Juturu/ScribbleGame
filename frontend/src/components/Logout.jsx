import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute z-10 top-5 right-5">
            <button
                onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }}
                className="px-4 py-2 text-sm text-slate-200 bg-slate-800 border border-teal-400 rounded-full ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500 flex-shrink-0"
            >
                Logout
            </button>
        </div>
    )
}
export default Logout;