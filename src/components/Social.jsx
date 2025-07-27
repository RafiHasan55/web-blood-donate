import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Social = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Login Successfully!");
        
      })
      .catch((err) => {
        toast.error("Login Failed: " + err.message);
        console.error(err);
      });
  };

  return (
    <div className="bg-white shadow py-3 rounded-full flex flex-col items-center">
      <div>
        <img
          onClick={handleGoogleSignIn}
          className="w-[64px] cursor-pointer"
          src="https://img.icons8.com/?size=96&id=17949&format=png"
          alt="Google Sign-In"
        />
      </div>
      <div>
        <img
          className="w-[64px]"
          src="https://img.icons8.com/?size=96&id=118497&format=png"
          alt=""
        />
      </div>
      <div>
        <img
          className="w-[64px]"
          src="https://img.icons8.com/?size=96&id=bUGbDbW2XLqs&format=png"
          alt=""
        />
      </div>
      <div>
        <img
          className="w-[64px]"
          src="https://img.icons8.com/?size=128&id=3tC9EQumUAuq&format=png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Social;
