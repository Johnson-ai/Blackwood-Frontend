import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton } from './AdminComponents';

export default function AdminCEO() {
  const [form, setForm] = useState({
    name: '', title: '', bio: '', education: '', bar_admissions: '', quote: '', image: '', linkedin: '', email: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/public/ceo').then(r => r.json()).then(d => setForm(prev => ({ ...prev, ...d }))).catch(() => {});
  }, []);

  const save = async () => {
    setLoading(true);
    try {
      await adminAPI.updateCEO(form);
      toast.success('CEO profile updated');
    } catch { toast.error('Save failed'); }
    finally { setLoading(false); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);
    try {
      const res = await adminAPI.uploadFile(fd);
      setForm({ ...form, image: res.data.url });
      toast.success('Image uploaded');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const F = key => ({ value: form[key] || '', onChange: e => setForm({ ...form, [key]: e.target.value }) });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
      <AdminPageHeader title="CEO / Founding Partner" subtitle="Homepage Profile" />
      <AdminCard>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Full Name">
              <input {...F('name')} className="input-dark" placeholder="Victoria A. Blackwood, Esq." />
            </AdminField>
            <AdminField label="Title / Role">
              <input {...F('title')} className="input-dark" placeholder="Founding Partner & Chief Executive" />
            </AdminField>
          </div>

          {/* Photo upload */}
          <AdminField label="Photo">
            <div className="flex items-center gap-4">
              {form.image && (
                <img src={form.image} alt="CEO" className="w-16 h-16 object-cover border border-charcoal-700" />
              )}
              <div className="flex-1 space-y-2">
                <input {...F('image')} className="input-dark" placeholder="https://... or upload below" />
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-charcoal-700 hover:border-gold-500 text-charcoal-400 hover:text-gold-500 text-xs font-body tracking-wider uppercase transition-colors">
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            </div>
          </AdminField>

          <AdminField label="Biography">
            <textarea {...F('bio')} rows={6} className="input-dark resize-none" placeholder="Full biography..." />
          </AdminField>
          <AdminField label="Notable Quote">
            <textarea {...F('quote')} rows={3} className="input-dark resize-none" placeholder="Displayed in quote block on homepage..." />
          </AdminField>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Education">
              <input {...F('education')} className="input-dark" placeholder="J.D., Harvard Law School..." />
            </AdminField>
            <AdminField label="Bar Admissions">
              <input {...F('bar_admissions')} className="input-dark" placeholder="New York State Bar..." />
            </AdminField>
            <AdminField label="Email">
              <input {...F('email')} className="input-dark" placeholder="victoria@firm.com" />
            </AdminField>
            <AdminField label="LinkedIn URL">
              <input {...F('linkedin')} className="input-dark" placeholder="https://linkedin.com/in/..." />
            </AdminField>
          </div>
          <div className="pt-4 border-t border-charcoal-800">
            <SaveButton loading={loading} onClick={save} />
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
