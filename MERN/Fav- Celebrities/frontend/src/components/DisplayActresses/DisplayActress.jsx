import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination]);
import "./DisplayActress.css";

const DisplayActress = ({ actresses, loading }) => {
  const [showTitle, setShowTitle] = useState(false);

  const handleSlideChange = () => {
    setShowTitle(true);
    setTimeout(() => setShowTitle(false), 2000);
  };

  const imageLoadingError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://www.rescuedigitalmedia.com/wp-content/uploads/2020/06/img_5b7fd932ba802.png";
  };

  return (
    <>
      {loading ? (
        <div className='loader'>Loading...</div>
      ) : (
        <>
          {actresses.length === 0 ? ( <div className='empty-data'>Not Found</div> ) : (
            <Swiper
              slidesPerView={1}
              // spaceBetween={20}
              loop={true}
              navigation={true}
              onSlideChange={handleSlideChange}
              modules={[Pagination, Navigation]}
            >
              {actresses.map((actress) => (
                <SwiperSlide key={actress._id}>
                  <div className='image_container'>
                    <h3 className={showTitle ? "show-title" : "hide-title"}>{actress.name}</h3>
                    <img src={actress.image} alt={actress.name} onError={imageLoadingError} 
                      onMouseOver={() => setShowTitle(true)} onClick={() => window.open(actress.image, "_blank")} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}
    </>
  );
};

export default DisplayActress;
