import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';

type Props = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  className?: string;
};

const AlertCard = ({
  title,
  description,
  variant = 'default',
  className,
}: Props) => {
  return (
    <Alert variant={variant} className={className}>
      <TriangleAlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="text-sm">{description}</AlertDescription>
    </Alert>
  );
};

export default AlertCard;
