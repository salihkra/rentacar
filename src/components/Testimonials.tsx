import React from 'react';
import { Star, Car, HelpCircle } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      rentals: 5,
      rating: 5,
      comment: 'The booking process was incredibly smooth and the car was in perfect condition when I picked it up. The staff was friendly and professional. Will definitely use AutoRent Pro again for my next trip!',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Family Vacation',
      rentals: 2,
      rating: 4.5,
      comment: 'Excellent service from start to finish. We rented an SUV for our family vacation and it was perfect. The price was reasonable and the pickup/drop-off process was seamless. Highly recommend!',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '1 week ago'
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    return stars;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold mb-2 inline-block">TESTIMONIALS</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md relative overflow-hidden">
              <div className="absolute top-5 left-5 text-9xl text-blue-100 font-serif leading-none pointer-events-none">
                "
              </div>
              <div className="flex items-center mb-4 relative z-10">
                <div className="flex text-yellow-400 mr-3">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-gray-500 text-sm">{testimonial.date}</span>
              </div>
              <p className="text-gray-700 mb-6 relative z-10">{testimonial.comment}</p>
              <div className="flex items-center relative z-10">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} • {testimonial.rentals} rentals
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 text-white p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Hit the Road?</h3>
              <p className="mb-6 text-blue-100">
                Book your perfect car today and enjoy a seamless rental experience with AutoRent Pro.
              </p>
              <button 
                onClick={() => document.querySelector('#fleet-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-md transition-colors inline-flex items-center"
              >
                <Car className="w-5 h-5 mr-2" />
                Rent Now
              </button>
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Check out our FAQ or contact our customer support team for assistance.
              </p>
              <button 
                onClick={() => window.open('mailto:info@autorentpro.com?subject=Yardım Talebi', '_self')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;