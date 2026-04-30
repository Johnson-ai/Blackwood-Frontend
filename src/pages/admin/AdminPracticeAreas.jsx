import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable } from './AdminComponents';

const empty = { name: '', icon: '', short_description: '', full_description: '', key_points: '', image: '', display_order: 0, is_active: 1 };

export default function AdminPracticeAreas() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  const load = () => adminAPI.getPracticeAreas().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setModal('add'); };
  const openEdit = (item) => { setForm({ ...item }); setModal(item); };

  const save = async () => {
    setLoading(true);
    try {
      if (modal === 'add') { await adminAPI.createPracticeArea(form); toast.success('Practice area added'); }
      else { await adminAPI.updatePracticeArea(modal.id, form); toast.success('Updated'); }
      load(); setModal(null);
    } catch { toast.error('Save failed'); }
    finally { setLoading(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this practice area?')) return;
    try { await adminAPI.deletePracticeArea(id); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const F = key => ({ value: form[key] ?? '', onChange: e => setForm({ ...form, [key]: e.target.value }) });

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Practice Areas" subtitle="Expertise">
        <button onClick={openAdd} className="btn-gold py-2 px-5 text-xs"><Plus size={14} /> Add Area</button>
      </AdminPageHeader>
      <AdminCard>
        <AdminTable headers={['Icon', 'Name', 'Short Description', 'Order', 'Status', 'Actions']} empty="No practice areas yet.">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-charcoal-900/30">
              <td className="py-3 px-4 text-2xl">{item.icon}</td>
              <td className="py-3 px-4 text-white font-body text-sm">{item.name}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs max-w-xs truncate">{item.short_description}</td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{item.display_order}</td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-0.5 border ${item.is_active ? 'border-green-700 text-green-400' : 'border-charcoal-700 text-charcoal-500'}`}>
                  {item.is_active ? 'Active' : 'Hidden'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-charcoal-400 hover:text-gold-500"><Pencil size={14} /></button>
                  <button onClick={() => remove(item.id)} className="text-charcoal-400 hover:text-red-400"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {modal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">{modal === 'add' ? 'Add Practice Area' : 'Edit Practice Area'}</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-charcoal-400 hover:text-white" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Name"><input {...F('name')} className="input-dark" placeholder="Corporate Law" /></AdminField>
                <AdminField label="Icon (emoji or text)"><input {...F('icon')} className="input-dark" placeholder="⚖️" /></AdminField>
              </div>
              <AdminField label="Short Description"><textarea {...F('short_description')} rows={2} className="input-dark resize-none" /></AdminField>
              <AdminField label="Full Description"><textarea {...F('full_description')} rows={5} className="input-dark resize-none" /></AdminField>
              <AdminField label="Key Points (JSON array e.g. [&quot;Point 1&quot;,&quot;Point 2&quot;])">
                <textarea {...F('key_points')} rows={3} className="input-dark resize-none font-mono text-xs" placeholder='["Mergers & Acquisitions","Contract Drafting"]' />
              </AdminField>
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Display Order"><input type="number" {...F('display_order')} className="input-dark" /></AdminField>
                <AdminField label="Visibility">
                  <select value={form.is_active} onChange={e => setForm({ ...form, is_active: Number(e.target.value) })} className="input-dark">
                    <option value={1}>Active</option>
                    <option value={0}>Hidden</option>
                  </select>
                </AdminField>
              </div>
              <div className="flex gap-3 pt-3 border-t border-charcoal-800">
                <SaveButton loading={loading} onClick={save} />
                <button onClick={() => setModal(null)} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider transition-colors hover:text-white">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
