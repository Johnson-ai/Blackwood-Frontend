import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton } from './AdminComponents';

export default function AdminAbout() {
  const [form, setForm] = useState({
    firm_name: '', tagline: '', description: '', mission: '', vision: '',
    founded_year: '', lawyers_count: '', cases_won: '', years_experience: '', image: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/public/about').then(r => r.json()).then(d => setForm(prev => ({ ...prev, ...d }))).catch(() => {});
  }, []);

  const save = async () => {
    setLoading(true);
    try {
      await adminAPI.updateAbout(form);
      toast.success('About section updated');
    } catch { toast.error('Save failed'); }
    finally { setLoading(false); }
  };

  const F = key => ({ value: form[key] || '', onChange: e => setForm({ ...form, [key]: e.target.value }) });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
      <AdminPageHeader title="About Section" subtitle="Firm Content" />
      <AdminCard>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Firm Name">
              <input {...F('firm_name')} className="input-dark" placeholder="Blackwood & Associates" />
            </AdminField>
            <AdminField label="Tagline">
              <input {...F('tagline')} className="input-dark" placeholder="Justice. Integrity. Excellence." />
            </AdminField>
          </div>
          <AdminField label="Firm Description">
            <textarea {...F('description')} rows={5} className="input-dark resize-none" placeholder="Firm history and overview..." />
          </AdminField>
          <AdminField label="Mission Statement">
            <textarea {...F('mission')} rows={3} className="input-dark resize-none" />
          </AdminField>
          <AdminField label="Vision Statement">
            <textarea {...F('vision')} rows={3} className="input-dark resize-none" />
          </AdminField>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AdminField label="Founded Year"><input {...F('founded_year')} className="input-dark" placeholder="1992" /></AdminField>
            <AdminField label="Attorneys Count"><input {...F('lawyers_count')} className="input-dark" placeholder="45+" /></AdminField>
            <AdminField label="Cases Won"><input {...F('cases_won')} className="input-dark" placeholder="4,800+" /></AdminField>
            <AdminField label="Years Experience"><input {...F('years_experience')} className="input-dark" placeholder="32+" /></AdminField>
          </div>
          <AdminField label="About Image URL">
            <input {...F('image')} className="input-dark" placeholder="https://..." />
          </AdminField>
          <div className="pt-4 border-t border-charcoal-800">
            <SaveButton loading={loading} onClick={save} />
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
