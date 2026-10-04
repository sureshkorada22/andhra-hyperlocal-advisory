import { CompetitorItem, LocationItem } from '../types';

interface KnownAPHub {
  name: string;
  lat: number;
  lon: number;
  radiusKm: number;
}

const KNOWN_AP_HUBS: KnownAPHub[] = [
  // Visakhapatnam District
  { name: 'Anandapuram Junction (NH-16 / SH-38), Anandapuram', lat: 17.8947, lon: 83.3763, radiusKm: 1.5 },
  { name: 'Vemulavalasa Road, Anandapuram', lat: 17.8945, lon: 83.3761, radiusKm: 1.5 },
  { name: 'Kommadi Junction, Madhurawada (NH-16)', lat: 17.8242, lon: 83.3542, radiusKm: 2.0 },
  { name: 'PM Palem Main Road (Prasanthi Nagar), Madhurawada', lat: 17.8045, lon: 83.3428, radiusKm: 2.0 },
  { name: 'Car Shed Junction / PM Palem, Madhurawada', lat: 17.8045, lon: 83.3429, radiusKm: 2.0 },
  { name: 'Madhurawada IT SEZ / Mithilapuri Colony', lat: 17.8180, lon: 83.3490, radiusKm: 2.5 },
  { name: 'Bheemili Beach Road / Tagarapuvalasa', lat: 17.8900, lon: 83.4300, radiusKm: 4.0 },
  { name: 'NAD Junction / Marripalem, Visakhapatnam', lat: 17.7500, lon: 83.2500, radiusKm: 3.0 },
  { name: 'Gajuwaka Main Road / Auto Nagar, Visakhapatnam', lat: 17.6950, lon: 83.2120, radiusKm: 3.5 },
  { name: 'Pendurthi Junction / Vepagunta, Visakhapatnam', lat: 17.8300, lon: 83.2000, radiusKm: 3.0 },
  { name: 'Dwaraka Nagar / RTC Complex, Visakhapatnam', lat: 17.7280, lon: 83.3050, radiusKm: 2.5 },
  { name: 'Siripuram / VIP Road, Visakhapatnam', lat: 17.7210, lon: 83.3180, radiusKm: 2.0 },

  // Vijayawada / Krishna / NTR
  { name: 'Benz Circle / MG Road, Vijayawada', lat: 16.5015, lon: 80.6480, radiusKm: 2.5 },
  { name: 'Besant Road / Governorpet, Vijayawada', lat: 16.5120, lon: 80.6260, radiusKm: 2.0 },
  { name: 'Gannavaram Airport Road / NH-16', lat: 16.5360, lon: 80.7950, radiusKm: 3.5 },

  // Guntur
  { name: 'Brodipet / Arundelpet, Guntur', lat: 16.3040, lon: 80.4430, radiusKm: 2.5 },
  { name: 'Lodge Centre / Market Yard, Guntur', lat: 16.2950, lon: 80.4320, radiusKm: 2.0 },

  // East & West Godavari
  { name: 'Main Road / Danavaipeta, Rajahmundry', lat: 17.0005, lon: 81.7820, radiusKm: 3.0 },
  { name: 'Cinema Road / Bhanugudi Junction, Kakinada', lat: 16.9850, lon: 82.2450, radiusKm: 3.0 },
  { name: 'Powerpet / Main Bazar, Eluru', lat: 16.7110, lon: 81.1020, radiusKm: 2.5 },

  // Rayalaseema
  { name: 'KT Road / Bhavani Nagar, Tirupati', lat: 13.6288, lon: 79.4192, radiusKm: 3.0 },
  { name: 'Park Road / Bellary Chowrasta, Kurnool', lat: 15.8281, lon: 78.0373, radiusKm: 3.0 },
  { name: 'Subhash Road / Tower Clock, Anantapur', lat: 14.6819, lon: 77.6006, radiusKm: 3.0 },
  { name: 'Seven Roads Junction, Kadapa', lat: 14.4673, lon: 78.8242, radiusKm: 2.5 },
  { name: 'Trunk Road / Gandhi Nagar, Nellore', lat: 14.4426, lon: 79.9865, radiusKm: 3.0 },
  { name: 'Kurnool Road / Church Center, Ongole', lat: 15.5057, lon: 80.0499, radiusKm: 2.5 },
];

/**
 * Calculates Haversine distance in km between two lat/lon coordinates
 */
function haversineDist(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Derives cardinal direction from origin to destination
 */
function getBearingDirection(fromLat: number, fromLon: number, toLat: number, toLon: number): string {
  const dLat = toLat - fromLat;
  const dLon = toLon - fromLon;
  if (Math.abs(dLat) < 0.005 && Math.abs(dLon) < 0.005) return 'Central';

  let dir = '';
  if (dLat > 0.005) dir += 'North';
  else if (dLat < -0.005) dir += 'South';

  if (dLon > 0.005) dir += 'East';
  else if (dLon < -0.005) dir += 'West';

  return dir || 'Nearby';
}

/**
 * Resolves exact human-readable location, area, and landmark for a competitor POI
 */
export function resolveExactLocation(
  comp: CompetitorItem,
  baseLocation?: LocationItem
): { area: string; landmark: string; fullDescription: string } {
  // 1. Direct address from backend Nominatim / Overpass if rich
  if (comp.address && comp.address.trim().length > 3) {
    const parts = comp.address.split(',').map((p) => p.trim()).filter(Boolean);
    const area = parts.slice(0, 2).join(', ');
    const district = baseLocation?.district ? `${baseLocation.district} Dist.` : 'AP';
    return {
      area: area || comp.address,
      landmark: parts.length > 2 ? parts.slice(2).join(', ') : `${comp.distance_km.toFixed(1)} km radius`,
      fullDescription: `${comp.address}, ${district}`,
    };
  }

  // 2. Check known Andhra Pradesh commercial hubs
  let closestHub: KnownAPHub | null = null;
  let minHubDist = Infinity;

  for (const hub of KNOWN_AP_HUBS) {
    const d = haversineDist(comp.latitude, comp.longitude, hub.lat, hub.lon);
    if (d < hub.radiusKm && d < minHubDist) {
      minHubDist = d;
      closestHub = hub;
    }
  }

  if (closestHub) {
    const district = baseLocation?.district || 'Visakhapatnam';
    return {
      area: closestHub.name,
      landmark: `${closestHub.name} (${comp.distance_km.toFixed(1)} km from your point)`,
      fullDescription: `${closestHub.name}, ${district} District`,
    };
  }

  // 3. Fallback: compute directional offset from base location
  const baseLocName = baseLocation?.village || baseLocation?.mandal || 'Center';
  const districtName = baseLocation?.district || 'Andhra Pradesh';
  const direction = baseLocation
    ? getBearingDirection(baseLocation.latitude, baseLocation.longitude, comp.latitude, comp.longitude)
    : 'Sector';

  const generatedArea = `${comp.distance_km.toFixed(1)} km ${direction} of ${baseLocName}`;
  const landmarkDesc = `${baseLocation?.mandal ? baseLocation.mandal + ' Mandal, ' : ''}${districtName}`;

  return {
    area: generatedArea,
    landmark: landmarkDesc,
    fullDescription: `${generatedArea}, ${landmarkDesc}`,
  };
}
