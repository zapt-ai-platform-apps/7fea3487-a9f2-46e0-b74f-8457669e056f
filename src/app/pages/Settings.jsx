import React, { useState } from 'react';
import { FaSave, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';

export default function Settings() {
  const [settings, setSettings] = useState({
    socialSources: {
      twitter: true,
      instagram: true,
      tiktok: true,
      facebook: false,
    },
    refreshInterval: 5,
    alertThreshold: 'medium',
    notificationsEnabled: true,
    geolocationRadius: 10,
    autoRefresh: true,
    satelliteImagery: false,
  });
  
  const [saved, setSaved] = useState(false);

  const handleSocialSourceChange = (source) => {
    setSettings({
      ...settings,
      socialSources: {
        ...settings.socialSources,
        [source]: !settings.socialSources[source],
      },
    });
    setSaved(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
    setSaved(false);
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      socialSources: {
        twitter: true,
        instagram: true,
        tiktok: true,
        facebook: false,
      },
      refreshInterval: 5,
      alertThreshold: 'medium',
      notificationsEnabled: true,
      geolocationRadius: 10,
      autoRefresh: true,
      satelliteImagery: false,
    };
    
    setSettings(defaultSettings);
    setSaved(false);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    setSaved(true);
    
    // Reset the saved status after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        {saved && (
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center text-sm">
            <FaCheck className="mr-1" />
            Settings saved
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Data Sources</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.socialSources.twitter}
                  onChange={() => handleSocialSourceChange('twitter')}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">Twitter / X</span>
              </label>
              <span className="text-xs text-gray-500">Public posts with location data</span>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.socialSources.instagram}
                  onChange={() => handleSocialSourceChange('instagram')}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">Instagram</span>
              </label>
              <span className="text-xs text-gray-500">Public posts with location data</span>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.socialSources.tiktok}
                  onChange={() => handleSocialSourceChange('tiktok')}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">TikTok</span>
              </label>
              <span className="text-xs text-gray-500">Public videos with location data</span>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.socialSources.facebook}
                  onChange={() => handleSocialSourceChange('facebook')}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">Facebook</span>
              </label>
              <span className="text-xs text-gray-500">Public posts with location data</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Alerts & Notifications</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Refresh Interval (minutes)
              </label>
              <input
                type="number"
                name="refreshInterval"
                value={settings.refreshInterval}
                onChange={handleInputChange}
                min="1"
                max="60"
                className="box-border shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Threshold
              </label>
              <select
                name="alertThreshold"
                value={settings.alertThreshold}
                onChange={handleInputChange}
                className="box-border mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="high">High Risk Only</option>
                <option value="medium">Medium Risk and Above</option>
                <option value="low">All Risks</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notificationsEnabled"
                checked={settings.notificationsEnabled}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Enable Real-time Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="autoRefresh"
                checked={settings.autoRefresh}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Auto-refresh Data
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Map & Geolocation Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Search Radius (km)
              </label>
              <input
                type="number"
                name="geolocationRadius"
                value={settings.geolocationRadius}
                onChange={handleInputChange}
                min="1"
                max="100"
                className="box-border shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="satelliteImagery"
                checked={settings.satelliteImagery}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Use Satellite Imagery When Available
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleResetSettings}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            <FaTrash className="mr-2 -ml-1 h-4 w-4" />
            Reset to Defaults
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            <FaSave className="mr-2 -ml-1 h-4 w-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}