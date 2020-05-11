import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator } from './style';


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

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({ //object를 더 구체화해서
        src: PropTypes.string,
    })).isRequired,
    onClose : PropTypes.func.isRequired
}


export default ImagesZoom;