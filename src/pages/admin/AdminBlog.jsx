import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable } from './AdminComponents';

const empty = { title: '', excerpt: '', content: '', category: '', image: '', is_published: 0 };

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const load = () => adminAPI.getBlog().then(r => setPosts(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const save = async () => {
    setLoading(true);
    try {
      if (modal === 'add') { await adminAPI.createBlogPost(form); toast.success('Post created'); }
      else { await adminAPI.updateBlogPost(modal.id, form); toast.success('Updated'); }
      load(); setModal(null);
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };
  const remove = async (id) => { if (!confirm('Delete post?')) return; await adminAPI.deleteBlogPost(id); load(); };
  const F = k => ({ value: form[k] ?? '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Blog / Insights" subtitle="Content">
        <button onClick={() => { setForm(empty); setModal('add'); }} className="btn-gold py-2 px-5 text-xs"><Plus size={14} /> New Post</button>
      </AdminPageHeader>
      <AdminCard>
        <AdminTable headers={['Title', 'Category', 'Status', 'Date', 'Actions']} empty="No posts yet.">
          {posts.map(p => (
            <tr key={p.id} className="hover:bg-charcoal-900/30">
              <td className="py-3 px-4 text-white font-body text-sm max-w-xs truncate">{p.title}</td>
              <td className="py-3 px-4 text-charcoal-400 text-xs">{p.category}</td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-0.5 border ${p.is_published ? 'border-green-700 text-green-400' : 'border-charcoal-700 text-charcoal-500'}`}>
                  {p.is_published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{p.published_at ? new Date(p.published_at).toLocaleDateString() : '—'}</td>
              <td className="py-3 px-4 flex gap-2">
                <button onClick={() => { setForm({ ...p }); setModal(p); }} className="text-charcoal-400 hover:text-gold-500"><Pencil size={14} /></button>
                <button onClick={() => remove(p.id)} className="text-charcoal-400 hover:text-red-400"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
      {modal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">{modal === 'add' ? 'New Post' : 'Edit Post'}</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <AdminField label="Title"><input {...F('title')} className="input-dark" /></AdminField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField label="Category"><input {...F('category')} className="input-dark" placeholder="Corporate Law..." /></AdminField>
                <AdminField label="Cover Image URL"><input {...F('image')} className="input-dark" /></AdminField>
              </div>
              <AdminField label="Excerpt (short summary)"><textarea {...F('excerpt')} rows={2} className="input-dark resize-none" /></AdminField>
              <AdminField label="Full Content">
                <textarea {...F('content')} rows={10} className="input-dark resize-none font-body text-sm" placeholder="Full post content..." />
              </AdminField>
              <AdminField label="Publish Status">
                <select value={form.is_published} onChange={e => setForm({ ...form, is_published: Number(e.target.value) })} className="input-dark">
                  <option value={0}>Draft (not visible)</option>
                  <option value={1}>Published (live)</option>
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
