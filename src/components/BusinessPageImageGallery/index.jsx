import React, { useState } from 'react';
import Slider from "react-slick";

export default ({ defaultMainImage, defaultSubImages }) => {

    const [mainImage, setMainImage] = useState(defaultMainImage);

    const settings = {
        infinite: true,
        arrows: false,
        speed: 200,
        afterChange: index => {
            setMainImage(defaultSubImages[index]);
        },
        slidesToShow: defaultSubImages.length > 3 ? 3 : 1,
        autoplay: true
    };


    return (
        <header className="business-page-header">
            <div className="main-image">
                <img src={mainImage} alt="" />
            </div>
            <div className="sub-images">
                <Slider {...settings}>
                    {defaultSubImages.map((subImage, index) => (
                        <img src={subImage} key={index + 1} alt="" />
                    ))}
                </Slider>
            </div>
        </header>
    )
}