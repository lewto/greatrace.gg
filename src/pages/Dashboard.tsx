import React from 'react';
import { useRacing } from '../context/RacingContext';
import { useRaceData } from '../hooks/useRaceData';
import { Trophy, Medal, Flag, Clock, Share2, Download } from 'lucide-react';
import CertificatePreview from '../components/CertificatePreview';

export default function Dashboard() {
  const { driver } = useRacing();
  const { 
    loading, 
    error, 
    recentRaces, 
    achievements, 
    careerStats,
    refreshData 
  } = useRaceData(driver?.id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF1801] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-500 mb-4">Failed to load race data</p>
          <button 
            onClick={refreshData}
            className="px-4 py-2 bg-[#FF1801] rounded-lg hover:bg-[#FF4D4D] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <header className="pt-12 pb-8">
        <div className="container mx-auto px-6">
          <AnimatedLogo />
        </div>
      </header>

      <main className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Race Selection */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-orbitron">Recent Races</h2>
              <button
                onClick={refreshData}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                title="Refresh data"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 3V8M21 8H16M21 8C19.1068 6.2111 16.37 5 13.5 5C7.70101 5 3 9.70101 3 15.5C3 21.299 7.70101 26 13.5 26C18.8171 26 23.1546 22.1575 23.9015 17" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-6">
              {recentRaces.map((race) => (
                <div 
                  key={race.id}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Trophy className={`w-5 h-5 ${race.winner ? 'text-[#FFD700]' : 'text-gray-400'}`} />
                        <span className="font-orbitron font-bold">
                          {race.finishPosition}{getOrdinal(race.finishPosition)} Place
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {new Date(race.startTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{race.trackName}</p>
                      <p className="text-sm text-gray-400">{race.carClass}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <Stat icon={Flag} label="Start" value={`P${race.startPosition}`} />
                    <Stat icon={Clock} label="Best Lap" value={race.fastestLap || 'N/A'} />
                    <Stat icon={Medal} label="SOF" value={race.strength_of_field.toString()} />
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Certificate Preview */}
          <div className="sticky top-8">
            {recentRaces[0] && (
              <CertificatePreview
                data={{
                  position: `${recentRaces[0].finishPosition}${getOrdinal(recentRaces[0].finishPosition)} Place`,
                  driverName: driver?.name || '',
                  trackName: recentRaces[0].trackName,
                  date: new Date(recentRaces[0].startTime).toLocaleDateString(),
                  lapTime: recentRaces[0].fastestLap,
                  carName: recentRaces[0].carClass,
                  achievement: recentRaces[0].winner ? 'GRAND PRIX VICTORY' : 'RACE COMPLETION',
                  seriesName: 'FORMULA 1 WORLD CHAMPIONSHIP'
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="w-4 h-4 text-[#FF1801]" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}