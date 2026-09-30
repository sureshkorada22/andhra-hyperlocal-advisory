import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CompetitorStats, LocationItem, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { MapPin } from 'lucide-react';

interface MapSectionProps {
  language: Language;
  location: LocationItem;
  radiusKm: number;
  competitors: CompetitorStats;
}

// Custom SVG Icons for Leaflet
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2.5px solid #ffffff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 11px;
          font-weight: 900;
          font-family: sans-serif;
        ">${label}</div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const userIcon = createCustomIcon('#059669', '★');
const directIcon = createCustomIcon('#e11d48', 'D');
const indirectIcon = createCustomIcon('#d97706', 'I');

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
      <div className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner">
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

          {/* User Location Marker */}
          <Marker position={center} icon={userIcon}>
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

          {/* Direct Competitor Markers */}
          {showDirect && competitors.direct_competitors.map((comp, idx) => (
            <Marker
              key={`direct-${idx}`}
              position={[comp.latitude, comp.longitude]}
              icon={directIcon}
            >
              <Popup>
                <div className="p-1 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{comp.name}</div>
                  <div className="inline-block px-2 py-0.5 rounded-md text-2xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                    {t.directCompetitors}
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    {t.distanceLabel} <span className="font-bold text-slate-900">{comp.distance_km} km</span>
                  </div>
                  <div className="text-2xs text-slate-500">
                    {t.sourceLabel} {comp.source} ({comp.verification_status})
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Indirect Competitor Markers */}
          {showIndirect && competitors.indirect_competitors.map((comp, idx) => (
            <Marker
              key={`indirect-${idx}`}
              position={[comp.latitude, comp.longitude]}
              icon={indirectIcon}
            >
              <Popup>
                <div className="p-1 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{comp.name}</div>
                  <div className="inline-block px-2 py-0.5 rounded-md text-2xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                    {t.indirectCompetitors}
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    {t.distanceLabel} <span className="font-bold text-slate-900">{comp.distance_km} km</span>
                  </div>
                  <div className="text-2xs text-slate-500">
                    {t.sourceLabel} {comp.source}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between text-2xs text-slate-500 gap-2 font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> {t.yourLocation}
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> {t.layerDirect}
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> {t.layerIndirect}
          </span>
        </div>
        <span>{t.mapHint}</span>
      </div>
    </div>
  );
};
