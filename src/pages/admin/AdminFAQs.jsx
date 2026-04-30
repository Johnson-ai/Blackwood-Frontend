import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable } from './AdminComponents';

const empty = { question: '', answer: '', category: '', display_order: 0, is_active: 1 };

export default function AdminFAQs() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const load = () => adminAPI.getFAQs().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const save = async () => {
    setLoading(true);
    try {
      if (modal === 'add') { await adminAPI.createFAQ(form); toast.success('Added'); }
      else { await adminAPI.updateFAQ(modal.id, form); toast.success('Updated'); }
      load(); setModal(null);
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };
  const remove = async (id) => { if (!confirm('Delete?')) return; await adminAPI.deleteFAQ(id); load(); };
  const F = k => ({ value: form[k] ?? '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="FAQs" subtitle="Help Center">
        <button onClick={() => { setForm(empty); setModal('add'); }} className="btn-gold py-2 px-5 text-xs"><Plus size={14} /> Add FAQ</button>
      </AdminPageHeader>
      <AdminCard>
        <AdminTable headers={['Question', 'Category', 'Order', 'Status', 'Actions']} empty="No FAQs yet.">
          {items.map(f => (
            <tr key={f.id} className="hover:bg-charcoal-900/30">
              <td className="py-3 px-4 text-white font-body text-sm max-w-xs">{f.question}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{f.category || '—'}</td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{f.display_order}</td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-0.5 border ${f.is_active ? 'border-green-700 text-green-400' : 'border-charcoal-700 text-charcoal-500'}`}>
                  {f.is_active ? 'Active' : 'Hidden'}
                </span>
              </td>
              <td className="py-3 px-4 flex gap-2">
                <button onClick={() => { setForm({ ...f }); setModal(f); }} className="text-charcoal-400 hover:text-gold-500"><Pencil size={14} /></button>
                <button onClick={() => remove(f.id)} className="text-charcoal-400 hover:text-red-400"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      {modal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">{modal === 'add' ? 'Add FAQ' : 'Edit FAQ'}</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <AdminField label="Question"><input {...F('question')} className="input-dark" /></AdminField>
              <AdminField label="Answer"><textarea {...F('answer')} rows={5} className="input-dark resize-none" /></AdminField>
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Category"><input {...F('category')} className="input-dark" placeholder="General, Billing..." /></AdminField>
                <AdminField label="Display Order"><input type="number" {...F('display_order')} className="input-dark" /></AdminField>
              </div>
              <AdminField label="Status">
                <select value={form.is_active} onChange={e => setForm({ ...form, is_active: Number(e.target.value) })} className="input-dark">
                  <option value={1}>Active</option><option value={0}>Hidden</option>
                </select>
              </AdminField>
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
