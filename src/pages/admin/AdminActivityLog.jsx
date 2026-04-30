import { useEffect, useState } from 'react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard } from './AdminComponents';
import { Activity, Clock, LogIn, LogOut, Edit, Trash2, Plus, Upload, Shield } from 'lucide-react';

const ACTION_ICONS = {
  LOGIN: <LogIn size={13} className="text-green-400" />,
  LOGOUT: <LogOut size={13} className="text-charcoal-500" />,
  FAILED_LOGIN: <Shield size={13} className="text-red-400" />,
  UPDATE: <Edit size={13} className="text-gold-500" />,
  CREATE: <Plus size={13} className="text-blue-400" />,
  DELETE: <Trash2 size={13} className="text-red-400" />,
  BULK_DELETE: <Trash2 size={13} className="text-red-500" />,
  UPLOAD: <Upload size={13} className="text-purple-400" />,
  CHANGE_PASSWORD: <Shield size={13} className="text-yellow-400" />,
};

const ACTION_COLORS = {
  LOGIN: 'text-green-400',
  LOGOUT: 'text-charcoal-500',
  FAILED_LOGIN: 'text-red-400',
  UPDATE: 'text-gold-500',
  CREATE: 'text-blue-400',
  DELETE: 'text-red-400',
  BULK_DELETE: 'text-red-500',
  UPLOAD: 'text-purple-400',
  CHANGE_PASSWORD: 'text-yellow-400',
};

export default function AdminActivityLog() {
  const [logs, setLogs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState('activity');
  const [page, setPage] = useState(0);
  const LIMIT = 50;

  useEffect(() => {
    adminAPI.getActivityLog({ limit: LIMIT, offset: page * LIMIT })
      .then(r => { setLogs(r.data.logs); setTotal(r.data.total); })
      .catch(() => {});
    adminAPI.getSessions().then(r => setSessions(r.data)).catch(() => {});
  }, [page]);

  const formatTime = (dt) => {
    if (!dt) return '—';
    const d = new Date(dt);
    return d.toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });
  };

  const duration = (login, logout) => {
    if (!logout) return <span className="text-green-400 text-xs">Active now</span>;
    const ms = new Date(logout) - new Date(login);
    const mins = Math.floor(ms / 60000);
    const hrs = Math.floor(mins / 60);
    return <span className="text-charcoal-500 text-xs">{hrs > 0 ? `${hrs}h ${mins % 60}m` : `${mins}m`}</span>;
  };

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Activity Log" subtitle="System Audit Trail" />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-charcoal-900">
        {['activity', 'sessions'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-xs font-body tracking-widest uppercase border-b-2 transition-colors -mb-px ${tab === t ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-500 hover:text-charcoal-300'}`}>
            {t === 'activity' ? `Activity (${total})` : `Sessions (${sessions.length})`}
          </button>
        ))}
      </div>

      {tab === 'activity' && (
        <AdminCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-charcoal-800">
                  {['Action', 'User', 'Section', 'Details', 'IP Address', 'Time'].map(h => (
                    <th key={h} className="text-left text-charcoal-500 text-xs tracking-widest uppercase py-3 px-4 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-900">
                {logs.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-charcoal-600 text-sm">No activity recorded yet</td></tr>
                )}
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-charcoal-900/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {ACTION_ICONS[log.action] || <Activity size={13} className="text-charcoal-500" />}
                        <span className={`text-xs font-semibold ${ACTION_COLORS[log.action] || 'text-charcoal-400'}`}>
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white text-sm">{log.username || '—'}</td>
                    <td className="py-3 px-4 text-charcoal-400 text-xs">{log.section || '—'}</td>
                    <td className="py-3 px-4 text-charcoal-500 text-xs max-w-xs truncate">{log.details}</td>
                    <td className="py-3 px-4 font-mono text-charcoal-600 text-xs">{log.ip_address}</td>
                    <td className="py-3 px-4 text-charcoal-500 text-xs whitespace-nowrap">{formatTime(log.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > LIMIT && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-charcoal-900">
              <p className="text-charcoal-500 text-xs font-body">
                Showing {page * LIMIT + 1}–{Math.min((page + 1) * LIMIT, total)} of {total}
              </p>
              <div className="flex gap-2">
                <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1.5 border border-charcoal-800 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 text-xs font-body disabled:opacity-30 transition-colors">
                  Previous
                </button>
                <button disabled={(page + 1) * LIMIT >= total} onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 border border-charcoal-800 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 text-xs font-body disabled:opacity-30 transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </AdminCard>
      )}

      {tab === 'sessions' && (
        <AdminCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-charcoal-800">
                  {['User', 'Logged In', 'Logged Out', 'Duration', 'IP Address', 'Browser'].map(h => (
                    <th key={h} className="text-left text-charcoal-500 text-xs tracking-widest uppercase py-3 px-4 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-900">
                {sessions.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-charcoal-600 text-sm">No sessions recorded</td></tr>
                )}
                {sessions.map(s => (
                  <tr key={s.id} className="hover:bg-charcoal-900/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${!s.logged_out_at ? 'bg-green-400' : 'bg-charcoal-700'}`} />
                        <span className="text-white text-sm">{s.full_name || s.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-charcoal-400 text-xs">{formatTime(s.logged_in_at)}</td>
                    <td className="py-3 px-4 text-charcoal-500 text-xs">{s.logged_out_at ? formatTime(s.logged_out_at) : <span className="text-green-400">Active</span>}</td>
                    <td className="py-3 px-4">{duration(s.logged_in_at, s.logged_out_at)}</td>
                    <td className="py-3 px-4 font-mono text-charcoal-600 text-xs">{s.ip_address}</td>
                    <td className="py-3 px-4 text-charcoal-600 text-xs max-w-xs truncate">{s.user_agent?.split(' ').slice(-1)[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </div>
  );
}
