// Reusable admin form wrapper
export function AdminPageHeader({ title, subtitle, children }) {
  return (
    <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
      <div>
        <p className="text-gold-500 text-xs tracking-widest uppercase font-body mb-1">{subtitle}</p>
        <h1 className="font-display text-3xl text-white font-light">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export function AdminCard({ children, className = '' }) {
  return (
    <div className={`bg-charcoal-950 border border-charcoal-900 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function AdminField({ label, children }) {
  return (
    <div>
      <label className="text-gold-500 text-xs tracking-widest uppercase font-body block mb-2">{label}</label>
      {children}
    </div>
  );
}

export function SaveButton({ loading, onClick, label = 'Save Changes' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="btn-gold py-2.5 px-8 text-xs"
    >
      {loading ? 'Saving...' : label}
    </button>
  );
}

export function DeleteButton({ onClick, label = 'Delete' }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-red-700 text-red-400 hover:bg-red-900/20 text-xs font-body tracking-wider uppercase transition-colors"
    >
      {label}
    </button>
  );
}

export function AdminTable({ headers, children, empty }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="border-b border-charcoal-800">
            {headers.map(h => (
              <th key={h} className="text-left text-charcoal-500 text-xs tracking-widest uppercase py-3 px-4 font-body font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal-900">
          {children}
        </tbody>
      </table>
      {empty && (
        <div className="text-center py-12 text-charcoal-600 text-sm font-body">{empty}</div>
      )}
    </div>
  );
}

export function StatusBadge({ status }) {
  const colors = {
    pending: 'border-gold-500/40 text-gold-500',
    confirmed: 'border-green-600 text-green-400',
    cancelled: 'border-red-700 text-red-400',
    completed: 'border-charcoal-600 text-charcoal-400',
    unread: 'border-gold-500/40 text-gold-500',
    read: 'border-charcoal-700 text-charcoal-500',
    replied: 'border-green-600 text-green-400',
  };
  return (
    <span className={`text-xs font-body px-2 py-0.5 border capitalize ${colors[status] || 'border-charcoal-700 text-charcoal-500'}`}>
      {status}
    </span>
  );
}
