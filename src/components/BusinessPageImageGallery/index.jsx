import React, { useState } from 'react';
import Slider from "react-slick";
import style from './BusinessPageImageGallery.module.scss';

export default ({ defaultMainImage, defaultSubImages }) => {

    const [mainImage, setMainImage] = useState(defaultMainImage);

    const settings = {
        infinite: true,
        arrows: false,
        speed: 200,
        afterChange: index => {
            setMainImage(defaultSubImages[index]);
        },
        slidesToShow: 4,
        autoplay: true
    };


    return (
        <header className={style['business-page-header']}>
            <div className={style['main-image']}>
                <img src={mainImage} alt="" />
            </div>
            <div className={style['sub-images']}>
                <Slider {...settings}>
                    {defaultSubImages.map((subImage, index) => (
                        <img src={subImage} key={index + 1} alt="" />
                    ))}
                </Slider>
            </div>
        </header>
    )
}