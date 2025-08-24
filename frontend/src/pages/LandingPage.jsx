import React, { useState, useContext } from 'react';
import HERO_IMG from '../assets/hero-img.png';
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user){
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 relative">
        {/* Decorative Blur */}
        <div className="w-[450px] h-[450px] bg-pink-200/20 blur-[70px] absolute top-0 left-0"></div>

        <div className="container mx-auto px-6 pt-8 pb-[200px] relative z-10">
          <header className="flex items-center justify-between mb-16">
            <div className="text-2xl font-bold text-purple-900">Interview Prep AI</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-6 mb-10 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="flex items-center gap-2 text-[13px] text-purple-700 font-semibold bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>
              <h1 className="text-5xl font-bold text-purple-900 mb-6 leading-tight">
                Ace Your Interviews with AI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Get personalized interview preparation with AI-driven mock interviews and feedback, dive deeper into concepts, and organize everything your way. From preparation to mastery — your ultimate interview toolkit is here.
              </p>
              <button
                className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full relative z-10 -mt-40 mb-28">
        <section className="flex items-center justify-center">
          <img src={HERO_IMG} alt="Interview Prep AI" className="max-w-full h-auto" />
        </section>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white pt-16 pb-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-purple-900 mb-12">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-purple-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-purple-100"
              >
                <h3 className="text-lg font-semibold mb-3 text-purple-800"> {feature.title} </h3>
                <p className="text-gray-600"> {feature.description} </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-pink-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-pink-100"
              >
                <h3 className="text-lg font-semibold mb-3 text-pink-700"> {feature.title} </h3>
                <p className="text-gray-600"> {feature.description} </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm bg-purple-50 text-purple-800 text-center p-5 mt-5">
        Made by yourakhere
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        title={currentPage === "login" ? "Login" : "Register"}
      >
        {currentPage === "login" ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </>
  );
};

export default LandingPage;
