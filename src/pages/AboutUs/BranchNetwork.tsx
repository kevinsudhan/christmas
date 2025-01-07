import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Text } = Typography;

interface Location {
  city: string;
  state: string;
  coordinates: [number, number];
  type: 'head-office' | 'emerging';
}

const NetworkContainer = styled.div`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
`;

const NetworkHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2.5rem;
    color: #1a365d;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const MapWrapper = styled.div`
  height: 600px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 1200px;

  .leaflet-popup-content-wrapper {
    border-radius: 8px;
  }

  .leaflet-popup-content {
    margin: 8px 12px;
    font-family: system-ui, -apple-system, sans-serif;
    
    strong {
      color: #1a365d;
      display: block;
      margin-bottom: 4px;
    }

    .office-type {
      color: #4a5568;
      font-size: 0.9em;
      font-style: italic;
    }
  }
`;

const Legend = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
`;

const locations: Location[] = [
  // Tamil Nadu
  { city: 'Chennai', state: 'Tamil Nadu', coordinates: [13.0827, 80.2707], type: 'head-office' },
  { city: 'Pondicherry', state: 'Tamil Nadu', coordinates: [11.9416, 79.8083], type: 'emerging' },
  { city: 'Thirunelveli', state: 'Tamil Nadu', coordinates: [8.7139, 77.7567], type: 'emerging' },
  { city: 'Vellore', state: 'Tamil Nadu', coordinates: [12.9165, 79.1325], type: 'emerging' },
  { city: 'Coimbatore', state: 'Tamil Nadu', coordinates: [11.0168, 76.9558], type: 'emerging' },
  { city: 'Madurai', state: 'Tamil Nadu', coordinates: [9.9252, 78.1198], type: 'emerging' },
  { city: 'Trichy', state: 'Tamil Nadu', coordinates: [10.7905, 78.7047], type: 'emerging' },
  { city: 'Salem', state: 'Tamil Nadu', coordinates: [11.6643, 78.1460], type: 'emerging' },
  { city: 'Pudukottai', state: 'Tamil Nadu', coordinates: [10.3833, 78.8001], type: 'emerging' },
  { city: 'Kumbakonam', state: 'Tamil Nadu', coordinates: [10.9602, 79.3845], type: 'emerging' },
  { city: 'Chidambaram', state: 'Tamil Nadu', coordinates: [11.3992, 79.6928], type: 'emerging' },
  { city: 'Thiruvannamalai', state: 'Tamil Nadu', coordinates: [12.2253, 79.0747], type: 'emerging' },
  { city: 'Nagercoil', state: 'Tamil Nadu', coordinates: [8.1833, 77.4119], type: 'emerging' },
  { city: 'Tenkasi', state: 'Tamil Nadu', coordinates: [8.9594, 77.3161], type: 'emerging' },

  // Telangana
  { city: 'Begumpet, Hyderabad', state: 'Telangana', coordinates: [17.4400, 78.4700], type: 'head-office' },
  { city: 'Secunderabad', state: 'Telangana', coordinates: [17.4399, 78.4983], type: 'emerging' },
  { city: 'Sangareddy', state: 'Telangana', coordinates: [17.6281, 78.0900], type: 'emerging' },
  { city: 'Sadhashivapet', state: 'Telangana', coordinates: [17.6162, 77.9533], type: 'emerging' },
  { city: 'Zaheerabad', state: 'Telangana', coordinates: [17.6816, 77.6074], type: 'emerging' },
  { city: 'Tandur', state: 'Telangana', coordinates: [17.2485, 77.5766], type: 'emerging' },
  { city: 'Vikarabad', state: 'Telangana', coordinates: [17.3384, 77.9047], type: 'emerging' },
  { city: 'Warangal', state: 'Telangana', coordinates: [17.9689, 79.5941], type: 'emerging' },
  { city: 'Karim Nagar', state: 'Telangana', coordinates: [18.4386, 79.1288], type: 'emerging' },
  { city: 'Mahboob Nagar', state: 'Telangana', coordinates: [16.7488, 78.0035], type: 'emerging' },
  { city: 'Jadcharla', state: 'Telangana', coordinates: [16.7667, 78.1483], type: 'emerging' },

  // Andhra Pradesh
  { city: 'Chittoor', state: 'Andhra Pradesh', coordinates: [13.2172, 79.1003], type: 'head-office' },

  // Karnataka
  { city: 'Malleshwaram, Bangalore', state: 'Karnataka', coordinates: [12.9916, 77.5712], type: 'head-office' },
  { city: 'Bagalkot', state: 'Karnataka', coordinates: [16.1691, 75.6615], type: 'emerging' },
  { city: 'Bellary', state: 'Karnataka', coordinates: [15.1394, 76.9214], type: 'emerging' },
  { city: 'Gulbarga', state: 'Karnataka', coordinates: [17.3297, 76.8343], type: 'emerging' },
  { city: 'Mysore', state: 'Karnataka', coordinates: [12.2958, 76.6394], type: 'emerging' },
  { city: 'Mangalore', state: 'Karnataka', coordinates: [12.9141, 74.8560], type: 'emerging' },
  { city: 'Raichur', state: 'Karnataka', coordinates: [16.2120, 77.3439], type: 'emerging' },
  { city: 'Tumkur', state: 'Karnataka', coordinates: [13.3379, 77.1173], type: 'emerging' },
  { city: 'Davangere', state: 'Karnataka', coordinates: [14.4644, 75.9218], type: 'emerging' },
  { city: 'Hosur', state: 'Karnataka', coordinates: [12.7409, 77.8253], type: 'emerging' },
  { city: 'Hubli', state: 'Karnataka', coordinates: [15.3647, 75.1240], type: 'emerging' },
  { city: 'Hospet', state: 'Karnataka', coordinates: [15.2689, 76.3900], type: 'emerging' },
  { city: 'Shimoga', state: 'Karnataka', coordinates: [13.9299, 75.5681], type: 'emerging' },
  { city: 'Udipi', state: 'Karnataka', coordinates: [13.3409, 74.7421], type: 'emerging' },

  // Kerala
  { city: 'Ernakulam, Kochi', state: 'Kerala', coordinates: [9.9312, 76.2673], type: 'head-office' },
  { city: 'Thiruvananthapuram', state: 'Kerala', coordinates: [8.5241, 76.9366], type: 'emerging' },

  // Madhya Pradesh
  { city: 'Bhopal', state: 'Madhya Pradesh', coordinates: [23.2599, 77.4126], type: 'head-office' },
  { city: 'Jabalpur', state: 'Madhya Pradesh', coordinates: [23.1815, 79.9864], type: 'emerging' },
  { city: 'Indore', state: 'Madhya Pradesh', coordinates: [22.7196, 75.8577], type: 'emerging' },

  // Maharashtra
  { city: 'Andheri East, Mumbai', state: 'Maharashtra', coordinates: [19.1136, 72.8697], type: 'head-office' },

  // West Bengal
  { city: 'Kolkata', state: 'West Bengal', coordinates: [22.5726, 88.3639], type: 'head-office' },

  // Odisha
  { city: 'Bhubaneswar', state: 'Odisha', coordinates: [20.2961, 85.8245], type: 'head-office' },

  // Delhi-NCR
  { city: 'Noida', state: 'Uttar Pradesh', coordinates: [28.5355, 77.3910], type: 'head-office' },
];

