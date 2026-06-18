import { BarLoader } from '@/components/ui/bar-loader';

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <BarLoader />
    </div>
  );
}
