import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable } from './AdminComponents';

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
const certEmpty = { name: '', issuing_body: '', year: '', description: '', display_order: 0 };
export function AdminCertifications() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(certEmpty);
  const [loading, setLoading] = useState(false);
  const load = () => adminAPI.getCertifications().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const save = async () => {
    setLoading(true);
    try {
      if (modal === 'add') { await adminAPI.createCertification(form); toast.success('Added'); }
      else { await adminAPI.updateCertification(modal.id, form); toast.success('Updated'); }
      load(); setModal(null);
    } catch { toast.error('Save failed'); } finally { setLoading(false); }
  };
  const remove = async (id) => { if (!confirm('Delete?')) return; await adminAPI.deleteCertification(id); toast.success('Deleted'); load(); };
  const F = k => ({ value: form[k] ?? '', onChange: e => setForm({ ...form, [k]: e.target.value }) });
  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Certifications & Awards" subtitle="Recognition">
        <button onClick={() => { setForm(certEmpty); setModal('add'); }} className="btn-gold py-2 px-5 text-xs"><Plus size={14} /> Add</button>
      </AdminPageHeader>
      <AdminCard>
        <AdminTable headers={['Name', 'Issuing Body', 'Year', 'Actions']} empty="No certifications yet.">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-charcoal-900/30">
              <td className="py-3 px-4 text-white font-body text-sm">{item.name}</td>
              <td className="py-3 px-4 text-charcoal-400 text-sm">{item.issuing_body}</td>
              <td className="py-3 px-4 text-charcoal-500 text-sm">{item.year}</td>
              <td className="py-3 px-4 flex gap-2">
                <button onClick={() => { setForm({ ...item }); setModal(item); }} className="text-charcoal-400 hover:text-gold-500"><Pencil size={14} /></button>
                <button onClick={() => remove(item.id)} className="text-charcoal-400 hover:text-red-400"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      {modal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">{modal === 'add' ? 'Add Certification' : 'Edit'}</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <AdminField label="Award Name"><input {...F('name')} className="input-dark" /></AdminField>
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Issuing Body"><input {...F('issuing_body')} className="input-dark" /></AdminField>
                <AdminField label="Year"><input {...F('year')} className="input-dark" placeholder="2024" /></AdminField>
              </div>
              <AdminField label="Description"><textarea {...F('description')} rows={3} className="input-dark resize-none" /></AdminField>
              <AdminField label="Display Order"><input type="number" {...F('display_order')} className="input-dark" /></AdminField>
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
export default AdminCertifications;
