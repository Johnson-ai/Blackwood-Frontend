import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Trash2, X, AlertTriangle } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable, StatusBadge } from './AdminComponents';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [clearConfirm, setClearConfirm] = useState(false);

  const load = () => {
    adminAPI.getBookings(filter ? { status: filter } : {}).then(r => {
      setBookings(r.data.bookings); setTotal(r.data.total);
    }).catch(() => {});
  };
  useEffect(() => { load(); }, [filter]);

  const openDetail = (b) => { setSelected(b); setNotes(b.admin_notes || ''); setStatus(b.status); };

  const saveStatus = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await adminAPI.updateBooking(selected.id, { status, admin_notes: notes });
      toast.success('Booking updated');
      load(); setSelected(null);
    } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try { await adminAPI.deleteBooking(id); toast.success('Deleted'); load(); }
    catch { toast.error('Failed'); }
  };

  const clearAll = async () => {
    try {
      await adminAPI.clearBookings(filter ? { status: filter } : {});
      toast.success(filter ? `Cleared all ${filter} bookings` : 'All bookings cleared');
      setClearConfirm(false); load();
    } catch { toast.error('Failed'); }
  };

  const statusColors = { pending: 'text-gold-500', confirmed: 'text-green-400', cancelled: 'text-red-400', completed: 'text-charcoal-400' };

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Consultation Bookings" subtitle={`${total} total`}>
        <button onClick={() => setClearConfirm(true)} className="flex items-center gap-2 px-4 py-2 border border-red-800 text-red-400 hover:bg-red-900/20 text-xs font-body tracking-wider uppercase transition-colors">
          <Trash2 size={13} /> Clear {filter ? `${filter}` : 'All'}
        </button>
      </AdminPageHeader>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['', 'pending', 'confirmed', 'cancelled', 'completed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-xs font-body tracking-wider uppercase border transition-colors ${filter === s ? 'border-gold-500 bg-gold-500 text-ink' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500 hover:text-gold-500'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <AdminCard>
        <AdminTable headers={['Ref', 'Client', 'Email', 'Practice Area', 'Date', 'Time', 'Status', 'Submitted', 'Actions']} empty="No bookings found.">
          {bookings.map(b => (
            <tr key={b.id} className="hover:bg-charcoal-900/30 cursor-pointer" onClick={() => openDetail(b)}>
              <td className="py-3 px-4 font-mono text-gold-500 text-xs">{b.booking_ref}</td>
              <td className="py-3 px-4 text-white font-body text-sm">{b.client_name}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{b.client_email}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{b.practice_area || '—'}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{b.preferred_date || '—'}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{b.preferred_time || '—'}</td>
              <td className="py-3 px-4"><StatusBadge status={b.status} /></td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{new Date(b.created_at).toLocaleDateString()}</td>
              <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                <button onClick={() => remove(b.id)} className="text-charcoal-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <div>
                <h3 className="font-display text-2xl text-white font-light">{selected.client_name}</h3>
                <p className="font-mono text-gold-500 text-xs mt-0.5">{selected.booking_ref}</p>
              </div>
              <button onClick={() => setSelected(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-body">
                {[['Email', selected.client_email], ['Phone', selected.client_phone || '—'], ['Practice Area', selected.practice_area || '—'], ['Attorney', selected.preferred_attorney || 'No preference'], ['Date', selected.preferred_date || '—'], ['Time', selected.preferred_time || '—']].map(([k, v]) => (
                  <div key={k} className="bg-charcoal-900 px-3 py-2">
                    <p className="text-charcoal-500 text-xs tracking-wider uppercase">{k}</p>
                    <p className="text-white mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              {selected.message && (
                <div>
                  <p className="text-gold-500 text-xs tracking-widest uppercase font-body mb-1">Client Message</p>
                  <p className="text-charcoal-300 font-body text-sm bg-charcoal-900 p-3">{selected.message}</p>
                </div>
              )}
              <AdminField label="Update Status">
                <select value={status} onChange={e => setStatus(e.target.value)} className="input-dark">
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </AdminField>
              <AdminField label="Admin Notes">
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="input-dark resize-none" placeholder="Internal notes..." />
              </AdminField>
              <div className="flex gap-3 pt-3 border-t border-charcoal-800">
                <SaveButton loading={saving} onClick={saveStatus} label="Save Changes" />
                <button onClick={() => setSelected(null)} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider hover:text-white transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear confirm */}
      {clearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-red-800 w-full max-w-sm p-6 text-center">
            <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-white font-light mb-2">Confirm Deletion</h3>
            <p className="text-charcoal-400 font-body text-sm mb-6">This will permanently delete {filter ? `all ${filter} bookings` : 'ALL bookings'}. This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={clearAll} className="px-6 py-2.5 bg-red-900 border border-red-700 text-red-300 text-xs font-body uppercase tracking-wider hover:bg-red-800 transition-colors">Delete</button>
              <button onClick={() => setClearConfirm(false)} className="px-6 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider hover:text-white transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
