import axios from 'axios';
import { LocationItem, AnalysisResponse, BusinessCategory, LocationHierarchyResponse } from '../types';

const getApiBase = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    const cleaned = envUrl.trim().replace(/\/+$/, '');
    return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
  }

  if (typeof window !== 'undefined' && window.location) {
    // If accessing Vite dev server (port 5173), dynamically use browser hostname with backend port 8000
    // This allows mobile devices on local Wi-Fi (e.g. 192.168.1.x:5173) to reach 192.168.1.x:8000
    if (window.location.port === '5173') {
      const hostname = window.location.hostname || 'localhost';
      return `${window.location.protocol}//${hostname}:8000/api`;
    }
  }

  // Same-origin relative path for all production deployments, tunnels, reverse proxies, and Docker
  return '/api';
};

const client = axios.create({
  baseURL: getApiBase(),
  timeout: 60000,
  headers: {
    'Bypass-Tunnel-Reminder': 'true',
    'ngrok-skip-browser-warning': 'true',
  },
});

export const apiService = {
  async getCategories(): Promise<BusinessCategory[]> {
    const res = await client.get('/categories');
    return res.data.categories;
  },

  async getLocationHierarchy(): Promise<LocationHierarchyResponse> {
    const res = await client.get('/location/hierarchy');
    return res.data;
  },

  async geocodeLocation(query: string) {
    const res = await client.post('/location/geocode', { query });
    return res.data;
  },

  async reverseGeocodeLocation(latitude: number, longitude: number) {
    const res = await client.post('/location/reverse-geocode', { latitude, longitude });
    return res.data;
  },

  async understandBusiness(businessText: string, categorySlug?: string) {
    const res = await client.post('/business/understand', {
      business_text: businessText,
      category_slug: categorySlug
    });
    return res.data;
  },

  async analyze(
    location: LocationItem,
    business: any,
    radiusKm: number,
    language: string,
    marginCapital: number = 100000,
    isDemo: boolean = false
  ): Promise<AnalysisResponse> {
    const res = await client.post('/analyze', {
      location,
      business,
      radius_km: radiusKm,
      language,
      margin_capital: marginCapital,
      is_demo: isDemo || Boolean(location.is_demo),
    });
    return res.data;
  },

  async suggestBusiness(data: {
    business_name: string;
    category: string;
    location_text: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    supporting_info?: string;
  }) {
    const res = await client.post('/business/suggest', data);
    return res.data;
  },

  async getSources() {
    const res = await client.get('/sources');
    return res.data;
  },

  async calculateFinance(marginCapital: number) {
    const res = await client.post('/finance/calculate', { margin_capital: marginCapital });
    return res.data;
  },

  async getFinanceSchedule(data: {
    loan_amount: number;
    interest_rate_pa: number;
    tenure_years: number;
    moratorium_months: number;
    frequency?: string;
  }) {
    const res = await client.post('/finance/schedule', data);
    return res.data;
  },

  async getSchemes() {
    const res = await client.get('/finance/schemes');
    return res.data.schemes;
  }
};
