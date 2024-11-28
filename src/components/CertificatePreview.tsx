import React, { useState } from 'react';
import { Trophy, Flag, Clock, Share2, Download } from 'lucide-react';
import { getTrackSvg } from '../utils/trackLayouts';

interface CertificateData {
  position: string;
  driverName: string;
  trackName: string;
  date: string;
  lapTime?: string;
  carName?: string;
  seriesName?: string;
  achievement?: string;
  split?: string;
  startPosition?: string;
  fastestLap?: boolean;
  incidentPoints?: number;
}

interface CertificatePreviewProps {
  data?: CertificateData;
  onShare?: () => void;
  onDownload?: () => void;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ 
  data,
  onShare,
  onDownload 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getPositionStyles = (position: string) => {
    if (position.includes('1st')) return {
      background: 'from-[#FFD700] to-[#FFA500]',
      glow: '0 0 40px rgba(255, 215, 0, 0.5)',
      border: 'rgba(255, 215, 0, 0.3)'
    };
    if (position.includes('2nd')) return {
      background: 'from-[#E0E0E0] to-[#A0A0A0]',
      glow: '0 0 40px rgba(224, 224, 224, 0.5)',
      border: 'rgba(224, 224, 224, 0.3)'
    };
    if (position.includes('3rd')) return {
      background: 'from-[#CD7F32] to-[#8B4513]',
      glow: '0 0 40px rgba(205, 127, 50, 0.5)',
      border: 'rgba(205, 127, 50, 0.3)'
    };
    return {
      background: 'from-[#FF1801] to-[#FF4D4D]',
      glow: '0 0 40px rgba(255, 24, 1, 0.5)',
      border: 'rgba(255, 24, 1, 0.3)'
    };
  };

  const positionStyles = getPositionStyles(data?.position || '1st');
  const trackSvg = data?.trackName ? getTrackSvg(data.trackName) : null;

  return (
    <div 
      className="relative group w-full max-w-xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Certificate Container */}
      <div 
        className="w-full aspect-[1/1.2] p-6 rounded-2xl relative overflow-hidden bg-[#0A0A0F] transition-transform duration-500 ease-out transform group-hover:scale-[1.02]"
        style={{
          boxShadow: `0 0 0 1px ${positionStyles.border}, ${positionStyles.glow}`
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black to-[#1A1A1F] opacity-50"></div>
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-speed-lines"
              style={{
                top: `${20 + i * 15}%`,
                transform: 'rotate(-45deg)',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between bg-black/40 rounded-xl p-4 border border-white/10">
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="relative inline-block">
              <Trophy className="w-12 h-12 md:w-14 md:h-14 animate-float bg-gradient-to-r ${positionStyles.background} [--tw-gradient-text] text-transparent" />
              <div className="absolute inset-0 blur-2xl opacity-50 animate-pulse" style={{ background: positionStyles.glow }}></div>
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-black tracking-wider font-orbitron bg-gradient-to-r ${positionStyles.background} bg-clip-text text-transparent`}>
                {data?.achievement || 'GRAND PRIX VICTORY'}
              </h1>
              <p className="mt-2 text-base md:text-lg font-light text-white/90">{data?.seriesName || 'FORMULA 1 WORLD CHAMPIONSHIP'}</p>
            </div>
          </div>

          {/* Driver Info */}
          <div className="flex-1 flex flex-col justify-center space-y-6 my-4 w-full">
            <div className="text-center space-y-1">
              <p className="text-base text-white/80">This certifies that</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-wide font-orbitron text-white">
                {data?.driverName || 'Max Verstappen'}
              </h2>
              <p className="text-base text-white/80">achieved</p>
            </div>

            {/* Position */}
            <div className="relative py-4">
              <h3 className={`text-4xl md:text-5xl font-black tracking-wider font-orbitron bg-gradient-to-r ${positionStyles.background} bg-clip-text text-transparent text-center`}>
                {data?.position || '1st Place'}
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
            </div>

            {/* Track Info */}
            <div className="space-y-4">
              {trackSvg && (
                <div className="h-12 md:h-14 opacity-30 animate-pulse">
                  <div dangerouslySetInnerHTML={{ __html: trackSvg }} />
                </div>
              )}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Flag className="w-5 h-5 text-red-500" />
                  <h4 className="text-xl font-bold text-white">
                    {data?.trackName || 'Silverstone Circuit'}
                  </h4>
                </div>
                {data?.lapTime && (
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <p className="text-base text-white/90">Best Lap: {data.lapTime}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">{data?.date || new Date().toLocaleDateString()}</p>
              <div className="flex items-center space-x-3">
                {onShare && (
                  <button 
                    onClick={onShare}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-red-500" />
                  </button>
                )}
                {onDownload && (
                  <button 
                    onClick={onDownload}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Download className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;