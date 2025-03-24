import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { fetchGeotaggedPosts } from '@/modules/social/api';
import LoadingIndicator from '@/shared/components/LoadingIndicator';
import SocialIcon from '@/shared/components/SocialIcon';
import { format } from 'date-fns';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 12rem)',
};

const center = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
};

export default function MapView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadMapData = async () => {
      try {
        setLoading(true);
        const data = await fetchGeotaggedPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error loading map data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMapData();
  }, []);

  // Function to get marker icon based on risk level
  const getMarkerIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'high':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      case 'medium':
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 'low':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      default:
        return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.riskLevel === filter);

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const panToMarker = (post) => {
    if (mapRef) {
      mapRef.panTo({ lat: post.latitude, lng: post.longitude });
      setSelectedPost(post);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Map View</h1>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            <h2 className="text-lg font-medium">Risk Levels:</h2>
            <div className="flex items-center">
              <img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="High Risk" className="h-6 w-6 mr-1" />
              <span className="text-sm">High Risk</span>
            </div>
            <div className="flex items-center">
              <img src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" alt="Medium Risk" className="h-6 w-6 mr-1" />
              <span className="text-sm">Medium Risk</span>
            </div>
            <div className="flex items-center">
              <img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="Low Risk" className="h-6 w-6 mr-1" />
              <span className="text-sm">Low Risk</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'all' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'high' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              High
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'medium' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'low' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Low
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <LoadingIndicator size="lg" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-3/4">
              <LoadScript googleMapsApiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={12}
                  onLoad={onMapLoad}
                >
                  {filteredPosts.map((post) => (
                    <Marker
                      key={post.id}
                      position={{
                        lat: post.latitude,
                        lng: post.longitude,
                      }}
                      icon={getMarkerIcon(post.riskLevel)}
                      onClick={() => setSelectedPost(post)}
                    />
                  ))}
                  
                  {selectedPost && (
                    <InfoWindow
                      position={{
                        lat: selectedPost.latitude,
                        lng: selectedPost.longitude,
                      }}
                      onCloseClick={() => setSelectedPost(null)}
                    >
                      <div className="max-w-xs">
                        <div className="flex items-center">
                          <SocialIcon platform={selectedPost.platform} />
                          <span className="ml-2 font-bold">{selectedPost.username}</span>
                        </div>
                        <div className="text-sm mt-1">{selectedPost.content}</div>
                        <div className="text-xs mt-1 text-gray-500">
                          {format(new Date(selectedPost.timestamp), 'PPp')}
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
            
            <div className="w-full md:w-1/4 bg-gray-50 rounded-lg p-3 h-96 overflow-y-auto">
              <h3 className="font-medium text-gray-700 mb-2">Incident List</h3>
              {filteredPosts.length === 0 ? (
                <p className="text-gray-500 text-sm">No incidents matching current filter</p>
              ) : (
                <ul className="space-y-2">
                  {filteredPosts.map(post => (
                    <li 
                      key={post.id} 
                      className="p-2 bg-white rounded shadow-sm cursor-pointer hover:bg-blue-50"
                      onClick={() => panToMarker(post)}
                    >
                      <div className="flex items-center">
                        <SocialIcon platform={post.platform} />
                        <span className="ml-2 text-sm font-medium">{post.username}</span>
                      </div>
                      <p className="text-xs mt-1 line-clamp-2">{post.content}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">{post.location}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          post.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                          post.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {post.riskLevel}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}