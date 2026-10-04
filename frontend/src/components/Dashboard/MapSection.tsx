import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CompetitorStats, LocationItem, Language, CompetitorItem } from '../../types';
import { translations } from '../../i18n/translations';
import { MapPin } from 'lucide-react';
import { resolveExactLocation } from '../../services/locationDescriptor';

interface MapSectionProps {
  language: Language;
  location: LocationItem;
  radiusKm: number;
  competitors: CompetitorStats;
}

// Custom SVG Teardrop Pin for Leaflet with distinct tag label (D1, D2, I1, etc.)
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2.5px solid #ffffff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
        cursor: pointer;
        transition: transform 0.15s ease-in-out;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: ${label.length > 2 ? '9px' : '11px'};
          font-weight: 900;
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          letter-spacing: -0.5px;
          text-align: center;
          line-height: 1;
        ">${label}</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const userIcon = createCustomIcon('#059669', '★');

interface DisambiguatedCompetitor extends CompetitorItem {
  displayLat: number;
  displayLon: number;
  tag: string;
  type: 'direct' | 'indirect';
  color: string;
}

// Viewport auto-fitter to guarantee radius circle & all pins are comfortably inside the view
const MapBoundsHandler: React.FC<{
  center: [number, number];
  radiusKm: number;
  points: Array<[number, number]>;
}> = ({ center, radiusKm, points }) => {
  const map = useMap();

  useEffect(() => {
    // Generate bounding box for center + radius circle + 5% buffer
    const degLat = (radiusKm * 1.06) / 111.0;
    const degLon = (radiusKm * 1.06) / (111.0 * Math.cos((center[0] * Math.PI) / 180));

    const bounds = L.latLngBounds(
      [center[0] - degLat, center[1] - degLon],
      [center[0] + degLat, center[1] + degLon]
    );

    // Ensure all competitor points are also included
    for (const pt of points) {
      bounds.extend(pt);
    }

    map.fitBounds(bounds, { padding: [25, 25], maxZoom: 14 });
  }, [center[0], center[1], radiusKm, points.length, map]);

  return null;
};

