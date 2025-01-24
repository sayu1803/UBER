import React from 'react';
import uberLogo from '../assets/uber-logo.png';
import backgroundVideo from '../assets/uber.mp4'; // Replace with the path to your video
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen pt-5 flex justify-between flex-col w-full relative">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content */}
      <img className="absolute top-4 left-4 w-30 z-10" src={uberLogo} alt="Uber Logo" />
      <div className="bg-white pb-7 py-4 px-3 ">
        <h2 className="text-2xl font-bold">Get started with Uber</h2>
        <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
      </div>
    </div>
  );
};

export default Home;
