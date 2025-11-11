import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAvatar) {
      await updateProfile({ bio: bio, fullName: name });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedAvatar);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image,
        bio: bio,
        fullName: name,
      });
      navigate("/");
    };
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center sm:px-[10%] sm:py-[5%]">
      <div className="flex items-center justify-between max-sm:flex-col-reverse w-full max-w-[64%] max-h-[85%] backdrop-blur-2xl text-gray-300 border-2 border-gray-600 rounded-lg">
        <form
          className="flex flex-col gap-7 p-9 w-full max-w-[55%]"
          onSubmit={handleSubmit}
        >
          <h3 className="flex items-center justify-center w-full gap-5 text-xl font-medium pr-4">
            <img src={assets.logo_icon} alt="logo" className="w-9 h-9" />
            Profile Details
          </h3>

          <div className="w-full flex flex-col items-center justify-center gap-5">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="h-10 w-full py-2 px-3 border border-gray-500 rounded-md focus:outline-none focus:border focus:border-indigo-500 "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              rows={4}
              placeholder="Write the profile bio..."
              required
              className="w-full py-2 px-3 border border-gray-500 rounded-sm focus:outline-none focus:border focus:border-indigo-500"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center py-2 px-4 mt-5 bg-gradient-to-r from-indigo-800 to-violet-500 rounded-sm text-white cursor-pointer hover:opacity-70 transition-opacity duration-200"
          >
            Save
          </button>
        </form>
        <div className="flex items-center justify-center w-full max-w-[50%] p-10">
          <label
            htmlFor="avatar"
            className="flex flex-col items-center justify-center w-full gap-5 cursor-pointer"
          >
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(e) => setSelectedAvatar(e.target.files[0])}
              hidden
            />
            <div className="w-36 h-36 overflow-hidden">
              <img
                src={
                  selectedAvatar
                    ? URL.createObjectURL(selectedAvatar)
                    : authUser.profilePic || assets.avatar_icon
                }
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-white/60 hover:text-white">
              Upload Profile Picture
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
