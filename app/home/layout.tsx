import Sidebar from '../components/common/Sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full h-full bg-gray-light">
      <Sidebar />
      {children}
    </div>
  );
}
