import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ThreatAnalysis from '@/app/pages/ThreatAnalysis';
import { fetchThreatAnalysis } from '@/modules/threats/api';

// Mock the threats API module
vi.mock('@/modules/threats/api', () => ({
  fetchThreatAnalysis: vi.fn(),
}));

// Sample mock data
const mockThreats = [
  {
    id: '1',
    title: 'Test Threat 1',
    description: 'Test description 1',
    riskLevel: 'high',
    timestamp: '2023-11-10T14:30:00Z',
    location: {
      address: 'Test Location 1',
      latitude: 37.7849,
      longitude: -122.4294,
    },
    relatedPosts: [
      {
        id: '1',
        platform: 'twitter',
        username: '@test_user',
        content: 'Test post content',
        timestamp: '2023-11-10T14:30:00Z',
        location: 'Test Location',
      },
    ],
  },
  {
    id: '2',
    title: 'Test Threat 2',
    description: 'Test description 2',
    riskLevel: 'medium',
    timestamp: '2023-11-10T13:15:00Z',
    location: {
      address: 'Test Location 2',
      latitude: 37.7793,
      longitude: -122.4193,
    },
    relatedPosts: [
      {
        id: '2',
        platform: 'instagram',
        username: 'test_user2',
        content: 'Another test post',
        timestamp: '2023-11-10T13:15:00Z',
        location: 'Another Location',
      },
    ],
  },
];

describe('ThreatAnalysis Component', () => {
  beforeEach(() => {
    fetchThreatAnalysis.mockReset();
  });

  it('displays loading state initially', () => {
    fetchThreatAnalysis.mockResolvedValue([]);
    render(<ThreatAnalysis />);
    
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('fetches and displays threat data', async () => {
    fetchThreatAnalysis.mockResolvedValue(mockThreats);
    render(<ThreatAnalysis />);
    
    await waitFor(() => {
      expect(fetchThreatAnalysis).toHaveBeenCalledTimes(1);
    });
    
    expect(screen.getByText('Test Threat 1')).toBeDefined();
    expect(screen.getByText('Test Threat 2')).toBeDefined();
    expect(screen.getByText('Test description 1')).toBeDefined();
  });

  it('filters threats by risk level', async () => {
    fetchThreatAnalysis.mockResolvedValue(mockThreats);
    render(<ThreatAnalysis />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Threat 1')).toBeDefined();
      expect(screen.getByText('Test Threat 2')).toBeDefined();
    });
    
    // Click high risk filter
    fireEvent.click(screen.getByText('High Risk'));
    
    // Should only show high risk threats
    expect(screen.getByText('Test Threat 1')).toBeDefined();
    expect(screen.queryByText('Test Threat 2')).toBeNull();
  });

  it('expands threat details when expand button is clicked', async () => {
    fetchThreatAnalysis.mockResolvedValue(mockThreats);
    render(<ThreatAnalysis />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Threat 1')).toBeDefined();
    });
    
    // Initially, related posts should not be visible
    expect(screen.queryByText('Related Social Media Content')).toBeNull();
    
    // Click expand button
    fireEvent.click(screen.getAllByText('Expand')[0]);
    
    // Now related content should be visible
    expect(screen.getByText('Related Social Media Content')).toBeDefined();
    expect(screen.getByText('@test_user')).toBeDefined();
    expect(screen.getByText('Test post content')).toBeDefined();
  });
});