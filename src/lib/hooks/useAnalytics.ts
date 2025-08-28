"use client";

import { useState, useEffect } from 'react';
import { createGA4Client } from '../analytics/ga4-client';

interface AnalyticsHookOptions {
  refreshInterval?: number;
  dateRange?: string;
  autoRefresh?: boolean;
}

interface AnalyticsState {
  data: unknown;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useAnalytics(options: AnalyticsHookOptions = {}) {
  const {
    refreshInterval = 60000, // 1 minute default
    dateRange = '30d',
    autoRefresh = true,
  } = options;

  const [state, setState] = useState<AnalyticsState>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const ga4Client = createGA4Client();

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const data = await ga4Client.fetchAnalyticsData({ dateRange });
      
      setState({
        data,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    refresh,
  };
}

export function useRealTimeAnalytics(options: { refreshInterval?: number } = {}) {
  const { refreshInterval = 5000 } = options; // 5 seconds for real-time

  const [state, setState] = useState<AnalyticsState>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const ga4Client = createGA4Client();

  const fetchRealTimeData = async () => {
    try {
      const data = await ga4Client.fetchRealTimeData();
      
      setState(prev => ({
        ...prev,
        data,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  useEffect(() => {
    fetchRealTimeData();
    
    const interval = setInterval(fetchRealTimeData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}