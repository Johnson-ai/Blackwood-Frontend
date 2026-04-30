import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';
import { Calendar, MessageSquare, Users, Briefcase, Clock, TrendingUp, AlertCircle } from 'lucide-react';

function StatCard({ label, value, sub, icon: Icon, color, to }) {
  return (
    <Link to={to} className="block bg-charcoal-950 border border-charcoal-900 p-6 hover:border-gold-500/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-charcoal-500 text-xs font-body tracking-widest uppercase mb-2">{label}</p>
          <p className="font-display text-4xl text-white font-light">{value ?? '—'}</p>
          {sub && <p className="text-charcoal-500 text-xs font-body mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 flex items-center justify-center border ${color}`}>
          <Icon size={18} className={color.includes('gold') ? 'text-gold-500' : 'text-charcoal-400'} />
        </div>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminAPI.getDashboard().then(r => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl">
      <div className="mb-8">
        <p className="section-subtitle mb-2">Control Center</p>
        <h1 className="font-display text-4xl text-white font-light">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Bookings" value={stats?.total_bookings} sub={`${stats?.pending_bookings} pending`} icon={Calendar} color="border-gold-500/30" to="/admin/bookings" />
        <StatCard label="Contact Forms" value={stats?.total_contacts} sub={`${stats?.unread_contacts} unread`} icon={MessageSquare} color="border-charcoal-700" to="/admin/contacts" />
        <StatCard label="Team Members" value={stats?.total_team} icon={Users} color="border-charcoal-700" to="/admin/team" />
        <StatCard label="Practice Areas" value={stats?.total_practice_areas} icon={Briefcase} color="border-charcoal-700" to="/admin/practice-areas" />
      </div>

      {/* Alerts */}
      {(stats?.pending_bookings > 0 || stats?.unread_contacts > 0) && (
        <div className="mb-8 space-y-3">
          {stats?.pending_bookings > 0 && (
            <div className="flex items-center gap-3 bg-gold-500/10 border border-gold-500/30 px-5 py-3">
              <AlertCircle size={16} className="text-gold-500 flex-shrink-0" />
              <p className="text-charcoal-300 text-sm font-body">
                <span className="text-gold-400 font-semibold">{stats.pending_bookings} pending consultation{stats.pending_bookings !== 1 ? 's' : ''}</span> awaiting your response.{' '}
                <Link to="/admin/bookings" className="text-gold-500 underline">Review now →</Link>
              </p>
            </div>
          )}
          {stats?.unread_contacts > 0 && (
            <div className="flex items-center gap-3 bg-charcoal-900 border border-charcoal-800 px-5 py-3">
              <AlertCircle size={16} className="text-charcoal-400 flex-shrink-0" />
              <p className="text-charcoal-400 text-sm font-body">
                <span className="text-charcoal-200 font-semibold">{stats.unread_contacts} unread message{stats.unread_contacts !== 1 ? 's' : ''}</span> in your inbox.{' '}
                <Link to="/admin/contacts" className="text-gold-500 underline">View →</Link>
              </p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-charcoal-950 border border-charcoal-900">
          <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-900">
            <h3 className="text-white font-body text-sm font-semibold flex items-center gap-2">
              <Calendar size={15} className="text-gold-500" /> Recent Bookings
            </h3>
            <Link to="/admin/bookings" className="text-gold-500 text-xs font-body hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-charcoal-900">
            {stats?.recent_bookings?.length === 0 && (
              <p className="px-6 py-8 text-charcoal-600 text-sm font-body text-center">No bookings yet</p>
            )}
            {stats?.recent_bookings?.map(b => (
              <div key={b.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-body">{b.client_name}</p>
                  <p className="text-charcoal-500 text-xs font-body">{b.practice_area || 'General'} • {b.preferred_date || 'TBD'}</p>
                </div>
                <span className={`text-xs font-body px-2 py-0.5 border ${
                  b.status === 'confirmed' ? 'border-green-600 text-green-400' :
                  b.status === 'cancelled' ? 'border-red-700 text-red-400' :
                  'border-gold-500/40 text-gold-500'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-charcoal-950 border border-charcoal-900">
          <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-900">
            <h3 className="text-white font-body text-sm font-semibold flex items-center gap-2">
              <MessageSquare size={15} className="text-gold-500" /> Recent Messages
            </h3>
            <Link to="/admin/contacts" className="text-gold-500 text-xs font-body hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-charcoal-900">
            {stats?.recent_contacts?.length === 0 && (
              <p className="px-6 py-8 text-charcoal-600 text-sm font-body text-center">No messages yet</p>
            )}
            {stats?.recent_contacts?.map(c => (
              <div key={c.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white text-sm font-body">{c.name}</p>
                  <span className={`text-xs font-body ${c.status === 'unread' ? 'text-gold-500' : 'text-charcoal-600'}`}>{c.status}</span>
                </div>
                <p className="text-charcoal-500 text-xs font-body truncate">{c.subject || c.message?.slice(0, 60)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6">
        <h3 className="text-charcoal-500 text-xs font-body tracking-widest uppercase mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Edit Hero', to: '/admin/hero' },
            { label: 'Add Team Member', to: '/admin/team' },
            { label: 'Add Blog Post', to: '/admin/blog' },
            { label: 'Manage FAQs', to: '/admin/faqs' },
          ].map(q => (
            <Link key={q.label} to={q.to} className="bg-charcoal-950 border border-charcoal-900 hover:border-gold-500/40 px-4 py-3 text-charcoal-400 hover:text-gold-500 text-sm font-body transition-colors text-center">
              {q.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
