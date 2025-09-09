/**
 * Hook for loading social media data from CSV files
 */

import { useState, useEffect } from 'react';

export interface CombinedMetrics {
  facebook: {
    views: number;
    follows: number;
    reach: number;
    interactions: number;
    visits: number;
    linkClicks: number;
    dailyMetrics: Array<{
      date: string;
      views: number;
      follows: number;
      reach: number;
      interactions: number;
      visits: number;
      linkClicks: number;
    }>;
  };
  instagram: {
    views: number;
    follows: number;
    reach: number;
    interactions: number;
    visits: number;
    linkClicks: number;
    dailyMetrics: Array<{
      date: string;
      views: number;
      follows: number;
      reach: number;
      interactions: number;
      visits: number;
      linkClicks: number;
    }>;
  };
  lastUpdated: string;
}

export function useSocialData() {
  const [data, setData] = useState<CombinedMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/social-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.message || 'Failed to load data');
      }
    } catch (err) {
      console.error('Failed to load social data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    loadData();
  };

  return {
    data,
    loading,
    error,
    refresh
  };
}
