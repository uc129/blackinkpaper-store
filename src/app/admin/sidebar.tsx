// components/admin/Sidebar.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, ListTree, 
  ShoppingCart, Settings, Menu, X, ChevronRight 
} from 'lucide-react';
import { ExternalLink } from '@/components/_ui/primitives/links';

const urlprefix = "/admin";

const navGroups = [
  {
    label: "Management",
    items: [
      { name: 'Dashboard', href: `${urlprefix}/dashboard`, icon: LayoutDashboard },
      { name: 'Products', href: `${urlprefix}/products`, icon: Package },
      { name: 'Categories', href: `${urlprefix}/product-categories`, icon: ListTree },
    ]
  },
  {
    label: "Sales",
    items: [
      { name: 'Orders', href: `${urlprefix}/orders`, icon: ShoppingCart },
    ]
  },
  {
    label: "System",
    items: [
      { name: 'Settings', href: `${urlprefix}/settings`, icon: Settings },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    let mainnavbar = document.getElementById("main-navbar");
    let mainnavbarmobile = document.getElementById("main-navbar-mobile");
    if(!mainnavbar) return;
    mainnavbar.classList.add("hidden");
    if(!mainnavbarmobile) return;
    mainnavbarmobile.classList.add("hidden");

    return ()=> {
      mainnavbar.classList.remove("hidden")
      mainnavbarmobile.classList.remove("hidden")
    };
  },[])

  const NavContent = () => (
    <>
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          L&T Energy Admin
        </span>
        {/* Close button for mobile */}
        <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all group ${
                      isActive 
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={isActive ? 'text-blue-400' : 'group-hover:text-slate-200'} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {isActive && <ChevronRight size={14} />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      <ExternalLink href='/' text='View Live Store'/>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
            UC
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium truncate">Ria M.</p>
            <p className="text-[10px] text-slate-500 truncate">Administrator</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE HEADER & TRIGGER */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-60">
        <span className="font-bold text-white">L&T Admin</span>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-md"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* MOBILE OVERLAY (BACKDROP) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-64 bg-slate-900 text-white flex flex-col
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <NavContent />
      </aside>
    </>
  );
}