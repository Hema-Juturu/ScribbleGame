import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const uuid = localStorage.getItem("uid") || uuidv4();
    console.log(uuid);
    localStorage.setItem("uid", uuid);
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
