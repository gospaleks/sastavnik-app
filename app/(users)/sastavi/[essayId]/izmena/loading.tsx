import { Loader2Icon } from 'lucide-react';

const loading = () => {
  return (
    <div className="flex flex-grow items-center justify-center p-12">
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default loading;
