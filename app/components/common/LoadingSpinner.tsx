import { IconLoading } from './Icons';

export default function LoadingSpinner({ className }: { className: string }) {
  return (
    <div className="animate-spin inline-block fill-main-color">
      <IconLoading className={className} />
    </div>
  );
}
