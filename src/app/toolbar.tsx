// components/layout/Toolbar.tsx
'use client';
import { RootState } from "@/lib/redux/store/store";
import { useSelector } from "react-redux";

export default function Toolbar() {
  const { toolbarTitle, extraButtons, isVisible } = useSelector((state: RootState) => state.ui);
  const cartCount = useSelector((state: RootState) => state.cart.cart?.itemCount ?? 0);

  // If the page has hidden the toolbar, don't render anything
  if (!isVisible) return null;

  const handleAction = (actionType: string) => {
    window.dispatchEvent(new CustomEvent(`toolbar-action-${actionType}`));
  };

  return (
    <div className="h-14 border-b border-[var(--border)] bg-[var(--paper)] flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="font-semibold text-[var(--ink)]">{toolbarTitle}</div>
      <div className="flex items-center gap-2">
        {extraButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleAction(btn.actionType)}
            className={`px-3 py-1 text-sm rounded border transition-colors ${
              btn.variant === 'primary' ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]' : 'bg-[var(--paper)] hover:bg-[var(--paper-deep)]'
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
