import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {Icon} from 'antd';
import styled from 'styled-components';

const Overlay = styled.div`
    position: 'fixed';
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Header = styled.header`
    height: 44px;
    background: white;
    position: relative;
    padding: 0;
    text-align: center; 

    & h1{
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;
    }
`;

const SlickWrapper = styled.div`
    height: calc(100% - 44px);
    background: #090909;
`;

const CloseBtn = styled(Icon)`
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
`;

const Indicator = styled.div`
    & > div{
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`;

const ImgWrapper = styled.div`
    padding: 32px;
    text-align: center;

    &img{
        margin: '0 auto';
        max-height: 750px;
    }
`;

const ImagesZoom = ({images, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);


    return (
        <Overlay style={{position: 'fixed', zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0}}>
            <Header style={{height: 44, background: 'white', position: 'relative', padding: 0, textAlign: 'center'}}>
                <h1 style={{margin: 0, fontSize: '17px', color: '#333', lineHeight: '44px'}}>상세 이미지</h1>
                <CloseBtn type="close" onClick = {onClose} style={{position: 'absolute', right:0, top: 0, padding: 15, lineHeight:'14px', cursor: 'pointer'}}/>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        afterChange={(slide)=>setCurrentSlide(slide)}
                        infinite={false}
                        arrows
                        slidesToScroll={1}
                        slidesToShow={1}
                    >
                        {images.map((v)=>{
                            return (
                                <ImgWrapper>
                                    <img src={`http://localhost:3065/${v.src}`} />
                                </ImgWrapper>
                            );
                        })}
                    </Slick>
                    <Indicator style={{textAlign: 'center'}}>
                        <div>{currentSlide + 1} / {images.length} </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    )
}

ImagesZoom.prototype = {
    images: PropTypes.arrayOf(PropTypes.shape({ //object를 더 구체화해서
        src: PropTypes.string,
    })).isRequired,
    onClose : PropTypes.func.isRequired
}


export default ImagesZoom;