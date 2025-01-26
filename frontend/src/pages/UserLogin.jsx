import React from "react";
import uberLogo from "../assets/uber-logo.png";

const UserLogin = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <img
        className="w-30 mb-6 mt-16"
        src={uberLogo || "/placeholder.svg"}
        alt="Uber Logo"
      />

      <form className="space-y-6 w-full max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input
            className="bg-gray-100 rounded px-4 py-3 w-full text-base placeholder:text-gray-400"
            required
            type="email"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Enter Password</h3>
          <input
            className="bg-gray-100 rounded px-4 py-3 w-full text-base placeholder:text-gray-400"
            required
            type="password"
            placeholder="password"
          />
        </div>
        <button className="bg-black text-white font-semibold rounded px-4 py-3 w-full text-base">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
