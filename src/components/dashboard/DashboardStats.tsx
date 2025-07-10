import React from 'react';
import { Calendar, DollarSign, UserPlus, Car, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStats as StatsType } from '../../types';

interface DashboardStatsProps {
  stats: StatsType;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statsData = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      trend: stats.bookingsTrend,
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      trend: stats.revenueTrend,
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      title: 'New Customers',
      value: stats.newCustomers,
      trend: stats.customersTrend,
      icon: <UserPlus className="w-5 h-5 text-purple-600" />,
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      title: 'Available Cars',
      value: stats.availableCars,
      trend: 3,
      icon: <Car className="w-5 h-5 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} p-4 rounded-lg transform transition-transform duration-300 hover:-translate-y-1`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`${stat.iconBg} p-2 rounded-full`}>
              {stat.icon}
            </div>
          </div>
          <p className={`text-sm mt-2 flex items-center ${stat.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stat.trend >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(stat.trend)}% from last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;