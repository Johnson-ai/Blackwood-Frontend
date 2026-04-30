import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable } from './AdminComponents';

const empty = { client_name: '', case_type: '', rating: 5, review: '', is_featured: 0, is_active: 1 };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const load = () => adminAPI.getTestimonials().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const save = async () => {
    setLoading(true);
    try {
      if (modal === 'add') { await adminAPI.createTestimonial(form); toast.success('Added'); }
      else { await adminAPI.updateTestimonial(modal.id, form); toast.success('Updated'); }
      load(); setModal(null);
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };
  const remove = async (id) => { if (!confirm('Delete?')) return; await adminAPI.deleteTestimonial(id); toast.success('Deleted'); load(); };
  const F = k => ({ value: form[k] ?? '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Testimonials" subtitle="Client Reviews">
        <button onClick={() => { setForm(empty); setModal('add'); }} className="btn-gold py-2 px-5 text-xs"><Plus size={14} /> Add</button>
      </AdminPageHeader>
      <AdminCard>
        <AdminTable headers={['Client', 'Case Type', 'Rating', 'Review', 'Featured', 'Status', 'Actions']} empty="No testimonials yet.">
          {items.map(t => (
            <tr key={t.id} className="hover:bg-charcoal-900/30">
              <td className="py-3 px-4 text-white font-body text-sm">{t.client_name}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{t.case_type}</td>
              <td className="py-3 px-4 text-gold-500 text-xs">{'★'.repeat(t.rating)}</td>
              <td className="py-3 px-4 text-charcoal-500 text-xs max-w-xs truncate">{t.review}</td>
              <td className="py-3 px-4"><span className={`text-xs ${t.is_featured ? 'text-gold-500' : 'text-charcoal-600'}`}>{t.is_featured ? 'Yes' : 'No'}</span></td>
              <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 border ${t.is_active ? 'border-green-700 text-green-400' : 'border-charcoal-700 text-charcoal-500'}`}>{t.is_active ? 'Active' : 'Hidden'}</span></td>
              <td className="py-3 px-4 flex gap-2">
                <button onClick={() => { setForm({ ...t }); setModal(t); }} className="text-charcoal-400 hover:text-gold-500"><Pencil size={14} /></button>
                <button onClick={() => remove(t.id)} className="text-charcoal-400 hover:text-red-400"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {modal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">{modal === 'add' ? 'Add Testimonial' : 'Edit'}</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Client Name"><input {...F('client_name')} className="input-dark" /></AdminField>
                <AdminField label="Case Type"><input {...F('case_type')} className="input-dark" placeholder="Criminal Defense" /></AdminField>
              </div>
              <AdminField label="Rating (1–5)">
                <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="input-dark">
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </AdminField>
              <AdminField label="Review"><textarea {...F('review')} rows={4} className="input-dark resize-none" /></AdminField>
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Featured">
                  <select value={form.is_featured} onChange={e => setForm({ ...form, is_featured: Number(e.target.value) })} className="input-dark">
                    <option value={0}>No</option><option value={1}>Yes</option>
                  </select>
                </AdminField>
                <AdminField label="Status">
                  <select value={form.is_active} onChange={e => setForm({ ...form, is_active: Number(e.target.value) })} className="input-dark">
                    <option value={1}>Active</option><option value={0}>Hidden</option>
                  </select>
                </AdminField>
              </div>
              <div className="flex gap-3 pt-3 border-t border-charcoal-800">
                <SaveButton loading={loading} onClick={save} />
                <button onClick={() => setModal(null)} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider hover:text-white transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