export const MapSection: React.FC<MapSectionProps> = ({
  language,
  location,
  radiusKm,
  competitors,
}) => {
  const t = translations[language];
  const [showDirect, setShowDirect] = useState(true);
  const [showIndirect, setShowIndirect] = useState(true);
  const [showRadius, setShowRadius] = useState(true);

  const center: [number, number] = [location.latitude, location.longitude];

  // Disambiguate overlapping or clustered pins so every single business is individually visible!
  const mappedCompetitors = useMemo(() => {
    const items: DisambiguatedCompetitor[] = [];

    if (showDirect && competitors.direct_competitors) {
      competitors.direct_competitors.forEach((c, idx) => {
        items.push({
          ...c,
          displayLat: c.latitude,
          displayLon: c.longitude,
          tag: `D${idx + 1}`,
          type: 'direct',
          color: '#e11d48'
        });
      });
    }

    if (showIndirect && competitors.indirect_competitors) {
      competitors.indirect_competitors.forEach((c, idx) => {
        items.push({
          ...c,
          displayLat: c.latitude,
          displayLon: c.longitude,
          tag: `I${idx + 1}`,
          type: 'indirect',
          color: '#d97706'
        });
      });
    }

    // Detect overlapping coordinates (threshold ~0.0035 degrees ~= 350 meters)
    const threshold = 0.0035;
    const clusters: DisambiguatedCompetitor[][] = [];
    const visited = new Set<number>();

    for (let i = 0; i < items.length; i++) {
      if (visited.has(i)) continue;
      const cluster = [items[i]];
      visited.add(i);

      for (let j = i + 1; j < items.length; j++) {
        if (visited.has(j)) continue;
        const dLat = Math.abs(items[i].latitude - items[j].latitude);
        const dLon = Math.abs(items[i].longitude - items[j].longitude);
        if (dLat < threshold && dLon < threshold) {
          cluster.push(items[j]);
          visited.add(j);
        }
      }
      clusters.push(cluster);
    }

    // Apply clean radial rosette/fan offset for overlapping clusters so every marker is distinct
    clusters.forEach(cluster => {
      if (cluster.length > 1) {
        // ~280 meters offset (~25px at zoom 12)
        const offsetRadius = 0.0026;
        const angleStep = (2 * Math.PI) / cluster.length;
        cluster.forEach((item, k) => {
          const angle = k * angleStep;
          item.displayLat = item.latitude + offsetRadius * Math.sin(angle);
          item.displayLon =
            item.longitude +
            (offsetRadius * Math.cos(angle)) / Math.cos((item.latitude * Math.PI) / 180);
        });
      }
    });

    return items;
  }, [competitors, showDirect, showIndirect]);

  const activePoints: Array<[number, number]> = useMemo(() => {
    return mappedCompetitors.map(c => [c.displayLat, c.displayLon]);
  }, [mappedCompetitors]);

  return (
    <div className="card-3d-surface p-6 sm:p-7 overflow-hidden shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-800 flex items-center justify-center border border-emerald-300 border-b-2 border-b-emerald-400 shadow-2xs">
            <MapPin className="w-5 h-5 text-emerald-700 drop-shadow-xs" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{t.mapTitle}</h3>
            <span className="text-xs font-semibold text-slate-500">
              {location.village_or_town || location.district} ({radiusKm} km radius)
            </span>
          </div>
        </div>

        {/* Map Layer Filter Toggles with 3D Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <label className="badge-3d inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-50 cursor-pointer text-slate-800 border border-slate-300 border-b-2 border-b-slate-300 transition-all">
            <input
              type="checkbox"
              checked={showDirect}
              onChange={(e) => setShowDirect(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0 cursor-pointer"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block shadow-2xs"></span>
            <span>{t.layerDirect} ({competitors.direct_count})</span>
          </label>

          <label className="badge-3d inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-50 cursor-pointer text-slate-800 border border-slate-300 border-b-2 border-b-slate-300 transition-all">
            <input
              type="checkbox"
              checked={showIndirect}
              onChange={(e) => setShowIndirect(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0 cursor-pointer"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-2xs"></span>
            <span>{t.layerIndirect} ({competitors.indirect_count})</span>
          </label>

          <label className="badge-3d inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-50 cursor-pointer text-slate-800 border border-slate-300 border-b-2 border-b-slate-300 transition-all">
            <input
              type="checkbox"
              checked={showRadius}
              onChange={(e) => setShowRadius(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0 cursor-pointer"
            />
            <span>{t.layerRadius} ({radiusKm} km)</span>
          </label>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner">
        <MapContainer
          center={center}
          zoom={radiusKm <= 2 ? 14 : radiusKm <= 5 ? 13 : radiusKm <= 10 ? 12 : 10}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Viewport Bounds Handler */}
          <MapBoundsHandler center={center} radiusKm={radiusKm} points={activePoints} />

          {/* User Location Marker */}
          <Marker position={center} icon={userIcon}>
            <Tooltip direction="top" offset={[0, -28]} opacity={0.95}>
              <span className="font-bold text-xs">📍 {location.village_or_town || location.resolved_name.split(',')[0]} (Your Location)</span>
            </Tooltip>
            <Popup>
              <div className="p-1">
                <div className="font-black text-slate-900 text-sm">
                  {location.village_or_town || location.resolved_name.split(',')[0]}
                </div>
                <div className="text-xs text-emerald-700 font-bold mt-0.5">
                  {t.yourLocation}
                </div>
                <div className="text-2xs text-slate-500 mt-1 font-mono">
                  {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Radius Buffer Circle */}
          {showRadius && (
            <Circle
              center={center}
              radius={radiusKm * 1000}
              pathOptions={{
                color: '#059669',
                fillColor: '#10b981',
                fillOpacity: 0.08,
                weight: 2.5,
                dashArray: '5, 5'
              }}
            />
          )}

          {/* Disambiguated Competitor Markers with exact D1..Dn, I1..In Badges */}
          {mappedCompetitors.map((comp) => (
            <Marker
              key={`${comp.type}-${comp.tag}-${comp.name}-${comp.distance_km}`}
              position={[comp.displayLat, comp.displayLon]}
              icon={createCustomIcon(comp.color, comp.tag)}
            >
              <Tooltip direction="top" offset={[0, -28]} opacity={0.95}>
                <span className="font-bold text-xs">{comp.tag}: {comp.name} ({comp.distance_km.toFixed(1)} km)</span>
              </Tooltip>
              <Popup>
                <div className="p-1 space-y-1.5 min-w-[180px]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-5 h-5 rounded-full text-white text-3xs font-black inline-flex items-center justify-center shrink-0"
                      style={{ backgroundColor: comp.color }}
                    >
                      {comp.tag}
                    </span>
                    <span className="font-bold text-slate-900 text-sm leading-snug">{comp.name}</span>
                  </div>
                  <div
                    className={`inline-block px-2 py-0.5 rounded-md text-2xs font-extrabold border ${
                      comp.type === 'direct'
                        ? 'bg-rose-100 text-rose-800 border-rose-200'
                        : 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}
                  >
                    {comp.type === 'direct' ? t.directCompetitors : t.indirectCompetitors} ({comp.tag})
                  </div>
                  <div className="text-xs text-slate-800 font-semibold flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{resolveExactLocation(comp, location).area}</span>
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    {t.distanceLabel}{' '}
                    <span className="font-bold text-slate-900">{comp.distance_km.toFixed(2)} km</span>
                  </div>
                  <div className="text-2xs text-slate-500 font-mono">
                    {comp.latitude.toFixed(4)}°N, {comp.longitude.toFixed(4)}°E
                  </div>
                  <div className="text-2xs text-slate-500">
                    {t.sourceLabel} {comp.source} {comp.verification_status ? `(${comp.verification_status})` : ''}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>


    </div>
  );
};

export default MapSection;
