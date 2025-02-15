import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const uuid = localStorage.getItem("uid");
    if (uuid && location.pathname == "/") {
      navigate("/");
    }
    if (!uuid) {
      navigate("/");
    }
  }, []);
  return <></>;
};

export default User;
