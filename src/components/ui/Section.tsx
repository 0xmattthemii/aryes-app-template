export const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}> = ({ children, className = '', id, dark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 md:py-32 px-6 md:px-12 ${dark ? 'bg-aryes-dark text-white' : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

