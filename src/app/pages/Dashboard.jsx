import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { api as socialApi } from '@/modules/social/api';
import LoadingIndicator from '@/shared/components/LoadingIndicator';
import SocialIcon from '@/shared/components/SocialIcon';
import RiskBadge from '@/shared/components/RiskBadge';
import { format } from 'date-fns';
import * as Sentry from '@sentry/browser';

export default function Dashboard() {
  const [socialData, setSocialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    highRiskCount: 0,
    mediumRiskCount: 0,
    lowRiskCount: 0
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await socialApi.fetchRecentSocialData();
        setSocialData(data);
        
        // Calculate stats
        const highRisk = data.filter(item => item.riskLevel === 'high').length;
        const mediumRisk = data.filter(item => item.riskLevel === 'medium').length;
        const lowRisk = data.filter(item => item.riskLevel === 'low').length;
        
        setStats({
          totalPosts: data.length,
          highRiskCount: highRisk,
          mediumRiskCount: mediumRisk,
          lowRiskCount: lowRisk
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Situational Awareness Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-gray-500 text-sm font-medium">Total Posts Analyzed</h2>
          <p className="text-3xl font-bold text-gray-800" data-testid="total-posts">{stats.totalPosts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-gray-500 text-sm font-medium">High Risk Incidents</h2>
          <p className="text-3xl font-bold text-red-600" data-testid="high-risk-count">{stats.highRiskCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-gray-500 text-sm font-medium">Medium Risk Incidents</h2>
          <p className="text-3xl font-bold text-yellow-600" data-testid="medium-risk-count">{stats.mediumRiskCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-gray-500 text-sm font-medium">Low Risk Incidents</h2>
          <p className="text-3xl font-bold text-green-600" data-testid="low-risk-count">{stats.lowRiskCount}</p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        </div>
        
        {loading ? (
          <div className="p-8">
            <LoadingIndicator size="lg" />
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {socialData.map((item) => (
              <li key={item.id} className="px-4 py-4 flex items-start">
                <div className="mr-3 mt-1">
                  <SocialIcon platform={item.platform} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-900">{item.username}</p>
                    <div className="flex space-x-2 items-center">
                      <RiskBadge level={item.riskLevel} />
                      <span className="text-xs text-gray-500">{format(new Date(item.timestamp), 'PPp')}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{item.content}</p>
                  {item.location && (
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <FaMapMarkerAlt className="mr-1" />
                      {item.location}
                    </div>
                  )}
                </div>
              </li>
            ))}
            
            {socialData.length === 0 && (
              <li className="px-4 py-4 text-center text-gray-500">
                No recent activity found.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}