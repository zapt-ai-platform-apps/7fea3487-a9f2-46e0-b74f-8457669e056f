import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaEye, FaMapMarkerAlt, FaCheck, FaLink } from 'react-icons/fa';
import { fetchThreatAnalysis } from '@/modules/threats/api';
import LoadingIndicator from '@/shared/components/LoadingIndicator';
import SocialIcon from '@/shared/components/SocialIcon';
import { format } from 'date-fns';

export default function ThreatAnalysis() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedThreat, setExpandedThreat] = useState(null);

  useEffect(() => {
    const loadThreatData = async () => {
      try {
        setLoading(true);
        const data = await fetchThreatAnalysis();
        setThreats(data);
      } catch (error) {
        console.error('Error loading threat data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadThreatData();
  }, []);

  const filteredThreats = filter === 'all' 
    ? threats 
    : threats.filter(threat => threat.riskLevel === filter);

  const toggleThreatExpansion = (threatId) => {
    if (expandedThreat === threatId) {
      setExpandedThreat(null);
    } else {
      setExpandedThreat(threatId);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Threat Analysis</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Identified Threats</h3>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'all' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              data-testid="filter-all"
            >
              All
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'high' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
              data-testid="filter-high-risk"
            >
              High Risk
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'medium' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
              data-testid="filter-medium-risk"
            >
              Medium Risk
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                filter === 'low' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
              data-testid="filter-low-risk"
            >
              Low Risk
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="p-8">
            <LoadingIndicator size="lg" />
          </div>
        ) : (
          <div>
            {filteredThreats.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No threats found matching the selected filter.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredThreats.map((threat) => (
                  <div key={threat.id} className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <h4 className="text-lg font-semibold">{threat.title}</h4>
                        <button 
                          onClick={() => toggleThreatExpansion(threat.id)} 
                          className="ml-2 text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                          data-testid={`expand-threat-${threat.id}`}
                        >
                          {expandedThreat === threat.id ? "Collapse" : "Expand"}
                        </button>
                      </div>
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          threat.riskLevel === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : threat.riskLevel === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}
                        data-testid={`threat-risk-${threat.id}`}
                      >
                        {threat.riskLevel === 'high' 
                          ? 'High Risk' 
                          : threat.riskLevel === 'medium'
                            ? 'Medium Risk'
                            : 'Low Risk'
                        }
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{threat.location.address}</span>
                      <span className="mx-2">•</span>
                      <span>{format(new Date(threat.timestamp), 'PPp')}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{threat.description}</p>
                    
                    {expandedThreat === threat.id && (
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h5 className="font-medium mb-2">Related Social Media Content</h5>
                        <div className="space-y-3">
                          {threat.relatedPosts.map((post) => (
                            <div key={post.id} className="text-sm border-l-4 border-gray-300 pl-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <SocialIcon platform={post.platform} />
                                  <span className="font-medium ml-2">{post.username}</span>
                                </div>
                                <span className="text-gray-500 text-xs">{format(new Date(post.timestamp), 'PPp')}</span>
                              </div>
                              <p className="text-gray-700 mt-1">{post.content}</p>
                              {post.location && (
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <FaMapMarkerAlt className="mr-1" />
                                  {post.location}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        <FaLink className="mr-1" />
                        Share
                      </button>
                      <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        <FaEye className="mr-1" />
                        View Details
                      </button>
                      <button className="flex items-center text-sm text-green-600 hover:text-green-800 cursor-pointer">
                        <FaCheck className="mr-1" />
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}