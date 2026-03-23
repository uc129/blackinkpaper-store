import Sidebar from "./sidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout flex items-start gap-4 pt-14 lg:pt-0 ">
      <div className="relative">
        {/* 1. Permanent Sidebar */}    
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col">

        {/* 3. Main Page Content */}
        <main className="overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}