import React from "react";
import jobdesc from "../assets/mainbg.jpg";
import cardimg1 from "../assets/points/happy.svg";
import cardimg2 from "../assets/points/life_balanc.svg";
import cardimg3 from "../assets/points/location.svg";
import cardimg4 from "../assets/points/puzzle.svg";
import cardimg5 from "../assets/points/rocket.svg";
import cardimg6 from "../assets/points/time.svg";

const Content = () => {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:h-[550px] h-[1200px] lg:mt-0 lg:gap-8 lg:px-32 items-center relative">
      <div>
        <img
          className="lg:h-[550px] w-[570px] mix-blend-multiply"
          src={jobdesc}
          alt="jobdesc-image"
        />
      </div>
      <div>
        <h2 className="text-black font-semibold lg:text-[43px] text-4xl pb-8">
          Live Life On Your Own Terms.
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="text-black flex gap-2 items-center border p-1 w-80">
            <div className="rounded-full h-14 w-12 flex items-center justify-center">
              <img className="h-10 w-10 object-contain" src={cardimg1} alt="icon-1" />
            </div>
            <div>
              <p className="line-clamp-2">Don't let work schedule run your life.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="text-black flex gap-2 items-center border p-4 w-80">
            <div className="rounded-full h-12 w-12 flex items-center justify-center">
              <img className="h-10 w-10 object-contain" src={cardimg2} alt="icon-2" />
            </div>
            <div>
              <p className="line-clamp-2">We want to help you reach your full potential.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="text-black flex gap-4 items-center border p-4 w-80">
            <div className="rounded-full h-12 w-12 flex items-center justify-center">
              <img className="h-20 w-20 object-contain" src={cardimg3} alt="icon-3" />
            </div>
            <div>
              <p className="line-clamp-2">Build new experiences by working in different industries.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="text-black flex gap-4 items-center border p-4 w-80">
            <div className="rounded-full h-12 w-12 flex items-center justify-center">
              <img className="h-20 w-20 object-contain" src={cardimg4} alt="icon-4" />
            </div>
            <div>
              <p className="line-clamp-2">Take back control of your time, manage expectations for that perfect work-life balance</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="text-black flex gap-4 items-center border p-4 w-80">
            <div className="rounded-full w-20 flex items-center justify-center">
              <img className="" src={cardimg5} alt="icon-5" />
            </div>
            <div>
              <p className="line-clamp-2">We connect you with jobs allowing you to work where you want, when you want</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="text-black flex gap-4 items-center border p-4 w-80">
            <div className="rounded-full h-12 w-12 flex items-center justify-center">
              <img className="overflow-visible h-10 w-10 object-contain" src={cardimg6} alt="icon-6" />
            </div>
            <div>
              <p className="line-clamp-2">Every completed shift improves our matching, ensuring we find you work that you enjoy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
