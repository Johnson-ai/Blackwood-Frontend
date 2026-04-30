import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Trash2, X, AlertTriangle, Mail } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable, StatusBadge } from './AdminComponents';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [clearConfirm, setClearConfirm] = useState(false);

  const load = () => {
    adminAPI.getContacts(filter ? { status: filter } : {}).then(r => {
      setContacts(r.data.contacts); setTotal(r.data.total);
    }).catch(() => {});
  };
  useEffect(() => { load(); }, [filter]);

  const openDetail = (c) => {
    setSelected(c); setNotes(c.admin_notes || ''); setStatus(c.status);
    // Mark as read automatically
    if (c.status === 'unread') adminAPI.updateContact(c.id, { status: 'read', admin_notes: c.admin_notes }).then(() => load()).catch(() => {});
  };

  const save = async () => {
    setSaving(true);
    try {
      await adminAPI.updateContact(selected.id, { status, admin_notes: notes });
      toast.success('Updated'); load(); setSelected(null);
    } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await adminAPI.deleteContact(id); toast.success('Deleted'); load(); }
    catch { toast.error('Failed'); }
  };

  const clearAll = async () => {
    try { await adminAPI.clearContacts(); toast.success('All messages cleared'); setClearConfirm(false); load(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Contact Messages" subtitle={`${total} total`}>
        <button onClick={() => setClearConfirm(true)} className="flex items-center gap-2 px-4 py-2 border border-red-800 text-red-400 hover:bg-red-900/20 text-xs font-body tracking-wider uppercase transition-colors">
          <Trash2 size={13} /> Clear All
        </button>
      </AdminPageHeader>

      <div className="flex gap-2 mb-6">
        {['', 'unread', 'read', 'replied'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-xs font-body tracking-wider uppercase border transition-colors ${filter === s ? 'border-gold-500 bg-gold-500 text-ink' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500 hover:text-gold-500'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <AdminCard>
        <AdminTable headers={['Name', 'Email', 'Subject', 'Status', 'Date', 'Actions']} empty="No messages found.">
          {contacts.map(c => (
            <tr key={c.id} className={`cursor-pointer transition-colors ${c.status === 'unread' ? 'bg-gold-500/5' : 'hover:bg-charcoal-900/30'}`} onClick={() => openDetail(c)}>
              <td className="py-3 px-4 font-body text-sm">
                <span className={c.status === 'unread' ? 'text-white font-semibold' : 'text-charcoal-300'}>{c.name}</span>
              </td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{c.email}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs max-w-xs truncate">{c.subject || c.message?.slice(0, 40)}</td>
              <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
              <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                <button onClick={() => remove(c.id)} className="text-charcoal-500 hover:text-red-400"><Trash2 size={14} /></button>
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
                <h3 className="font-display text-2xl text-white font-light">{selected.name}</h3>
                <p className="text-charcoal-500 text-xs font-body mt-0.5">{selected.email} {selected.phone && `• ${selected.phone}`}</p>
              </div>
              <button onClick={() => setSelected(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              {selected.subject && (
                <div className="bg-charcoal-900 px-4 py-3">
                  <p className="text-gold-500 text-xs tracking-widest uppercase font-body">Subject</p>
                  <p className="text-white font-body mt-1">{selected.subject}</p>
                </div>
              )}
              <div>
                <p className="text-gold-500 text-xs tracking-widest uppercase font-body mb-2">Message</p>
                <p className="text-charcoal-300 font-body text-sm leading-relaxed bg-charcoal-900 p-4">{selected.message}</p>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your inquiry'}`}
                  className="flex items-center gap-2 px-4 py-2 border border-gold-500/40 text-gold-500 hover:bg-gold-500/10 text-xs font-body uppercase tracking-wider transition-colors">
                  <Mail size={12} /> Reply via Email
                </a>
              </div>
              <AdminField label="Update Status">
                <select value={status} onChange={e => setStatus(e.target.value)} className="input-dark">
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </AdminField>
              <AdminField label="Admin Notes">
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="input-dark resize-none" />
              </AdminField>
              <div className="flex gap-3 pt-3 border-t border-charcoal-800">
                <SaveButton loading={saving} onClick={save} />
                <button onClick={() => setSelected(null)} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider hover:text-white transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {clearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-red-800 w-full max-w-sm p-6 text-center">
            <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-white font-light mb-2">Clear All Messages?</h3>
            <p className="text-charcoal-400 font-body text-sm mb-6">This permanently deletes all contact submissions and cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={clearAll} className="px-6 py-2.5 bg-red-900 border border-red-700 text-red-300 text-xs font-body uppercase tracking-wider hover:bg-red-800 transition-colors">Delete All</button>
              <button onClick={() => setClearConfirm(false)} className="px-6 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider hover:text-white transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
