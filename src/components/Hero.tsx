import React from 'react';
import { Car, Play, Star, CheckCircle, Zap, MapPin } from 'lucide-react';
import { campaigns } from '../data/mockData';

interface HeroProps {
  onRentNow: () => void;
  onLocationSelect: (location: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onRentNow, onLocationSelect }) => {
  const activeCampaigns = campaigns.filter(c => c.isActive).slice(0, 2);

  const locationSuggestions = [
    { name: 'Girne', count: 12 },
    { name: 'Lefkoşa', count: 8 },
    { name: 'Gazimağusa', count: 6 },
    { name: 'İskele', count: 4 },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-500 to-blue-800 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaigns Banner */}
        {activeCampaigns.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{campaign.title}</h3>
                      <p className="text-blue-100 text-sm">{campaign.description}</p>
                    </div>
                    <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      %{campaign.discount} İndirim
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Hayalinizdeki Aracı Bugün Kiralayın
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-lg">
              Geniş araç seçeneklerimiz ve uygun fiyatlarımızla premium araç kiralama hizmeti deneyimleyin.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button onClick={onRentNow} className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center">
                <Car className="w-5 h-5 mr-2" />
                Hemen Kirala
              </button>
              <button
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                className="border-2 border-white text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Video İzle
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <Star className="w-4 h-4 fill-current opacity-50" />
                </div>
                <span className="text-blue-100">4.8/5</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>10.000+ müşterimizin güveni</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Luxury Car"
                className="rounded-xl shadow-2xl w-full h-auto transform rotate-1 hover:rotate-0 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Anında Rezervasyon</p>
                    <p className="text-gray-800 font-semibold">15 dk'da araç teslimi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location-based recommendations */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold">Konumunuza Özel Öneriler</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locationSuggestions.map((location) => (
              <button
                key={location.name}
                onClick={() => onLocationSelect(location.name)}
                className="text-center p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="bg-white/20 rounded-lg p-3 mb-2">
                  <Car className="w-6 h-6 mx-auto" />
                </div>
                <p className="text-sm">{location.name}'de {location.count} araç</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;