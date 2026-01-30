export default function Input({ label, error, ...props }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    {label}
                </label>
            )}
            <input className="input" {...props} />
            {error && (
                <p style={{
                    color: 'var(--accent)',
                    fontSize: '12px',
                    marginTop: '4px'
                }}>
                    {error}
                </p>
            )}
        </div>
    );
}
