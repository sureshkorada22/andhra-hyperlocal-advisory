import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { OpportunityFactor, DistanceBin, ThreatItem, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { BarChart3, PieChart as PieIcon, Activity } from 'lucide-react';

interface ChartsSectionProps {
  language: Language;
  factors: OpportunityFactor[];
  directCount: number;
  indirectCount: number;
  distanceBins: DistanceBin[];
  threats: ThreatItem[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  language,
  factors,
  directCount,
  indirectCount,
  distanceBins,
  threats,
}) => {
  const t = translations[language];

  // Localize factor names
  const translateFactor = (name: string) => {
    const fn = name.toLowerCase();
    if (fn.includes("customer")) return t.factorCustomer;
    if (fn.includes("gap")) return t.factorMarketGap;
    if (fn.includes("competition")) return t.factorCompetition;
    if (fn.includes("access")) return t.factorAccessibility;
    if (fn.includes("infra")) return t.factorInfrastructure;
    if (fn.includes("demand")) return t.factorDemand;
    return name;
  };

  const localizedFactors = factors.map(f => ({
    ...f,
    localizedName: translateFactor(f.factor)
  }));

  const pieData = [
    { name: t.directCompetitors, value: directCount, color: '#e11d48' },
    { name: t.indirectCompetitors, value: indirectCount, color: '#f59e0b' }
  ].filter(d => d.value > 0);

  const hasCompetitors = directCount + indirectCount > 0;

  // Threat count by level
  const threatLevels = [
    { level: 'High', count: threats.filter(th => th.level === 'High').length, color: '#e11d48' },
    { level: 'Medium', count: threats.filter(th => th.level === 'Medium').length, color: '#f59e0b' },
    { level: 'Low', count: threats.filter(th => th.level === 'Low').length, color: '#10b981' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Chart 1: Opportunity Factors (Score per Component) */}
      <div className="card-3d-surface p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 text-slate-900 font-black text-base">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-800 flex items-center justify-center border border-emerald-300 border-b-2 border-b-emerald-400 shadow-2xs">
            <BarChart3 className="w-4 h-4 text-emerald-700 drop-shadow-xs" />
          </div>
          <h4>{t.chartFactorsTitle}</h4>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={localizedFactors}
              layout="vertical"
              margin={{ top: 5, right: 25, left: 40, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="localizedName"
                tick={{ fontSize: 11 }}
                width={130}
              />
              <Tooltip
                formatter={(val: any) => [`${val} / 100`, t.scoreWord]}
                contentStyle={{ borderRadius: '0.75rem', fontSize: '12px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                {localizedFactors.map((_, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={idx === 0 ? '#059669' : idx === 1 ? '#0d9488' : idx === 2 ? '#6366f1' : '#f59e0b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Direct vs Indirect Competition Distribution */}
      <div className="card-3d-surface p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 text-slate-900 font-black text-base">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-rose-100 to-rose-200 text-rose-800 flex items-center justify-center border border-rose-300 border-b-2 border-b-rose-400 shadow-2xs">
            <PieIcon className="w-4 h-4 text-rose-700 drop-shadow-xs" />
          </div>
          <h4>{t.chartCompetitionTitle}</h4>
        </div>
        <div className="w-full h-64 flex items-center justify-center">
          {hasCompetitors ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '0.75rem', fontSize: '12px' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-slate-400 text-xs sm:text-sm font-medium">
              {t.noCompetitorsRecorded}
            </div>
          )}
        </div>
      </div>

      {/* Chart 3: Competitor Distance Distribution */}
      <div className="card-3d-surface p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 text-slate-900 font-black text-base">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-indigo-100 to-indigo-200 text-indigo-800 flex items-center justify-center border border-indigo-300 border-b-2 border-b-indigo-400 shadow-2xs">
            <Activity className="w-4 h-4 text-indigo-700 drop-shadow-xs" />
          </div>
          <h4>{t.chartDistanceTitle}</h4>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={distanceBins}
              margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
            >
              <XAxis dataKey="range" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(val: any) => [`${val} ${t.competitorsWord}`, t.itemsWord]}
                contentStyle={{ borderRadius: '0.75rem', fontSize: '12px' }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Identified Threat Severity Breakdown */}
      <div className="card-3d-surface p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 text-slate-900 font-black text-base">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 text-amber-800 flex items-center justify-center border border-amber-300 border-b-2 border-b-amber-400 shadow-2xs">
            <Activity className="w-4 h-4 text-amber-700 drop-shadow-xs" />
          </div>
          <h4>{t.chartRiskTitle}</h4>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={threatLevels}
              margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
            >
              <XAxis dataKey="level" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(val: any) => [`${val} ${t.itemsWord}`, t.severityWord]}
                contentStyle={{ borderRadius: '0.75rem', fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {threatLevels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
