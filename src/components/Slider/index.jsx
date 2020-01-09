import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';

import './style.scss';

export default ({ data, render, title }) => {
    const settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 1,
        speed: 500,
        arrows: false,
    };

    return (
        <div className="slider-container">
            <h1 className="slider-title">
                <FormattedMessage id={title} />
            </h1>
            <div>
                <Slider {...settings}>
                    {data.map((item, index) => render(item, index))}
                </Slider>
            </div>
        </div>
    );
}
