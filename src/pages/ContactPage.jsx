import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Phone, Mail, MapPin, Clock, ArrowRight, Scale, Shield } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const OFFICES = [
  { city: 'Lagos', type: 'Head Office', address: '15 Adeola Odeku Street, Victoria Island, Lagos 101241', phone: '+234 (1) 555-0198', email: 'lagos@blackwoodlaw.com.ng', hours: 'Mon–Fri: 8:00 AM – 7:00 PM | Sat: 9:00 AM – 1:00 PM' },
  { city: 'Abuja', type: 'FCT Office', address: 'Plot 1072, Maitama District, Abuja 900271', phone: '+234 (9) 555-0201', email: 'abuja@blackwoodlaw.com.ng', hours: 'Mon–Fri: 8:00 AM – 6:00 PM' },
  { city: 'Port Harcourt', type: 'South-South Office', address: '3rd Floor, UTC Building, Moscow Road, PH 500211', phone: '+234 (84) 555-0215', email: 'ph@blackwoodlaw.com.ng', hours: 'Mon–Fri: 8:00 AM – 6:00 PM' },
  { city: 'Kano', type: 'North Office', address: '12 Bompai Road, Nassarawa GRA, Kano 700282', phone: '+234 (64) 555-0230', email: 'kano@blackwoodlaw.com.ng', hours: 'Mon–Fri: 8:00 AM – 5:00 PM' },
];

export default function ContactPage() {
  const [info, setInfo] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { publicAPI.getContactInfo().then(r => setInfo(r.data)).catch(() => {}); }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { toast.error('Name, email and message are required'); return; }
    setLoading(true);
    try { await publicAPI.submitContact(form); setSent(true); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
    catch { toast.error('Failed to send. Please call us directly.'); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <PageHero subtitle="Reach Our Team" title="Contact Us" description="Our offices span Lagos, Abuja, Port Harcourt, and Kano. We are always reachable for urgent legal matters." />

      {/* Office cards */}
      <section className="py-16 bg-charcoal-950 border-b border-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <span className="section-subtitle mb-2 block">Our Offices</span>
            <h2 className="font-display text-3xl text-white font-light">National Presence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFICES.map(o => (
              <div key={o.city} className="border border-charcoal-900 hover:border-gold-500/30 bg-black p-6 group transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-2xl text-white font-light">{o.city}</h3>
                  <span className="text-[10px] font-body text-gold-500 border border-gold-500/30 px-2 py-0.5">{o.type}</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2"><MapPin size={11} className="text-gold-500 mt-1 flex-shrink-0" /><p className="text-charcoal-500 text-xs font-body leading-relaxed">{o.address}</p></div>
                  <div className="flex items-center gap-2"><Phone size={11} className="text-gold-500 flex-shrink-0" /><a href={`tel:${o.phone}`} className="text-charcoal-400 text-xs font-body hover:text-gold-400 transition-colors">{o.phone}</a></div>
                  <div className="flex items-center gap-2"><Mail size={11} className="text-gold-500 flex-shrink-0" /><a href={`mailto:${o.email}`} className="text-charcoal-400 text-xs font-body hover:text-gold-400 transition-colors">{o.email}</a></div>
                  <div className="flex items-start gap-2 pt-2 border-t border-charcoal-900"><Clock size={11} className="text-gold-500 mt-0.5 flex-shrink-0" /><p className="text-charcoal-700 text-[10px] font-body leading-relaxed">{o.hours}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + details */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <span className="section-subtitle mb-4 block">Write to Us</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light mb-6">Send a Message</h2>
              <p className="text-charcoal-400 font-body leading-relaxed mb-8 text-sm">
                Complete the form and our team responds within 24 business hours. For urgent matters — EFCC detentions, police arrests, or court emergencies — call our duty line immediately.
              </p>
              <div className="border border-gold-500/30 bg-gold-500/5 p-5 mb-8">
                <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body mb-2">24-Hour Emergency Duty Line</p>
                <a href="tel:+2341555-0199" className="font-display text-3xl text-white hover:text-gold-400 transition-colors">+234 (1) 555-0199</a>
                <p className="text-charcoal-600 text-xs font-body mt-2">EFCC / ICPC arrests, police bail, emergency injunctions.</p>
              </div>
              <div className="border-l-2 border-charcoal-800 pl-5">
                <div className="flex items-center gap-2 mb-2"><Shield size={12} className="text-gold-500" /><p className="text-gold-500 text-[10px] tracking-widest uppercase font-body">Attorney–Client Privilege</p></div>
                <p className="text-charcoal-600 text-xs font-body leading-relaxed">All communications are protected under the Legal Practitioners Act Cap. L11, LFN 2004. Your information is never disclosed without consent.</p>
              </div>
            </div>

            {/* Form */}
            <div>
              {sent ? (
                <div className="border border-gold-500/30 bg-gold-500/5 p-10 text-center flex flex-col items-center justify-center min-h-80">
                  <div className="w-14 h-14 border border-gold-500 flex items-center justify-center mx-auto mb-6"><Scale size={24} className="text-gold-500" /></div>
                  <h3 className="font-display text-3xl text-white font-light mb-3">Message Received</h3>
                  <p className="text-charcoal-400 font-body text-sm leading-relaxed mb-6">We will respond within 24 business hours. For urgent matters, please call our duty line.</p>
                  <button onClick={() => setSent(false)} className="btn-outline-gold text-xs">Send Another Message</button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body block mb-2">Full Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" placeholder="Adaeze Okafor" /></div>
                    <div><label className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body block mb-2">Email Address *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark" placeholder="name@company.com" /></div>
                    <div><label className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body block mb-2">Phone Number</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" placeholder="+234 80 0000 0000" /></div>
                    <div><label className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body block mb-2">Subject / Matter Type</label><input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-dark" placeholder="e.g. EFCC Investigation" /></div>
                  </div>
                  <div>
                    <label className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body block mb-2">Message *</label>
                    <textarea rows={7} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-dark resize-none"
                      placeholder="Describe your legal matter. Include relevant dates, parties involved, and any existing court filings..." />
                  </div>
                  <div className="flex items-start gap-3 bg-charcoal-950 border border-charcoal-900 p-4">
                    <Shield size={13} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <p className="text-charcoal-600 text-[10px] font-body leading-relaxed">Submission is privileged and confidential. This does not yet establish a solicitor-client relationship under the Rules of Professional Conduct (RPC 2007).</p>
                  </div>
                  <button onClick={handleSubmit} disabled={loading} className="btn-gold w-full justify-center py-4 text-sm">
                    {loading ? 'Sending Securely...' : 'Send Message'}{!loading && <ArrowRight size={14} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
