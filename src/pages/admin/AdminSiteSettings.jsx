import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton } from './AdminComponents';
import { Mail, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function AdminSiteSettings() {
  const [form, setForm] = useState({
    site_name: '', site_tagline: '', footer_text: '', meta_description: '', site_url: '',
    smtp_host: '', smtp_port: '587', smtp_user: '', smtp_pass: '', smtp_from: '',
    email_general: '', email_bookings: '',
  });
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    adminAPI.getSiteSettings().then(r => setForm(p => ({ ...p, ...r.data }))).catch(() => {});
  }, []);

  const save = async () => {
    setLoading(true);
    try { await adminAPI.updateSiteSettings(form); toast.success('Settings saved successfully'); }
    catch { toast.error('Failed to save'); } finally { setLoading(false); }
  };

  const testEmail = async () => {
    if (!form.smtp_host || !form.smtp_user || !form.smtp_pass) {
      toast.error('Fill in SMTP settings first'); return;
    }
    setTesting(true);
    try {
      await adminAPI.updateSiteSettings(form);
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
        body: JSON.stringify({ to: form.smtp_user }),
      });
      const data = await res.json();
      if (data.success) toast.success('Test email sent! Check your inbox.');
      else toast.error(data.error || 'Test failed');
    } catch { toast.error('Test failed — check SMTP settings'); }
    finally { setTesting(false); }
  };

  const F = k => ({ value: form[k] || '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
      <AdminPageHeader title="Site Settings" subtitle="Global Configuration" />
      <div className="space-y-6">

        {/* General */}
        <AdminCard>
          <h3 className="text-gold-500 text-xs tracking-widest uppercase font-body mb-4">General</h3>
          <div className="space-y-4">
            <AdminField label="Firm / Site Name"><input {...F('site_name')} className="input-dark" placeholder="Blackwood & Associates Law Firm" /></AdminField>
            <AdminField label="Tagline"><input {...F('site_tagline')} className="input-dark" placeholder="Justice. Integrity. Excellence." /></AdminField>
            <AdminField label="Site URL (for email links)"><input {...F('site_url')} className="input-dark" placeholder="https://yoursite.com" /></AdminField>
            <AdminField label="Footer Text"><input {...F('footer_text')} className="input-dark" /></AdminField>
            <AdminField label="Meta Description (SEO)"><textarea {...F('meta_description')} rows={3} className="input-dark resize-none" /></AdminField>
          </div>
        </AdminCard>

        {/* Email / SMTP */}
        <AdminCard>
          <div className="flex items-center gap-3 mb-4">
            <Mail size={16} className="text-gold-500" />
            <h3 className="text-gold-500 text-xs tracking-widest uppercase font-body">Email / SMTP Configuration</h3>
          </div>
          <div className="bg-charcoal-900 border border-charcoal-800 p-4 mb-5 text-xs font-body text-charcoal-400 leading-relaxed">
            <p className="text-gold-500 font-semibold mb-1">How Email Works</p>
            When a client books a consultation or submits a contact form, they automatically receive a branded confirmation email and the firm receives a notification. Configure your SMTP server below to enable this.
            <p className="mt-2 text-charcoal-500">Popular options: <span className="text-charcoal-300">Gmail (smtp.gmail.com:587)</span>, <span className="text-charcoal-300">Zoho Mail (smtp.zoho.com:587)</span>, <span className="text-charcoal-300">Custom cPanel SMTP</span></p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="SMTP Host"><input {...F('smtp_host')} className="input-dark" placeholder="smtp.gmail.com" /></AdminField>
            <AdminField label="SMTP Port"><input {...F('smtp_port')} className="input-dark" placeholder="587" /></AdminField>
            <AdminField label="SMTP Username / Email"><input {...F('smtp_user')} className="input-dark" placeholder="yourfirm@gmail.com" /></AdminField>
            <AdminField label="SMTP Password / App Password">
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} {...F('smtp_pass')} className="input-dark pr-10" placeholder="App password or SMTP password" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-gold-500">
                  {showPass ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>
              </div>
            </AdminField>
            <AdminField label="From Name / Email (optional)"><input {...F('smtp_from')} className="input-dark" placeholder="Blackwood & Associates <noreply@yourfirm.com>" /></AdminField>
            <AdminField label="Firm General Email"><input {...F('email_general')} className="input-dark" placeholder="info@yourfirm.com" /></AdminField>
            <AdminField label="Bookings Notifications Email"><input {...F('email_bookings')} className="input-dark" placeholder="bookings@yourfirm.com" /></AdminField>
          </div>
          <div className="flex gap-3 pt-4 border-t border-charcoal-800 mt-4">
            <button onClick={testEmail} disabled={testing} className="flex items-center gap-2 px-5 py-2.5 border border-charcoal-700 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 text-xs font-body uppercase tracking-wider transition-colors">
              <CheckCircle size={13}/> {testing ? 'Sending...' : 'Send Test Email'}
            </button>
            <p className="text-charcoal-600 text-xs font-body self-center">Sends to your SMTP username address</p>
          </div>
        </AdminCard>

        <SaveButton loading={loading} onClick={save} />
      </div>
    </div>
  );
}
