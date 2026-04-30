// AdminHero.jsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton } from './AdminComponents';

export default function AdminHero() {
  const [form, setForm] = useState({ headline: '', subheadline: '', cta_primary: '', cta_secondary: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminAPI.getDashboard().catch(() => {});
    // Load hero via public
    fetch('/api/public/hero').then(r => r.json()).then(data => setForm({ ...form, ...data })).catch(() => {});
  }, []);

  const save = async () => {
    setLoading(true);
    try {
      await adminAPI.updateHero(form);
      toast.success('Hero section updated');
    } catch { toast.error('Save failed'); }
    finally { setLoading(false); }
  };

  const F = (key) => ({
    value: form[key] || '',
    onChange: e => setForm({ ...form, [key]: e.target.value })
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
      <AdminPageHeader title="Hero Section" subtitle="Homepage" />
      <AdminCard>
        <div className="space-y-5">
          <AdminField label="Main Headline">
            <input {...F('headline')} className="input-dark" placeholder="Uncompromising Legal Excellence Since 1992" />
          </AdminField>
          <AdminField label="Subheadline">
            <textarea {...F('subheadline')} rows={3} className="input-dark resize-none" placeholder="We fight for what is right..." />
          </AdminField>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Primary CTA Button Text">
              <input {...F('cta_primary')} className="input-dark" placeholder="Book a Consultation" />
            </AdminField>
            <AdminField label="Secondary CTA Button Text">
              <input {...F('cta_secondary')} className="input-dark" placeholder="Explore Practice Areas" />
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