function BranchNetwork(): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      // Initialize the map
      leafletMapRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      // Add the tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMapRef.current);

      // Create custom icons
      const headOfficeIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color: #1a365d; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const emergingIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color: #4299e1; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);'></div>",
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      // Add markers for each location
      locations.forEach((location) => {
        const icon = location.type === 'head-office' ? headOfficeIcon : emergingIcon;
        const marker = L.marker(location.coordinates, { icon }).addTo(leafletMapRef.current!);
        marker.bindPopup(`
          <div>
            <strong>${location.city}</strong>
            ${location.state}
            <div class="office-type">${location.type === 'head-office' ? 'Head Office' : 'Emerging Location'}</div>
          </div>
        `);
      });

      // Add legend
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
          <div style="background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 8px; font-size: 13px; color: #000000; display: flex; align-items: center;">
              <span style="display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: #1a365d; margin-right: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></span>
              <span style="font-weight: 500;">Head Office</span>
            </div>
            <div style="font-size: 13px; color: #000000; display: flex; align-items: center;">
              <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #4299e1; margin-right: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></span>
              <span style="font-weight: 500;">Emerging Location</span>
            </div>
          </div>
        `;
        return div;
      };
      legend.addTo(leafletMapRef.current);
    }

    // Cleanup function
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <NetworkContainer>
      <NetworkHeader>
        <Title level={2}>Our Branch Network</Title>
        <Text>Explore our extensive network of branches across India</Text>
      </NetworkHeader>
      <MapWrapper>
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      </MapWrapper>
    </NetworkContainer>
  );
}

export default BranchNetwork;
