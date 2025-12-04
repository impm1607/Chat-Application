import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { MdCheck, MdKeyboardArrowLeft } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useIsMobile } from "../hooks/use-mobile";

const LoginPage = () => {
  const isMobile = useIsMobile();
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      if (password === confirmPassword) {
        setIsDataSubmitted(true);
      }
      return;
    }

    login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="w-screen h-screen">
      <div className="relative flex items-center justify-center gap-0 lg:gap-8 w-full h-full backdrop-blur-2xl rounded-2xl overflow-hidden bg-black/25 px-[3%] md:px-[5%] lg:px-[10%] py-[5%]">
        {/* ----- left ----- */}
        {!isMobile && (
          <div className="sm:w-1/2 md:w-3/5 lg:w-full h-full flex items-center justify-center">
            <img
              src={assets.logo_big}
              alt="Logo-big"
              className="w-1/3 max-sm:w-2/3"
            />
          </div>
        )}

        {/* ----- right ----- */}
        <div className="w-full sm:w-2/3 lg:w-full h-full flex items-center justify-center px-8 py-16 max-h-[650px] max-w-[450px] sm:max-h-[700px] sm:max-w-[600px]">
          <form
            className="w-full h-full flex flex-col items-center justify-start gap-7 sm:gap-10 py-8 sm:py-11 px-6 sm:px-8 border-2 border-gray-600 rounded-lg shadow-2xl bg-white/8 text-white"
            onSubmit={onSubmitHandler}
          >
            <h2 className="w-full flex justify-between items-center gap-4">
              <div className="flex justify-start items-center gap-3 font-medium text-2xl cursor-pointer">
                {isDataSubmitted && (
                  <MdKeyboardArrowLeft
                    className="w-7 h-7 text-white/60 hover:text-white hover:-translate-x-1"
                    onClick={() => setIsDataSubmitted(false)}
                  />
                )}
                {currState}
              </div>
              {isMobile && (
                <img
                  src={assets.logo_big}
                  alt="Logo-big"
                  className="max-h-10"
                />
              )}
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              {!isDataSubmitted && (
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                  {currState === "Sign Up" ? (
                    <>
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full h-10 py-2 px-3 border border-gray-500 rounded-sm bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-white"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <input
                        type="email"
                        placeholder="Enter email"
                        required
                        className="w-full h-10 py-2 px-3 border border-gray-500 rounded-sm bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="relative w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create new password"
                          required
                          className="w-full h-10 py-2 px-3 pr-10 border border-gray-500 rounded-sm bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-white"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                          <TbEyeClosed
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <FaEye
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Confirm password"
                        required
                        className="w-full h-10 py-2 px-3 border border-gray-500 rounded-sm bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="email"
                        placeholder="Enter email"
                        required
                        className="w-full h-10 py-2 px-3 border border-gray-500 rounded-sm bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Enter password"
                        required
                        className="w-full h-10 py-2 px-3 border border-gray-500 rounded-sm bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </>
                  )}
                  <div className="flex items-center justify-start gap-2 w-full">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" required className="peer hidden" />
                      <span className="relative w-4 h-4 flex items-center justify-center rounded border border-indigo-500 bg-transparent shrink-0"></span>
                      <MdCheck className="absolute opacity-0 peer-checked:opacity-100 text-white text-sm" />
                      <p className="text-xs text-white/60 peer-checked:text-white">
                        Agree to the Terms of use and privacy policy.
                      </p>
                    </label>
                  </div>
                </div>
              )}
              {currState === "Sign Up" && isDataSubmitted && (
                <textarea
                  rows={4}
                  placeholder="Provide a short bio..."
                  required
                  className="w-full py-2 px-3 border border-gray-500 rounded-sm focus:outline-none focus:border focus:border-indigo-500"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              )}

              <button
                type="submit"
                className="flex items-center justify-center py-2 px-4 mt-5 bg-gradient-to-r from-indigo-700 to-violet-500 rounded-sm text-white cursor-pointer hover:opacity-70 transition-opacity duration-200"
              >
                {currState === "Sign Up"
                  ? !isDataSubmitted
                    ? "Create Account"
                    : "Finish Sign Up"
                  : "Login"}
              </button>

              {currState === "Sign Up" ? (
                <p className="text-xs text-white/60 group hover:text-white cursor-pointer">
                  Already have an account?{" "}
                  <span
                    className="text-violet-500 group-hover:underline"
                    onClick={() => {
                      setCurrState("Login");
                      setIsDataSubmitted(false);
                    }}
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-xs text-white/60 group hover:text-white cursor-pointer">
                  Create a new account?{" "}
                  <span
                    className="text-violet-500 group-hover:underline"
                    onClick={() => {
                      setCurrState("Sign Up");
                      setIsDataSubmitted(false);
                    }}
                  >
                    Click here
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
