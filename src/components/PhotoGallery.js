import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MapComponent from './MapComponent'; // Import the new MapComponent



const PhotoGallery = ({ data, sortBy }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  //const [sortBy, setSortBy] = useState('id'); // sort criterium
  const sliderRef = useRef(null); //reference to slider component

  // sorting function
  const sortPhotos = (photosToSort, sortProperty) => {
    return [...photosToSort].sort((a, b) => {
      if (sortProperty === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortProperty === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      // Default to id sorting
      return a.id - b.id;
    });
  };

  useEffect(() => {
    const sortedPhotos = sortPhotos(data, sortBy);
    setPhotos(sortedPhotos);
    setCurrentPhoto(sortedPhotos[0]);
  }, [data, sortBy]);

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
    slidesToScroll: 5,
    focusOnSelect: true,
    afterChange: (index) => setCurrentPhoto(photos[index]),
  };

  // to synchronize slider position when main photo changed with next or prev arrow
  const handlePrevClick = () => {
    const currentIndex = photos.findIndex(photo => photo === currentPhoto);
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentPhoto(photos[newIndex]);
    sliderRef.current.slickGoTo(newIndex);
  };

  const handleNextClick = () => {
    const currentIndex = photos.findIndex(photo => photo === currentPhoto);
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentPhoto(photos[newIndex]);
    sliderRef.current.slickGoTo(newIndex);
  };

  const handleMarkerClick = (photo) => {
    setCurrentPhoto(photo);
    const index = photos.findIndex((p) => p.id === photo.id);
    sliderRef.current.slickGoTo(index);
  };

  if (!currentPhoto) {
    return <div>Loading...</div>;
  }

  return (
    <GalleryContainer>

      <ThumbnailSlider ref={sliderRef} {...settings}>
        {photos.map((photo) => (
          <ThumbnailWrapper key={photo.id}>
            <Thumbnail key={photo.id} src={`images/thumbnails/${photo.icon}`} alt={photo.name} loading="lazy" />
            <Caption>{photo.name}</Caption>
          </ThumbnailWrapper>
        ))}
      </ThumbnailSlider>

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
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Make container responsive */
  * {
    cursor: default;
  }
`;

const ThumbnailSlider = styled(Slider)`
  width: 90%;
  height: 100px; /* Adjusted height */
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 80px; /* Adjust height for mobile */
  }
`;

const ThumbnailWrapper = styled.div`
  width: 50px;
  height: 70px; /* Adjusted height to accommodate caption */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 60px; /* Adjust height for mobile */
  }
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  aspect-ratio: 1 / 1;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px; /* Adjust size for mobile */
  }
`;

const Caption = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin-top: 5px;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: white; /* White text color */
  padding: 2px 5px; /* Padding for better readability */
  border-radius: 3px; /* Rounded corners */

  @media (max-width: 768px) {
    font-size: 0.7rem; /* Adjust font size for mobile */
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px; /* Adjust as needed */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack elements vertically on mobile */
  }
`;

const MainPhotoContainer = styled.div`
  position: relative;
  width: 50%;
  max-width: 500px; /* Limit maximum width */
  /* height: auto; */ /* Adjust height automatically */
  height: 500px; 
  margin-right: 20px; /* Add margin to the right */

  @media (max-width: 768px) {
    width: 100%;
    height: auto; /* Adjust height for mobile */
    margin-right: 0; /* Remove margin for mobile */
    margin-bottom: 20px; /* Add margin to the bottom for mobile */
  }
`;

const MainPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; // ensure foto is fully displayed and scaled if necessary

  @media (max-width: 768px) {
    height: auto; /* Adjust height for mobile */
  }
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

const TextInfo = styled.div`
  margin-top: 20px; 
  max-height: 120px; /* Maximum height for the text area */ 
  overflow-y: auto; /* Enable scrolling when text exceeds the limits */ 
  padding: 10px; 
  border-radius: 5px; /* Rounded corners */ 

  @media (max-width: 768px) {
    max-height: 100px; /* Adjust height for mobile */
  }
`;

const TextHeader = styled.div`
  font-weight: bold; 
  margin-bottom: 10px; 
`;

const TextContent = styled.div`
  white-space: pre-wrap; /* Preserve whitespace and line breaks */ 
`;

const MapContainerWrapper = styled.div`
  width: 50%; /* Adjust width to 50% */
  height: 500px; /* Fixed height */
  margin-left: 20px; /* Add margin to the left */

  @media (max-width: 768px) {
    width: 100%;
    height: 500px; /* Adjust height for mobile */
    margin-left: 0; /* Remove margin for mobile */
  }
`;


export default PhotoGallery;


