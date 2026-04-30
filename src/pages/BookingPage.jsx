import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CheckCircle, Scale, Shield, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { publicAPI } from '../utils/api';

const STATIC_AREAS = [
  'Constitutional Law & Fundamental Rights (CFRN 1999)',
  'Corporate Law — CAMA 2020',
  'Criminal Defense — ACJA 2015',
  'EFCC / ICPC Defense',
  'Family Law — Matrimonial Causes Act',
  'Land Use Act & Property Rights',
  'Immigration — NIS / IDA 2015',
  'Intellectual Property — TMA / Patents Act',
  'Labour & Employment — NIC',
  'Tax & Revenue Law — FIRS',
  'Admiralty & Shipping Law',
  'Other / Not Sure',
];

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const OFFICES = ['Lagos (Head Office)', 'Abuja (FCT Office)', 'Port Harcourt (South-South)', 'Kano (North Office)', 'Virtual — No Physical Office Needed'];

const CONSULT_TYPES = [
  { id: 'in-person', label: 'In-Person', desc: 'Visit any of our 4 offices', icon: '🏛️' },
  { id: 'virtual', label: 'Virtual / Zoom', desc: 'Secure video consultation', icon: '💻' },
  { id: 'phone', label: 'Phone Call', desc: 'Direct call with attorney', icon: '📱' },
];

