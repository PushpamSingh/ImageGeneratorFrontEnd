import { useState } from "react";
import { assets, stepsData, testimonialsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import { delay, motion } from "motion/react";
import { useAuthState } from "../Zustand/useAuthState";
import { useGetUser } from "../Hooks/UsegetUser";

const Home = () => {
  const navigate = useNavigate();
  const {authState,setAuthState}=useAuthState()
  // console.log(authState);
  const {authUser,isLoading}=useGetUser();
  const isAuthuser=Boolean(authUser)

  const handleGenerateBtn=()=>{
    if(isAuthuser){
      setAuthState("")
      navigate('/result')
    }else{
      window.scrollTo({ top: 0, behavior: 'smooth' });
       setAuthState(""); 
    setTimeout(() => {
      setAuthState("Login");
    }, 0);
    }
  }
  return (
    <>
      {(authState ==='Login' || authState === 'Signup') &&
        <>
          {authState==='Login' ? <Login/> : <SignUp/>}
        </>
      }

{/* authState === "Login" ? (
        <Login />
      ) : authState === "Signup" ? (
        <SignUp />
      ) : null */}
      <motion.header
        className="w-full h-screen flex justify-center items-center p-4 flex-col gap-4 -mt-14"
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="badge badge-neutral badge-outline rounded-full px-4 py-4 text-base-content/50"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="text-primary">Best text to image generator</span>{" "}
          <img src={assets.star_icon} alt="star icon" />
        </motion.h1>
        <motion.div className="mx-auto w-full sm:w-[50%]">
          <motion.h1
            className="text-center font-semibold text-[40px] sm:text-6xl lg:text-[75px] mx-auto leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Turn text to <span className="text-info">image</span>, in seconds
          </motion.h1>
        </motion.div>
        <div className="mx-auto w-full">
          <motion.p
            className="text-center text-xs sm:w-[50%] sm:text-xl mx-auto text-base-content/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Unleash your creativity with AI. Turn your imagination into visual
            art in seconds-just type, and watch the magic happen.
          </motion.p>
        </div>

        <motion.button
          className="btn btn-neutral py-6 px-10 rounded-full"
          onClick={handleGenerateBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          
        >
          <span>Generate</span>
          <img src={assets.star_group} alt="" width={20} />
        </motion.button>

        <motion.div
          className="flex justify-center items-center gap-2 flex-wrap overflow-hidden mt-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {Array(6)
            .fill("")
            .map((item, index) => (
              <motion.img
                whileHover={{ scale: 1.05, duration: 0.3 }}
                src={
                  index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2
                }
                alt=""
                key={index}
                width={70}
                className="hover:scale-105 transition-all duration-300"
              />
            ))}
        </motion.div>
        <motion.p
          className="text-base-content/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Generated images from imagify
        </motion.p>
      </motion.header>

      <main className="mb-12">
        <motion.section
          initial={{ opacity: 0.2, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.div
            className="flex justify-center items-center flex-col gap-4 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
            <p className="text-base-content/70 text-center w-full sm:w-[50%]">
              Transform Words Into Stunning Images.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {stepsData.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                key={index}
                className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-12 h-12 mb-4"
                />
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-base-content/70 mt-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-22 mb-22"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <motion.div
            className="flex justify-center items-center flex-col mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium">
              Create AI Images
            </h1>
            <p className="text-xs sm:text-xl text-base-content/70">
              Turn your imagination into visuals
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="md:w-[30%]">
              <img src={assets.sample_img_1} alt="" />
            </div>

            <div className="w-full md:w-[50%] flex flex-col justify-center items-start gap-6">
              <motion.h1
                className="text-xl text-base-content/70 sm:text-3xl font-bold"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                Introducing the AI-Powered Text to Image Generator
              </motion.h1>
              <motion.p
                className="text-base-content/50"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Easily bring your ideas to life with our free AI image
                generator. Whether you need stunning visuals or unique imagery,
                our tool transforms your text into eye-catching images with just
                a few clicks. Imagine it, describe it, and watch it come to life
                instantly.
              </motion.p>
              <motion.p
                className="text-base-content/50"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                Simply type in a text prompt, and our cutting-edge AI will
                generate high-quality images in seconds. From product visuals to
                character designs and portraits, even concepts that don’t yet
                exist can be visualized effortlessly. Powered by advanced AI
                technology, the creative possibilities are limitless!
              </motion.p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="mt-24 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center items-center flex-col mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium">
              Customer testimonials
            </h1>
            <p className="text-xs sm:text-xl text-base-content/70">
              What Our Users Are Saying
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index, duration: 0.8 }}
                key={index}
                className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p>{testimonial.role}</p>
                <div>
                  {Array(testimonial.stars)
                    .fill("")
                    .map((_, i) => (
                      // <StarIcon key={i} className="inline size-5 text-warning" />
                      <img
                        src={assets.rating_star}
                        alt=""
                        key={i}
                        className="inline size-5 text-warning"
                      />
                    ))}
                </div>
                <p className="text-base-content/70 mt-2">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-24 mb-24"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex justify-center items-center flex-col mt-10 gap-6">
            <motion.h1
              className="text-2xl md:text-5xl"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              See the magic. Try now
            </motion.h1>
            <motion.button
                initial={{ opacity: 0}}
                whileInView={{ opacity: 1 }}
                transition={{default:{delay:0.5},opacity:{ delay: 0.6, duration: 0.8 }}}
              className="btn btn-neutral py-6 px-10 rounded-full"
              onClick={handleGenerateBtn}
            >
              <span>Generate</span>
              <img src={assets.star_group} alt="" width={20} />
            </motion.button>
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default Home;
