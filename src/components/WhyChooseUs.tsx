import React from 'react';
import { Zap, DollarSign, Headphones, Car, ShoppingCart, Globe } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: 'Quick & Easy Booking',
      description: 'Our streamlined online booking system makes renting a car simple and fast. Get your car in minutes with our instant confirmation.'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: 'Best Price Guarantee',
      description: 'We offer the most competitive prices with no hidden fees. Find a better deal elsewhere? We\'ll match it plus give you 10% off.'
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available around the clock to assist you with any queries or emergencies during your rental period.'
    }
  ];

  const vehicleGuide = [
    {
      icon: <Car className="w-5 h-5 text-blue-500" />,
      title: 'Economy Cars',
      description: 'Great for city driving and fuel efficiency'
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-blue-500" />,
      title: 'SUVs & Minivans',
      description: 'Ideal for families and group travel'
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      title: 'Sports & Luxury',
      description: 'For those special occasions and business trips'
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold mb-2 inline-block">WHY CHOOSE US</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Trusted Car Rental Partner</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional service and value to our customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-xl p-8 md:p-12">
          <div className="md:flex md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing a Vehicle?</h3>
              <p className="text-gray-600 mb-6">
                Our car rental experts are here to help you find the perfect vehicle for your needs and budget.
              </p>
              <button 
                onClick={() => window.open('https://wa.me/905428743192?text=Merhaba,%20araç%20kiralama%20hakkında%20bilgi%20almak%20istiyorum.', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors inline-flex items-center"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Contact Our Team
              </button>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-4">Quick Vehicle Guide</h4>
                <ul className="space-y-3">
                  {vehicleGuide.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 mr-3">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;