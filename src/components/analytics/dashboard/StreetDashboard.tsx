'use client';

import React, { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  DollarSign, 
  Users, 
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useStreetData } from '@/lib/hooks/useStreetData';

interface StreetDashboardProps {
  className?: string;
}

export default function StreetDashboard({ className = '' }: StreetDashboardProps) {
  const [period, setPeriod] = useState('30d');
  const { data, loading, error, meta, refresh } = useStreetData(period);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-GB').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  if (loading && !data) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Analytics</h2>
          <p className="text-gray-600">Loading Street data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-red-500 mb-4">
          <BarChart3 className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Failed to load property data</h3>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
        </div>
        <button
          onClick={refresh}
          className="bg-[#29377c] text-white px-4 py-2 rounded-lg hover:bg-[#1e2a5c] transition-colors"
        >
          <RefreshCw className="w-4 h-4 inline mr-2" />
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const { sales, valuations } = data;

  // Chart data preparation
  const salesByTypeData = sales.metrics.salesByType.map(item => ({
    name: item.propertyType,
    value: item.count,
    averagePrice: item.averagePrice,
  }));

  const priceRangeData = sales.metrics.salesByPriceRange.map(item => ({
    range: item.range,
    count: item.count,
  }));

  const COLORS = ['#29377c', '#058895', '#f37054', '#e5e7eb'];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Property Analytics</h2>
          <p className="text-gray-600">
            {sales.period.label} • Last updated: {new Date(meta?.lastUpdated || '').toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={refresh}
            className="p-2 text-gray-600 hover:text-[#29377c] transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Properties Sold</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(sales.metrics.totalSales)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {formatPercentage(sales.marketTrends.volumeChange)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Home className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(sales.metrics.totalValue)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {formatPercentage(sales.marketTrends.priceChange)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(sales.metrics.averagePrice)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {sales.metrics.averageDaysOnMarket} days avg
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valuations</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(valuations.metrics.totalValuations)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(valuations.metrics.averageValuation)} avg
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Property Type */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Property Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={salesByTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {salesByTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Price Range */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Price Range</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceRangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#29377c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sale Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Sold
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.recentSales.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{property.address}</div>
                    <div className="text-sm text-gray-500">
                      {property.bedrooms} bed • {property.bathrooms} bath • {property.sqft.toLocaleString()} sqft
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {property.propertyType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(property.salePrice || property.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.dateSold ? new Date(property.dateSold).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Trends Summary */}
      <div className="bg-gradient-to-r from-[#29377c] to-[#058895] rounded-lg shadow p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Market Trends Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm opacity-90">Price Change</p>
            <p className="text-2xl font-bold">
              {sales.marketTrends.priceChange > 0 ? (
                <span className="text-green-300">+{sales.marketTrends.priceChange}%</span>
              ) : (
                <span className="text-red-300">{sales.marketTrends.priceChange}%</span>
              )}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90">Volume Change</p>
            <p className="text-2xl font-bold">
              {sales.marketTrends.volumeChange > 0 ? (
                <span className="text-green-300">+{sales.marketTrends.volumeChange}%</span>
              ) : (
                <span className="text-red-300">{sales.marketTrends.volumeChange}%</span>
              )}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90">Days on Market</p>
            <p className="text-2xl font-bold">
              {sales.marketTrends.daysOnMarketChange < 0 ? (
                <span className="text-green-300">{sales.marketTrends.daysOnMarketChange}%</span>
              ) : (
                <span className="text-red-300">+{sales.marketTrends.daysOnMarketChange}%</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
