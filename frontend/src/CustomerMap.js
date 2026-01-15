import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function CustomerMap() {
  const [customers, setCustomers] = useState([]);
  const [customerLocations, setCustomerLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch customers from API
    fetch('/customer')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        geocodeCustomers(data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  // Convert postcodes to coordinates using a geocoding service
  const geocodeCustomers = async (customers) => {
    const locations = [];
    
    for (const customer of customers) {
      if (customer.postcode) {
        try {
          // Using Nominatim (OpenStreetMap) geocoding service - free, no API key
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(customer.postcode)}&countrycodes=gb,us`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            locations.push({
              id: customer.id,
              name: customer.name,
              postcode: customer.postcode,
              street: customer.street,
              city: customer.city,
              county: customer.county,
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon)
            });
          }
          
          // Respect rate limiting - wait 1 second between requests
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error geocoding postcode ${customer.postcode}:`, error);
        }
      }
    }
    
    setCustomerLocations(locations);
    setLoading(false);
  };

  // Default center (UK)
  const defaultCenter = [54.5, -2.0];
  const defaultZoom = 6;

  if (loading) {
    return (
      <div>
        <h2>Customer Map</h2>
        <p>Loading map and geocoding customer postcodes... This may take a few moments.</p>
      </div>
    );
  }

  if (customerLocations.length === 0) {
    return (
      <div>
        <h2>Customer Map</h2>
        <p>No customers with valid postcodes found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Customer Map</h2>
      <p>Showing {customerLocations.length} customer(s) on the map</p>
      
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: '600px', width: '100%', marginTop: '20px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {customerLocations.map(location => (
          <Marker 
            key={location.id} 
            position={[location.lat, location.lon]}
          >
            <Popup>
              <strong>{location.name}</strong><br />
              {location.street && <>{location.street}<br /></>}
              {location.city && <>{location.city}<br /></>}
              {location.county && <>{location.county}<br /></>}
              <strong>Postcode:</strong> {location.postcode}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CustomerMap;