import Lottie from "lottie-react";
import { useState } from "react";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import happy from "../assets/happy.json";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import DistrictSelect from "./DistrictSelect";
import UpazilaSelect from "./UpazilaSelect";

const provider = new GoogleAuthProvider();

const Register = () => {
  const [districtId, setDistrictId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const password = form.password.value;


    if (!fullname || !email || !photo || !password) {
      toast.error("Please fill out all fields!");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number."
      );
      return;
    }

    setErrorMessage("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const profile = {
          displayName: fullname,
          photoURL: photo,
        };
        updateProfile(result.user, profile)
          .then(() => {
            toast.success("Account created successfully!");
            form.reset();
            navigate("/login");
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Profile update failed");
          });
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setErrorMessage(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className=" bg-[url(/bg.png)] bg-contain">
      <div className=" bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5  ">
          <div className="title mt-5">
            <Title>Join with Us</Title>
          </div>

          <div className="flex  justify-between items-center gap-5 pt-8">
            <div className="login-for flex-1">
              <form
                onSubmit={handleSignUp}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                <div className="flex justify-start items-center">
                  <div className="">
                    <BiUser className="text-3xl text-slate-500"></BiUser>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="text"
                    name="fullname"
                    placeholder="Enter Full Name"
                  />
                </div>

                <div className="flex justify-start items-center">
                  <div className="">
                    <BiImageAdd className="text-3xl text-slate-500"></BiImageAdd>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="text"
                    name="photo"
                    placeholder="Enter Image Url"
                  />
                </div>

                <div className="flex justify-start items-center">
                  <div className="">
                    <span className="text-2xl font-semibold text-slate-600 mr-2">
                      🩸
                    </span>
                  </div>
                  <select
                    defaultValue=""
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    name="editor"
                  >
                    <option disabled value="">
                      Blood Group
                    </option>
                    <option value="vscode">A+</option>
                    <option value="vscode-fork">A-</option>
                    <option value="other">B+</option>
                    <option value="other">B-</option>
                    <option value="other">AB+</option>
                    <option value="other">AB-</option>
                    <option value="other">O+</option>
                    <option value="other">O-</option>
                  </select>
                </div>

                <DistrictSelect onChange={setDistrictId} />
                <UpazilaSelect selectedDistrictId={districtId} />

                <div className="flex justify-start items-center">
                  <div className="">
                    <BiEnvelope className="text-3xl text-slate-500"></BiEnvelope>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                  />
                </div>

                <div className="flex justify-start items-center">
                  <div className="">
                    <BiKey className="text-3xl text-slate-500"></BiKey>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>

                <input
                  type="submit"
                  value="Register Now"
                  className="btn cursor-pointer"
                />
                <p>
  Already have an Account?{" "}
  <Link to="/login">
    <span className="text-blue-500 hover:underline">Login</span>
  </Link>
</p>

              </form>
              {errorMessage && (
                <p className="text-red-500 text-center mt-2">{errorMessage}</p>
              )}
            </div>
            <Social></Social>
            <div className="lottie flex-1 flex mx-20 ">
              <Lottie animationData={happy}></Lottie>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Register;
