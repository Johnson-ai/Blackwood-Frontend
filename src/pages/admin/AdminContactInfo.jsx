import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton } from './AdminComponents';

export default function AdminContactInfo() {
  const [form, setForm] = useState({
    address: '', city: '', state: '', zip: '', country: '',
    phone_primary: '', phone_secondary: '', email_general: '', email_bookings: '',
    office_hours: '', google_maps_url: '', facebook: '', twitter: '', linkedin: '', instagram: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/public/contact-info').then(r => r.json()).then(d => setForm(p => ({ ...p, ...d }))).catch(() => {});
  }, []);

  const save = async () => {
    setLoading(true);
    try { await adminAPI.updateContactInfo(form); toast.success('Contact info updated'); }
    catch { toast.error('Failed to save'); } finally { setLoading(false); }
  };

  const F = k => ({ value: form[k] || '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
      <AdminPageHeader title="Contact Information" subtitle="Site Config" />
      <div className="space-y-6">
        <AdminCard>
          <h3 className="text-gold-500 text-xs tracking-widest uppercase font-body mb-4">Office Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Street Address"><input {...F('address')} className="input-dark" /></AdminField>
            <AdminField label="City"><input {...F('city')} className="input-dark" /></AdminField>
            <AdminField label="State / Province"><input {...F('state')} className="input-dark" /></AdminField>
            <AdminField label="ZIP / Postal Code"><input {...F('zip')} className="input-dark" /></AdminField>
            <AdminField label="Country"><input {...F('country')} className="input-dark" /></AdminField>
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="text-gold-500 text-xs tracking-widest uppercase font-body mb-4">Contact Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Primary Phone"><input {...F('phone_primary')} className="input-dark" placeholder="+234 (1) 555-0198" /></AdminField>
            <AdminField label="Secondary Phone"><input {...F('phone_secondary')} className="input-dark" /></AdminField>
            <AdminField label="General Email"><input {...F('email_general')} className="input-dark" /></AdminField>
            <AdminField label="Bookings Email"><input {...F('email_bookings')} className="input-dark" /></AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Office Hours">
              <input {...F('office_hours')} className="input-dark" placeholder="Mon–Fri: 8:00 AM – 7:00 PM | Sat: 9:00 AM – 1:00 PM" />
            </AdminField>
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="text-gold-500 text-xs tracking-widest uppercase font-body mb-4">Social Media & Maps</h3>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Google Maps Embed URL">
              <input {...F('google_maps_url')} className="input-dark" placeholder="https://maps.google.com/..." />
            </AdminField>
            <AdminField label="LinkedIn"><input {...F('linkedin')} className="input-dark" /></AdminField>
            <AdminField label="Twitter / X"><input {...F('twitter')} className="input-dark" /></AdminField>
            <AdminField label="Facebook"><input {...F('facebook')} className="input-dark" /></AdminField>
            <AdminField label="Instagram"><input {...F('instagram')} className="input-dark" /></AdminField>
          </div>
        </AdminCard>

        <SaveButton loading={loading} onClick={save} />
      </div>
    </div>
  );
}
