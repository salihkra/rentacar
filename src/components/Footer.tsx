import React, { useState } from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Newsletter aboneliğiniz başarıyla oluşturuldu!');
      console.log('Newsletter signup:', email);
    }
    setEmail('');
  };

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Our Fleet', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'FAQ', href: '#' }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#' },
    { icon: <Twitter className="w-5 h-5" />, href: '#' },
    { icon: <Instagram className="w-5 h-5" />, href: '#' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">AutoRent Pro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Providing premium car rental services since 2010. We're committed to making your journey comfortable and memorable.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-blue-400 flex-shrink-0" />
                <span>123 Rental Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <span>info@autorentpro.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for special offers and updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-4 py-3 w-full rounded-l-lg focus:outline-none text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-r-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2023 AutoRent Pro. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;