<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState, useEffect, useRef } from 'react';
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PhotoGallery = ({ data }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);
<<<<<<< HEAD
=======
  const sliderRef = useRef(null); //add reference to slider component
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)

  useEffect(() => {
    setPhotos(data);
    setCurrentPhoto(data[0]);
  }, [data]);

  // workaround for aria-hidden problem
  useEffect(() => {
    const removeAriaHidden = () => {
      const focusedElement = document.activeElement;
      let ancestor = focusedElement;

      while (ancestor) {
        if (ancestor.hasAttribute('aria-hidden')) {
          ancestor.removeAttribute('aria-hidden');
        }
        ancestor = ancestor.parentElement;
      }
    };

    removeAriaHidden();
    document.addEventListener('focusin', removeAriaHidden);

    return () => {
      document.removeEventListener('focusin', removeAriaHidden);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 15,
    slidesToScroll: 1,
    focusOnSelect: true,
    afterChange: (index) => setCurrentPhoto(photos[index]),
  };

<<<<<<< HEAD
=======
  // to synchronize slider position when main photo changed with next or prev arrow
  const handlePrevClick = () => {
    const newIndex = (currentPhoto.id - 2 + photos.length) % photos.length;
    setCurrentPhoto(photos[newIndex]);
    sliderRef.current.slickGoTo(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = currentPhoto.id % photos.length;
    setCurrentPhoto(photos[newIndex]);
    sliderRef.current.slickGoTo(newIndex);
  };

>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
  if (!currentPhoto) {
    return <div>Loading...</div>;
  }

  return (
    <GalleryContainer>
<<<<<<< HEAD
      <ThumbnailSlider {...settings}>
        {photos.map((photo) => (
          <ThumbnailWrapper key={photo.id}>
            <Thumbnail key={photo.id} src={`/images/thumbnails/${photo.icon}`} alt={photo.name} />
=======
      <ThumbnailSlider ref={sliderRef} {...settings}>
        {photos.map((photo) => (
          <ThumbnailWrapper key={photo.id}>
            <Thumbnail key={photo.id} src={`images/thumbnails/${photo.icon}`} alt={photo.name} loading="lazy" />
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
            <Caption>{photo.name}</Caption>
          </ThumbnailWrapper>
        ))}
      </ThumbnailSlider>
      <MainPhotoContainer>
<<<<<<< HEAD
        <MainPhoto src={`/images/fotos/${currentPhoto.image}`} alt={currentPhoto.name} />
        <Navigation>
          <Arrow onClick={() => setCurrentPhoto(photos[(currentPhoto.id - 2 + photos.length) % photos.length])}>
            &lt;
          </Arrow>
          <Arrow onClick={() => setCurrentPhoto(photos[currentPhoto.id % photos.length])}>
            &gt;
          </Arrow>
        </Navigation>
=======
        <MainPhoto src={`images/fotos/${currentPhoto.image}`} alt={currentPhoto.name} loading="lazy" />
        <Navigation>
          <Arrow onClick={handlePrevClick}>
            &lt;
          </Arrow>
          <Arrow onClick={handleNextClick}>
            &gt;
          </Arrow>
        </Navigation>
        <TextInfo> 
          <TextHeader>{currentPhoto.name}, {currentPhoto.description}, {currentPhoto.age}</TextHeader>
          <TextContent>{currentPhoto.info}</TextContent> 
        </TextInfo>
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
      </MainPhotoContainer>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD
`;

const ThumbnailSlider = styled(Slider)`
  width: 80%;
  height: 120px; /* Adjusted height */
  margin-bottom: 20px;
=======
  width: 100%; /* Make container responsive */
`;

const ThumbnailSlider = styled(Slider)`
  width: 90%;
  height: 100px; /* Adjusted height */
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
`;

const ThumbnailWrapper = styled.div`
  width: 50px;
  height: 70px; /* Adjusted height to accommodate caption */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
<<<<<<< HEAD
=======
  /* margin: 0 10px;  */
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  aspect-ratio: 1 / 1;
`;

const Caption = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin-top: 5px;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: white; /* White text color */
  padding: 2px 5px; /* Padding for better readability */
  border-radius: 3px; /* Rounded corners */
`;

const MainPhotoContainer = styled.div`
  position: relative;
<<<<<<< HEAD
  width: 500px;
  height: 500px;
=======
  width: 100%;
  max-width: 500px; /* Limit maximum width */
  height: auto; /* Adjust height automatically */
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
`;

const MainPhoto = styled.img`
  width: 100%;
<<<<<<< HEAD
  height: 100%;
=======
  height: auto;
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
  object-fit: cover;
`;

const Navigation = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;

const Arrow = styled.div`
  cursor: pointer;
  font-size: 2rem;
  color: black; /* Changed to black for better visibility */
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
  padding: 10px;
  border-radius: 50%; /* Rounded shape */
`;

const NextArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 2rem;
  color: black; /* Changed to black for better visibility */
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
  padding: 10px;
  border-radius: 50%; /* Rounded shape */
  z-index: 1;
`;

const PrevArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 2rem;
  color: black; /* Changed to black for better visibility */
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
  padding: 10px;
  border-radius: 50%; /* Rounded shape */
  z-index: 1;
`;

<<<<<<< HEAD
=======
const TextInfo = styled.div`
  margin-top: 20px; 
  max-height: 120px; /* Maximum height for the text area */ 
  overflow-y: auto; /* Enable scrolling when text exceeds the limits */ 
  padding: 10px; 
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */ 
  border-radius: 5px; /* Rounded corners */ 
`;

const TextHeader = styled.div`
  font-weight: bold; 
  margin-bottom: 10px; 
`;

const TextContent = styled.div`
  white-space: pre-wrap; /* Preserve whitespace and line breaks */ 
`;

>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
export default PhotoGallery;
