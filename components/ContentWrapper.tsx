export const ContentWrapper = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`container mx-auto p-4 ${className}`}>{children}</div>;
};

export default ContentWrapper;
