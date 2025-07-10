import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin, Send } from 'lucide-react';

const ContactSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      description: '7/24 müşteri hizmetleri',
      contact: '+90 533 888 1234',
      action: () => window.open('tel:+905338881234', '_self')
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'E-posta',
      description: 'Sorularınız için',
      contact: 'info@autorentpro.com',
      action: () => window.open('mailto:info@autorentpro.com', '_self')
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      description: 'Hızlı destek',
      contact: '+90 533 888 1234',
      action: () => window.open('https://wa.me/905338881234', '_blank')
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">İletişim & Destek</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Size yardımcı olmak için buradayız. Herhangi bir sorunuz varsa bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h3 className="text-xl font-semibold mb-6">İletişim Yolları</h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  onClick={method.action}
                  className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <div className="text-blue-600">{method.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{method.title}</h4>
                    <p className="text-gray-600 text-sm mb-1">{method.description}</p>
                    <p className="text-blue-600 font-medium">{method.contact}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Çalışma Saatleri
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pazartesi - Cuma</span>
                  <span>08:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar</span>
                  <span>10:00 - 16:00</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Ofis Lokasyonu
              </h4>
              <p className="text-gray-600">
                Girne Marina, Girne, KKTC<br />
                Lefkoşa Şubesi: Dereboyu Caddesi, Lefkoşa, KKTC
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Bize Yazın</h3>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konu *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Konu seçiniz</option>
                    <option value="reservation">Rezervasyon</option>
                    <option value="complaint">Şikayet</option>
                    <option value="suggestion">Öneri</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mesaj *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;