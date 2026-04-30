import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X, Image } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable } from './AdminComponents';

const empty = { title: '', category: '', image_url: '', description: '', display_order: 0, is_active: 1 };

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const load = () => adminAPI.getGallery().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const save = async () => {
    setLoading(true);
    try {
      if (modal === 'add') { await adminAPI.createGalleryItem(form); toast.success('Added'); }
      else { await adminAPI.updateGalleryItem(modal.id, form); toast.success('Updated'); }
      load(); setModal(null);
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };
  const remove = async (id) => { if (!confirm('Delete?')) return; await adminAPI.deleteGalleryItem(id); toast.success('Deleted'); load(); };
  const handleUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('file', file); setUploading(true);
    try { const res = await adminAPI.uploadFile(fd); setForm({ ...form, image_url: res.data.url }); toast.success('Uploaded'); }
    catch { toast.error('Upload failed'); } finally { setUploading(false); }
  };
  const F = k => ({ value: form[k] ?? '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Gallery" subtitle="Media">
        <button onClick={() => { setForm(empty); setModal('add'); }} className="btn-gold py-2 px-5 text-xs"><Plus size={14} /> Add Image</button>
      </AdminPageHeader>

      {/* Grid preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {items.map(item => (
          <div key={item.id} className="relative group aspect-square bg-charcoal-900 overflow-hidden">
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><Image size={20} className="text-charcoal-700" /></div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => { setForm({ ...item }); setModal(item); }} className="w-8 h-8 bg-gold-500/20 border border-gold-500 flex items-center justify-center text-gold-500"><Pencil size={12} /></button>
              <button onClick={() => remove(item.id)} className="w-8 h-8 bg-red-900/20 border border-red-700 flex items-center justify-center text-red-400"><Trash2 size={12} /></button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
              <p className="text-white text-[10px] font-body truncate">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <AdminCard><p className="text-center text-charcoal-600 font-body text-sm py-8">No gallery items yet. Add some images above.</p></AdminCard>
      )}

      {modal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">{modal === 'add' ? 'Add Gallery Item' : 'Edit'}</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Title"><input {...F('title')} className="input-dark" /></AdminField>
                <AdminField label="Category"><input {...F('category')} className="input-dark" placeholder="Office, Events, Court..." /></AdminField>
              </div>
              <AdminField label="Image">
                <div className="space-y-2">
                  {form.image_url && <img src={form.image_url} alt="preview" className="w-full h-32 object-cover border border-charcoal-700" />}
                  <input {...F('image_url')} className="input-dark" placeholder="https://... or upload" />
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal-700 hover:border-gold-500 text-charcoal-400 hover:text-gold-500 text-xs font-body transition-colors">
                    {uploading ? 'Uploading...' : 'Upload Image'}<input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
              </AdminField>
              <AdminField label="Description"><textarea {...F('description')} rows={2} className="input-dark resize-none" /></AdminField>
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Display Order"><input type="number" {...F('display_order')} className="input-dark" /></AdminField>
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
