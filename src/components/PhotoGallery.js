import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
<<<<<<< HEAD
=======
import MapComponent from './MapComponent'; // Import the new MapComponent
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)

const PhotoGallery = ({ data }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const sliderRef = useRef(null); //add reference to slider component

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
<<<<<<< HEAD
    slidesToScroll: 1,
=======
    slidesToScroll: 5,
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
    focusOnSelect: true,
    afterChange: (index) => setCurrentPhoto(photos[index]),
  };

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

<<<<<<< HEAD
=======
  const handleMarkerClick = (photo) => {
    setCurrentPhoto(photo);
    const index = photos.findIndex((p) => p.id === photo.id);
    sliderRef.current.slickGoTo(index);
  };

>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
  if (!currentPhoto) {
    return <div>Loading...</div>;
  }

  return (
    <GalleryContainer>
      <ThumbnailSlider ref={sliderRef} {...settings}>
        {photos.map((photo) => (
          <ThumbnailWrapper key={photo.id}>
<<<<<<< HEAD
            <Thumbnail key={photo.id} src={`/images/thumbnails/${photo.icon}`} alt={photo.name} loading="lazy" />
=======
            <Thumbnail key={photo.id} src={`images/thumbnails/${photo.icon}`} alt={photo.name} loading="lazy" />
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
            <Caption>{photo.name}</Caption>
          </ThumbnailWrapper>
        ))}
      </ThumbnailSlider>
<<<<<<< HEAD
      <MainPhotoContainer>
        <MainPhoto src={`/images/fotos/${currentPhoto.image}`} alt={currentPhoto.name} loading="lazy" />
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
      </MainPhotoContainer>
=======

      <ContentContainer>
      
        <MainPhotoContainer>
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
        </MainPhotoContainer>
        <MapContainerWrapper>
          
          <MapComponent photos={photos} currentPhoto={currentPhoto} onMarkerClick={handleMarkerClick} /> {/* Pass handleMarkerClick */}
   
        </MapContainerWrapper>

      </ContentContainer>
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
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
=======
  width: 100%; /* Make container responsive */
`;

const ThumbnailSlider = styled(Slider)`
  width: 90%;
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
  height: 100px; /* Adjusted height */
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const ThumbnailWrapper = styled.div`
  width: 50px;
  height: 70px; /* Adjusted height to accommodate caption */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* margin: 0 10px;  */
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

<<<<<<< HEAD
const MainPhotoContainer = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
=======
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px; /* Adjust as needed */
`;

const MainPhotoContainer = styled.div`
  position: relative;
  width: 50%;
  max-width: 500px; /* Limit maximum width */
  /* height: auto; */ /* Adjust height automatically */
  height: 500px; 
  margin-right: 20px; /* Add margin to the right */
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
`;

const MainPhoto = styled.img`
  width: 100%;
  height: 100%;
<<<<<<< HEAD
=======
  /* height: auto; */
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

const TextInfo = styled.div`
  margin-top: 20px; 
  max-height: 120px; /* Maximum height for the text area */ 
  overflow-y: auto; /* Enable scrolling when text exceeds the limits */ 
  padding: 10px; 
<<<<<<< HEAD
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */ 
=======
  /* background-color: rgba(255, 255, 255, 0.8);*/ /* Semi-transparent white background */ 
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
  border-radius: 5px; /* Rounded corners */ 
`;

const TextHeader = styled.div`
  font-weight: bold; 
  margin-bottom: 10px; 
`;

const TextContent = styled.div`
  white-space: pre-wrap; /* Preserve whitespace and line breaks */ 
`;

<<<<<<< HEAD
=======
const MapContainerWrapper = styled.div`
  width: 50%; /* Adjust width to 50% */
  height: 500px; /* Fixed height */
  margin-left: 20px; /* Add margin to the left */
`;


>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
export default PhotoGallery;
