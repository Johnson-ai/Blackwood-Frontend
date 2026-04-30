import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X, Users } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, DeleteButton, AdminTable } from './AdminComponents';

const empty = { name: '', title: '', specialization: '', bio: '', education: '', bar_number: '', image: '', email: '', linkedin: '', display_order: 0, is_active: 1 };

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [modal, setModal] = useState(null); // null | 'add' | member obj
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => adminAPI.getTeam().then(r => setMembers(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setModal('add'); };
  const openEdit = (m) => { setForm({ ...m }); setModal(m); };
  const closeModal = () => setModal(null);

  const save = async () => {
    setLoading(true);
    try {
      if (modal === 'add') {
        await adminAPI.createTeamMember(form);
        toast.success('Team member added');
      } else {
        await adminAPI.updateTeamMember(modal.id, form);
        toast.success('Team member updated');
      }
      load(); closeModal();
    } catch { toast.error('Save failed'); }
    finally { setLoading(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this team member?')) return;
    try { await adminAPI.deleteTeamMember(id); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    setUploading(true);
    try {
      const res = await adminAPI.uploadFile(fd);
      setForm({ ...form, image: res.data.url }); toast.success('Uploaded');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const F = key => ({ value: form[key] ?? '', onChange: e => setForm({ ...form, [key]: e.target.value }) });

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Team Members" subtitle="People & Places">
        <button onClick={openAdd} className="btn-gold py-2 px-5 text-xs">
          <Plus size={14} /> Add Member
        </button>
      </AdminPageHeader>

      <AdminCard>
        <AdminTable headers={['Photo', 'Name', 'Title', 'Specialization', 'Order', 'Status', 'Actions']} empty="No team members yet.">
          {members.map(m => (
            <tr key={m.id} className="hover:bg-charcoal-900/30 transition-colors">
              <td className="py-3 px-4">
                {m.image ? <img src={m.image} alt={m.name} className="w-9 h-9 object-cover rounded-full border border-charcoal-700" />
                  : <div className="w-9 h-9 bg-charcoal-800 rounded-full flex items-center justify-center"><Users size={14} className="text-charcoal-600" /></div>}
              </td>
              <td className="py-3 px-4 text-white font-body text-sm">{m.name}</td>
              <td className="py-3 px-4 text-charcoal-400 text-sm">{m.title}</td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{m.specialization}</td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{m.display_order}</td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-0.5 border ${m.is_active ? 'border-green-700 text-green-400' : 'border-charcoal-700 text-charcoal-500'}`}>
                  {m.is_active ? 'Active' : 'Hidden'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(m)} className="text-charcoal-400 hover:text-gold-500 transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => remove(m.id)} className="text-charcoal-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Modal */}
      {modal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">{modal === 'add' ? 'Add Team Member' : 'Edit Member'}</h3>
              <button onClick={closeModal}><X size={20} className="text-charcoal-400 hover:text-white" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField label="Full Name"><input {...F('name')} className="input-dark" /></AdminField>
                <AdminField label="Title / Role"><input {...F('title')} className="input-dark" /></AdminField>
                <AdminField label="Specialization"><input {...F('specialization')} className="input-dark" /></AdminField>
                <AdminField label="Email"><input {...F('email')} className="input-dark" /></AdminField>
              </div>
              <AdminField label="Biography"><textarea {...F('bio')} rows={4} className="input-dark resize-none" /></AdminField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField label="Education"><input {...F('education')} className="input-dark" /></AdminField>
                <AdminField label="Bar Number"><input {...F('bar_number')} className="input-dark" /></AdminField>
                <AdminField label="LinkedIn"><input {...F('linkedin')} className="input-dark" /></AdminField>
                <AdminField label="Display Order"><input type="number" {...F('display_order')} className="input-dark" /></AdminField>
              </div>
              <AdminField label="Photo URL">
                <div className="space-y-2">
                  <input {...F('image')} className="input-dark" placeholder="URL or upload" />
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal-700 hover:border-gold-500 text-charcoal-400 hover:text-gold-500 text-xs font-body transition-colors">
                    {uploading ? 'Uploading...' : 'Upload Photo'}<input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
              </AdminField>
              <AdminField label="Visibility">
                <select value={form.is_active} onChange={e => setForm({ ...form, is_active: Number(e.target.value) })} className="input-dark">
                  <option value={1}>Active (visible)</option>
                  <option value={0}>Hidden</option>
                </select>
              </AdminField>
              <div className="flex gap-3 pt-3 border-t border-charcoal-800">
                <SaveButton loading={loading} onClick={save} />
                <button onClick={closeModal} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-400 hover:text-white text-xs font-body uppercase tracking-wider transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
