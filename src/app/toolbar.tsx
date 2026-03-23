// components/layout/Toolbar.tsx
'use client';
import { RootState } from "@/lib/redux/store/store";
import { useSelector } from "react-redux";

export default function Toolbar() {
  const { toolbarTitle, extraButtons, isVisible } = useSelector((state: RootState) => state.ui);
  const cartCount = useSelector((state: RootState) => state.cart.cartItems.length);

  // If the page has hidden the toolbar, don't render anything
  if (!isVisible) return null;

  const handleAction = (actionType: string) => {
    window.dispatchEvent(new CustomEvent(`toolbar-action-${actionType}`));
  };

  return (
    <div className="h-14 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
      <div className="font-semibold text-slate-700">{toolbarTitle}</div>
      <div className="flex items-center gap-2">
        {extraButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleAction(btn.actionType)}
            className={`px-3 py-1 text-sm rounded border transition-colors ${
              btn.variant === 'primary' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-slate-50'
            }`}
          >
            {btn.label}
          </button>
        ))}
        <div className="ml-4 p-2 relative cursor-pointer">
          🛒 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1 min-w-[1.2rem] text-center">
            {cartCount}
          </span>
        </div>
      </div>
    </div>
  );
}