import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Trash2, X, Shield, Eye, EyeOff, Key } from 'lucide-react';
import { adminAPI } from '../../utils/api';
import { AdminPageHeader, AdminCard, AdminField, SaveButton, AdminTable } from './AdminComponents';
import { useAuth } from '../../context/AuthContext';

const empty = { username: '', password: '', full_name: '', role: 'editor' };

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(null);
  const [pwModal, setPwModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { admin } = useAuth();

  const load = () => adminAPI.getUsers().then(r => setUsers(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.username || !form.password) return toast.error('Username and password required');
    setLoading(true);
    try {
      await adminAPI.createUser(form);
      toast.success('Admin user created');
      load(); setModal(null); setForm(empty);
    } catch (e) { toast.error(e?.response?.data?.error || 'Failed'); }
    finally { setLoading(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this admin user? This cannot be undone.')) return;
    try { await adminAPI.deleteUser(id); toast.success('User deleted'); load(); }
    catch (e) { toast.error(e?.response?.data?.error || 'Failed'); }
  };

  const changePassword = async () => {
    if (pwForm.new_password !== pwForm.confirm) return toast.error('Passwords do not match');
    if (pwForm.new_password.length < 8) return toast.error('Password must be at least 8 characters');
    setLoading(true);
    try {
      await adminAPI.changePassword({ current_password: pwForm.current_password, new_password: pwForm.new_password });
      toast.success('Password changed successfully');
      setPwModal(false); setPwForm({ current_password: '', new_password: '', confirm: '' });
    } catch (e) { toast.error(e?.response?.data?.error || 'Failed'); }
    finally { setLoading(false); }
  };

  const F = k => ({ value: form[k] || '', onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="p-6 lg:p-8">
      <AdminPageHeader title="Admin Users" subtitle="Access Control">
        <div className="flex gap-3">
          <button onClick={() => setPwModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-charcoal-700 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 text-xs font-body tracking-wider uppercase transition-colors">
            <Key size={13} /> Change My Password
          </button>
          {admin?.role === 'superadmin' && (
            <button onClick={() => { setForm(empty); setModal(true); }} className="btn-gold py-2 px-5 text-xs">
              <Plus size={14} /> Add Admin
            </button>
          )}
        </div>
      </AdminPageHeader>

      <AdminCard>
        <AdminTable headers={['Name', 'Username', 'Role', 'Created', 'Actions']} empty="No users found.">
          {users.map(u => (
            <tr key={u.id} className="hover:bg-charcoal-900/30">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                    <span className="text-gold-500 text-xs font-body font-bold">{u.full_name?.[0] || 'A'}</span>
                  </div>
                  <span className="text-white font-body text-sm">{u.full_name || '—'}</span>
                  {u.id === admin?.id && <span className="text-[10px] text-gold-500 border border-gold-500/30 px-1.5 py-0.5 font-body">You</span>}
                </div>
              </td>
              <td className="py-3 px-4 font-mono text-charcoal-400 text-sm">{u.username}</td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-0.5 border flex items-center gap-1 w-fit ${u.role === 'superadmin' ? 'border-gold-500/40 text-gold-400' : 'border-charcoal-700 text-charcoal-400'}`}>
                  <Shield size={10} />
                  {u.role}
                </span>
              </td>
              <td className="py-3 px-4 text-charcoal-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
              <td className="py-3 px-4">
                {u.id !== admin?.id && admin?.role === 'superadmin' && (
                  <button onClick={() => remove(u.id)} className="text-charcoal-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Create user modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">Create Admin User</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <AdminField label="Full Name"><input {...F('full_name')} className="input-dark" placeholder="Jane Adeyemi" /></AdminField>
              <AdminField label="Username"><input {...F('username')} className="input-dark" placeholder="jane_admin" /></AdminField>
              <AdminField label="Password">
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} {...F('password')} className="input-dark pr-10" placeholder="Min. 8 characters" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-gold-500">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </AdminField>
              <AdminField label="Role">
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="input-dark">
                  <option value="editor">Editor — Can edit content</option>
                  <option value="superadmin">Super Admin — Full access</option>
                </select>
              </AdminField>
              <p className="text-charcoal-600 text-xs font-body">Editors can manage all content. Super Admins can also manage users and system settings.</p>
              <div className="flex gap-3 pt-3 border-t border-charcoal-800">
                <SaveButton loading={loading} onClick={create} label="Create User" />
                <button onClick={() => setModal(null)} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider hover:text-white transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change password modal */}
      {pwModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal-950 border border-charcoal-800 w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-800">
              <h3 className="font-display text-2xl text-white font-light">Change Password</h3>
              <button onClick={() => setPwModal(false)}><X size={20} className="text-charcoal-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <AdminField label="Current Password">
                <input type="password" value={pwForm.current_password} onChange={e => setPwForm({ ...pwForm, current_password: e.target.value })} className="input-dark" />
              </AdminField>
              <AdminField label="New Password">
                <input type="password" value={pwForm.new_password} onChange={e => setPwForm({ ...pwForm, new_password: e.target.value })} className="input-dark" placeholder="Min. 8 characters" />
              </AdminField>
              <AdminField label="Confirm New Password">
                <input type="password" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} className="input-dark" />
              </AdminField>
              <div className="flex gap-3 pt-3 border-t border-charcoal-800">
                <SaveButton loading={loading} onClick={changePassword} label="Update Password" />
                <button onClick={() => setPwModal(false)} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-400 text-xs font-body uppercase tracking-wider hover:text-white transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
