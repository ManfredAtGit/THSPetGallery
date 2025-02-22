import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// MarkerCluster not working
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const MapComponent = ({ photos, currentPhoto, onMarkerClick }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {photos.map((photo) => (
          <Marker
              key={photo.id}
              position={[photo.lat, photo.lon]}
              icon={L.icon({
                  iconUrl: currentPhoto && currentPhoto.id === photo.id ? 'images/red-marker-icon.png' : 'images/marker-icon.png',
                  iconSize: currentPhoto.id === photo.id ?  [64, 64] : [25, 41],
                  iconAnchor: [12, 41],
              })}
              zIndexOffset={currentPhoto && currentPhoto.id === photo.id ? 1000 : 0} // Set higher zIndexOffset for current photo

              eventHandlers={{
                  click: () => onMarkerClick(photo),
              }}
          />
          
      ))}

      <MapUpdater currentPhoto={currentPhoto} />
    </MapContainer>
  );
};

const MapUpdater = ({ currentPhoto }) => {
  const map = useMap();

  useEffect(() => {
    if (currentPhoto) {
      const { lat, lon } = currentPhoto;
      map.setView([lat, lon], 10);
    }
  }, [currentPhoto, map]);

  return null;
};

export default MapComponent;
