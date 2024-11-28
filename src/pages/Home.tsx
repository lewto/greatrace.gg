import React from 'react';
import LoginForm from '../components/LoginForm';
import AnimatedLogo from '../components/AnimatedLogo';
import { Trophy, Download, Sparkles } from 'lucide-react';
import CertificatePreview from '../components/CertificatePreview';

const exampleCertificate = {
  position: '1st Place',
  driverName: 'Max Verstappen',
  trackName: 'Daytona International Speedway',
  date: 'March 14, 2024',
  lapTime: '1:43.567',
  carName: 'Red Bull Racing RB19',
  split: 'Top Split',
  startPosition: 'P1',
  fastestLap: true,
  incidentPoints: 0,
  seriesName: 'FORMULA 1 WORLD CHAMPIONSHIP',
  achievement: 'GRAND PRIX VICTORY'
};

export default function Home() {
  const handleLogin = async () => {
    // Login logic will be handled by the LoginForm component
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Header */}
      <header className="pt-12 pb-8">
        <div className="container mx-auto px-6">
          <AnimatedLogo />
        </div>
      </header>

      <main className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Features */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold font-orbitron leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent relative group">
                Achievement Unlocked
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
              </h1>
              <p className="text-xl text-gray-400">
                Transform your iRacing victories into stunning certificates and collectible achievement graphics.
              </p>
            </div>

            <div className="space-y-8">
              <Feature 
                icon={Trophy}
                title="Amazing-Looking Certificates"
                description="Showcase your racing accomplishments with beautifully designed, professional certificates for every victory."
              />
              <Feature 
                icon={Download}
                title="One-Click Downloads & Sharing"
                description="Download high-resolution certificates or share them directly to your favorite social platforms with one click."
              />
              <Feature 
                icon={Sparkles}
                title="Collectible Achievements"
                description="Coming Soon: Unlock special achievements and collect unique graphics for your racing milestones."
              />
            </div>

            <LoginForm onLogin={handleLogin} />
          </div>

          {/* Right Column - Example Certificate */}
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#FF1801] to-[#FF4D4D] rounded-lg blur opacity-25"></div>
            <div className="relative">
              <CertificatePreview data={exampleCertificate} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const Feature = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
}) => (
  <div className="flex items-start space-x-6">
    <div className="flex-shrink-0">
      <Icon className="w-8 h-8 text-[#FF1801]" />
    </div>
    <div>
      <h3 className="font-bold text-xl text-white">{title}</h3>
      <p className="text-lg text-gray-400 mt-2">{description}</p>
    </div>
  </div>
);