import { useState, useEffect } from 'react';
import { StreetDashboardData } from '@/types/street';

export interface StreetDataMeta {
  period: string;
  lastUpdated: string;
  source: 'mock' | 'street-api';
}

export function useStreetData(period: string = '30d') {
  const [data, setData] = useState<StreetDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<StreetDataMeta | null>(null);

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `/api/street-data?period=${period}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setMeta(result.meta);
      } else {
        throw new Error(result.message || 'Failed to load Street data');
      }
    } catch (err) {
      console.error('Failed to load Street data:', err);
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
    meta,
    refresh,
  };
}
