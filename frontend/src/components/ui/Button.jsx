export default function Button({ children, variant = 'primary', onClick, type = 'button', className = '', ...props }) {
    const baseClass = 'btn';
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClass} ${variantClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
