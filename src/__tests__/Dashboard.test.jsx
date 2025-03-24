import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '@/app/pages/Dashboard';
import { api as socialApi } from '@/modules/social/api';

// Mock the social API module
vi.mock('@/modules/social/api', () => ({
  api: {
    fetchRecentSocialData: vi.fn(),
  },
}));

// Sample mock data
const mockSocialData = [
  {
    id: '1',
    platform: 'twitter',
    username: '@emergency_alert',
    content: 'Test emergency content',
    timestamp: '2023-11-10T14:30:00Z',
    location: 'Test Location',
    riskLevel: 'high',
  },
  {
    id: '2',
    platform: 'instagram',
    username: 'test_user',
    content: 'Test content',
    timestamp: '2023-11-10T13:15:00Z',
    location: 'Another Location',
    riskLevel: 'medium',
  },
];

describe('Dashboard Component', () => {
  beforeEach(() => {
    socialApi.fetchRecentSocialData.mockReset();
  });

  it('displays loading state initially', () => {
    socialApi.fetchRecentSocialData.mockResolvedValue([]);
    render(<Dashboard />);
    
    // Check for loading indicator
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('fetches and displays social data', async () => {
    socialApi.fetchRecentSocialData.mockResolvedValue(mockSocialData);
    render(<Dashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(socialApi.fetchRecentSocialData).toHaveBeenCalledTimes(1);
    });
    
    // Check if data is displayed correctly
    expect(screen.getByText('@emergency_alert')).toBeDefined();
    expect(screen.getByText('Test emergency content')).toBeDefined();
    expect(screen.getByText('test_user')).toBeDefined();
  });

  it('calculates and displays stats correctly', async () => {
    socialApi.fetchRecentSocialData.mockResolvedValue(mockSocialData);
    render(<Dashboard />);
    
    await waitFor(() => {
      // Total posts should be 2
      expect(screen.getByTestId('total-posts')).toHaveTextContent('2');
      
      // High risk count should be 1
      expect(screen.getByTestId('high-risk-count')).toHaveTextContent('1');
    });
  });

  it('handles empty data gracefully', async () => {
    socialApi.fetchRecentSocialData.mockResolvedValue([]);
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('No recent activity found.')).toBeDefined();
    });
  });
});