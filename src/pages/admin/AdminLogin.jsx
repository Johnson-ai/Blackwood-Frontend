import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Scale, Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/admin');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 79px,#C9A84C 79px,#C9A84C 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,#C9A84C 79px,#C9A84C 80px)` }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 border border-gold-500 flex items-center justify-center mx-auto mb-4">
            <Scale size={24} className="text-gold-500" />
          </div>
          <h1 className="font-display text-3xl text-white font-light">Blackwood & Associates</h1>
          <p className="text-charcoal-500 text-xs tracking-[0.3em] uppercase font-body mt-1">Admin Portal</p>
        </div>

        <div className="bg-charcoal-950 border border-charcoal-900 p-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-8" />

          <div className="flex items-center gap-3 mb-6">
            <Lock size={16} className="text-gold-500" />
            <h2 className="font-body text-white text-sm tracking-widest uppercase">Secure Sign In</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gold-500 text-xs tracking-widest uppercase font-body block mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="input-dark"
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="text-gold-500 text-xs tracking-widest uppercase font-body block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-dark pr-12"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-gold-500 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center py-3.5 mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-charcoal-800">
            <p className="text-charcoal-600 text-xs font-body text-center">
              Default: <span className="text-charcoal-500">admin</span> / <span className="text-charcoal-500">Admin@2024!</span>
            </p>
          </div>
        </div>

        <p className="text-center text-charcoal-700 text-xs font-body mt-6">
          This portal is for authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}