export default function BookingPage() {
  const [areas, setAreas] = useState([]);
  const [team, setTeam] = useState([]);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    client_name: '', client_email: '', client_phone: '',
    practice_area: '', preferred_attorney: '',
    preferred_date: '', preferred_time: '',
    consultation_type: 'in-person', office_location: 'Lagos (Head Office)',
    message: '',
  });

  useEffect(() => {
    publicAPI.getPracticeAreas().then(r => setAreas(r.data)).catch(() => {});
    publicAPI.getTeam().then(r => setTeam(r.data)).catch(() => {});
  }, []);

  const areaList = areas.length > 0 ? areas.map(a => a.name) : STATIC_AREAS;
  const today = new Date().toISOString().split('T')[0];

  const submit = async () => {
    if (!form.client_name || !form.client_email) { toast.error('Full name and email are required'); return; }
    if (!form.practice_area) { toast.error('Please select an area of law'); return; }
    setLoading(true);
    try {
      const res = await publicAPI.submitBooking(form);
      setConfirmation(res.data);
    } catch { toast.error('Booking failed. Please call us on +234 (1) 555-0198'); }
    finally { setLoading(false); }
  };

  const F = k => ({ value: form[k] || '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  if (confirmation) {
    return (
      <Layout>
        <PageHero subtitle="Confirmed" title="Consultation Booked" />
        <section className="py-24 bg-ink">
          <div className="max-w-lg mx-auto px-6">
            <div className="border border-gold-500/30 bg-charcoal-950 p-10 text-center">
              <div className="w-20 h-20 border-2 border-gold-500 flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={40} className="text-gold-500" />
              </div>
              <h2 className="font-display text-4xl text-white font-light mb-3">Request Received</h2>
              <p className="text-charcoal-400 font-body text-sm leading-relaxed mb-8">{confirmation.message}</p>
              <div className="border border-charcoal-800 bg-black p-6 text-left mb-6">
                <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body mb-2">Your Booking Reference</p>
                <p className="font-mono text-white text-3xl tracking-widest">{confirmation.booking_ref}</p>
                <p className="text-charcoal-600 text-xs font-body mt-3">Quote this reference in all correspondence with our offices.</p>
              </div>
              <div className="space-y-3 text-left mb-8">
                {['Confirmation email sent to you within 2 hours', 'A designated attorney assigned to your matter', 'All communications protected by legal privilege (LPA Cap. L11)'].map(t => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <p className="text-charcoal-400 text-xs font-body">{t}</p>
                  </div>
                ))}
              </div>
              <a href="tel:+2341555-0198" className="font-display text-2xl text-gold-500 hover:text-gold-400 transition-colors block">+234 (1) 555-0198</a>
              <p className="text-charcoal-600 text-xs font-body mt-1">Emergency line — available 24 hours</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        subtitle="Schedule a Meeting"
        title="Book a Consultation"
        description="All consultations are confidential and protected by legal professional privilege from first contact — Legal Practitioners Act Cap. L11, LFN 2004."
      />

      {/* Trust badges */}
      <div className="bg-charcoal-950 border-b border-charcoal-900 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {['Strictly Confidential', 'No Obligation', 'Response Within 24 Hours', '4 Office Locations', 'Virtual Option Available'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <Shield size={10} className="text-gold-500" />
                <span className="text-charcoal-500 text-[10px] font-body tracking-widest uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 bg-ink">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">

          {/* Consultation type */}
          <div className="mb-10">
            <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body mb-4 flex items-center gap-2"><span className="font-mono bg-gold-500 text-ink px-2 py-0.5">01</span> Consultation Format</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CONSULT_TYPES.map(type => (
                <button key={type.id} onClick={() => setForm({ ...form, consultation_type: type.id })}
                  className={`border p-5 text-center transition-all duration-200 ${form.consultation_type === type.id ? 'border-gold-500 bg-gold-500/10' : 'border-charcoal-800 bg-charcoal-950 hover:border-charcoal-700'}`}>
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <p className={`font-body text-sm font-semibold mb-1 ${form.consultation_type === type.id ? 'text-gold-400' : 'text-white'}`}>{type.label}</p>
                  <p className="text-charcoal-600 text-[10px] font-body">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="border border-charcoal-900 bg-charcoal-950 p-8 space-y-6">
            {/* Personal details */}
            <div>
              <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body mb-4 flex items-center gap-2"><span className="font-mono bg-charcoal-800 text-gold-500 px-2 py-0.5">02</span> Your Details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Full Legal Name *</label><input {...F('client_name')} className="input-dark" placeholder="Chukwuemeka Nwosu" /></div>
                <div><label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Email Address *</label><input type="email" {...F('client_email')} className="input-dark" placeholder="name@company.com" /></div>
                <div><label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Phone (with country code)</label><input {...F('client_phone')} className="input-dark" placeholder="+234 80 0000 0000" /></div>
                <div>
                  <label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Preferred Office</label>
                  <select {...F('office_location')} className="input-dark">
                    {OFFICES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Legal matter */}
            <div className="border-t border-charcoal-900 pt-6">
              <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body mb-4 flex items-center gap-2"><span className="font-mono bg-charcoal-800 text-gold-500 px-2 py-0.5">03</span> Your Legal Matter</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Area of Law *</label>
                  <select {...F('practice_area')} className="input-dark">
                    <option value="">Select area of law…</option>
                    {areaList.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Preferred Attorney</label>
                  <select {...F('preferred_attorney')} className="input-dark">
                    <option value="">No preference — assign best match</option>
                    {team.map(t => <option key={t.id} value={t.name}>{t.name} — {t.specialization}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Preferred Date</label>
                  <input type="date" {...F('preferred_date')} min={today} className="input-dark" />
                </div>
                <div>
                  <label className="text-charcoal-500 text-[10px] tracking-widest uppercase font-body block mb-2">Preferred Time (WAT)</label>
                  <select {...F('preferred_time')} className="input-dark">
                    <option value="">Select time slot</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t} — West Africa Time</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Brief description */}
            <div className="border-t border-charcoal-900 pt-6">
              <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body mb-4 flex items-center gap-2"><span className="font-mono bg-charcoal-800 text-gold-500 px-2 py-0.5">04</span> Brief Case Description</p>
              <textarea rows={6} {...F('message')} className="input-dark resize-none w-full"
                placeholder={`Please briefly describe your legal situation:\n• Nature of the matter / dispute\n• Key parties involved\n• Any existing court filings (include case numbers)\n• Urgency level and any pending deadlines`} />
            </div>

            {/* Legal disclaimer */}
            <div className="flex items-start gap-3 bg-gold-500/5 border border-gold-500/15 p-5">
              <AlertCircle size={15} className="text-gold-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gold-400 text-[10px] tracking-widest uppercase font-body mb-1">Important Legal Notice</p>
                <p className="text-charcoal-500 text-xs font-body leading-relaxed">
                  Submitting this form does not establish a solicitor-client relationship. Legal representation commences only upon execution of a formal retainer agreement signed by both parties. All information shared herein is treated as strictly confidential under the <span className="text-charcoal-300">Legal Practitioners Act Cap. L11, LFN 2004</span> and the <span className="text-charcoal-300">Rules of Professional Conduct for Legal Practitioners (RPC) 2007</span>.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-charcoal-900 pt-6 flex flex-col sm:flex-row items-center gap-5">
              <button onClick={submit} disabled={loading} className="btn-gold w-full sm:w-auto justify-center py-4 px-12 text-sm">
                {loading ? 'Submitting Request…' : 'Request Consultation'}
                {!loading && <ArrowRight size={14} />}
              </button>
              <div>
                <p className="text-charcoal-600 text-[10px] font-body uppercase tracking-widest">Or call directly</p>
                <a href="tel:+2341555-0198" className="text-gold-500 font-body text-base hover:text-gold-400 transition-colors">+234 (1) 555-0198</a>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-8 border border-charcoal-900 bg-charcoal-950 p-7">
            <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase font-body mb-5 flex items-center gap-2"><Clock size={12} /> What Happens After You Submit</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: '01', title: 'Acknowledgement', desc: 'You receive a booking reference and confirmation email within 2 hours of submission.' },
                { n: '02', title: 'Attorney Assignment', desc: 'We review your matter and assign the most qualified counsel from our panel within 24 hours.' },
                { n: '03', title: 'Consultation', desc: 'Your attorney contacts you to confirm time, prepare documentation, and brief you on next steps.' },
              ].map(s => (
                <div key={s.n} className="flex gap-4">
                  <span className="font-mono text-gold-500/30 text-3xl font-bold flex-shrink-0 leading-none">{s.n}</span>
                  <div>
                    <p className="text-white font-body text-sm font-semibold mb-1">{s.title}</p>
                    <p className="text-charcoal-500 text-xs font-body leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
