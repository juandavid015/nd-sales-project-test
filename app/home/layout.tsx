import Sidebar from '../components/common/Sidebar';
import SubNavigation from '../components/common/SubNavigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full h-full bg-gray-light">
      <Sidebar />
      <SubNavigation />
      {children}
    </div>
  );
}
