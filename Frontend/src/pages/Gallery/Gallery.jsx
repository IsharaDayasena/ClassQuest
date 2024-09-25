import React from "react";
import img1 from "../../assets/gallary/g1.jpg";
import img2 from "../../assets/gallary/g2.jpg";
import img3 from "../../assets/gallary/g3.jpg";
import img4 from "../../assets/gallary/g4.jpg";
import img5 from "../../assets/gallary/g5.jpg";
const Gallery = () => {
  return (
    <div className=" md:w-[80%] mx-auto my-28">
      <div className=" mb-16">
        <h1 className="text-5xl font-bold text-center">Our Gallery</h1>
      </div>
      <div className=" md:grid grid-cols-2 items-center justify-center  gap-4">
        <div className=" mb-4 md:mb-0">
          <img src={img1} alt="" className=" m:h-[720px] w-full mx-auto rounded-sm" />
        </div>
        <div className=" gap-4 grid grid-cols-2 items-start">
          <div >
            <img src={img2} alt="" className=" m:h-[175px]" />
          </div>
          <div>
            <img src={img3} alt="" className=" m:h-[175px]" />
          </div>
          <div>
            <img src={img4} alt="" className=" m:h-[175px]" />
          </div>
          <div>
            <img src={img5} alt="" className=" m:h-[175px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
