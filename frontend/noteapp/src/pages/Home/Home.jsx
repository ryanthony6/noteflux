import React from "react";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import Footer from "../../components/Footer/Footer";

import {
  MdNote,
  MdOutlineStickyNote2,
  MdOutlineCalendarMonth,
} from "react-icons/md";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HomeNavbar />

        <section
          id="hero-section"
          className="min-h-screen flex items-center justify-center text-black bg-cover lg:bg-cover bg-no-repeat bg-center"
        >
          <div className="text-center px-6 md:px-12 mt-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Organize Your Thoughts
            </h1>
            <p className="text-[16px] text-slate-600 md:text-xl mb-8">
              Simple, intuitive note-taking app for your everyday needs.
            </p>
            <div className="wrapper">
              
            </div>
          
          </div>
        </section>

        <section
          id="feature-section"
          className="flex items-center justify-center text-black py-5 lg:py-10"
        >
          <div className="mx-auto py-10 lg:py-12 grid grid-cols-1 px-8 lg:grid-cols-2 md:grid-rows-1 lg:mx-16 lg:p-10 md:gap-10 items-end ">
            {/* LEFT SIDE */}
            <div className="flex flex-col space-y-2 lg:space-y-4">
              <h1 className="text-4xl font-semibold lg:text-6xl">
                Simplify your note-taking.
              </h1>
              <p className="md:text-base text-[#7e8182] font-medium lg:text-lg">
                Easily capture your thoughts, share ideas with your team, and
                keep everything organized in one place.
              </p>
            </div>
            {/* RIGHT SIDE */}
            <div className="grid md:grid-cols-3 gap-6 mt-6 lg:mt-0">
              {/* Card 1 */}
              <div className="flex md:flex-col bg-white gap-3 lg:gap-0">
                <MdOutlineStickyNote2 className="text-6xl text-black" />
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold lg:text-base">
                    Seamless Notes
                  </h1>
                  <p className="text-base text-[#7e8182] font-medium lg:text-base">
                    Capture your thoughts, ideas, and experience.
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="flex md:flex-col bg-white gap-3 lg:gap-0">
                <MdOutlineCalendarMonth className="text-6xl text-black" />
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold lg:text-base">
                    Efficient
                  </h1>
                  <p className="text-base text-[#7e8182] font-medium lg:text-base">
                    Organize all your needs effortlessly.
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="flex md:flex-col bg-white gap-3 lg:gap-0">
                <MdNote className="text-6xl text-black" />
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold lg:text-base">
                    Essential
                  </h1>
                  <p className="text-base text-[#7e8182] font-medium lg:text-base">
                    A simple format for documenting ideas easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="preview-section"
          className="flex items-center justify-center text-black py-10 lg:py-12"
        >
          <div className="mx-auto py-10 lg:py-12 grid grid-cols-1 px-8 lg:grid-cols-2 md:grid-rows-1 lg:mx-16 lg:p-10 md:gap-10">
            {/* LEFT SIDE */}
            <div className="order-2 lg:order-1 flex flex-col space-y-2 lg:space-y-4 border-2 rounded mt-6 lg:mt-0">
              <img
                src="../../images/Tes.png"
                alt="container"
                className="h-48 w-full lg:h-64 overflow-hidden"
              />
            </div>

            {/* RIGHT SIDE */}
            <div className=" lg:order-2 flex flex-col space-y-4 justify-center">
              <h1 className="text-4xl font-semibold lg:text-6xl">
                Write your thoughts, share your ideas.
              </h1>
              <p className="md:text-base text-[#7e8182] font-medium lg:text-lg">
                Capture your thoughts, ideas, and experience.
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact-section"
          className="min-h-screen py-32 bg-slate-700"
        >
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-bold lg:text-7xl">Let's Get Started</h1>
          </div>
          <div className="">

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
