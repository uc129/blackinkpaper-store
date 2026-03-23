// components/layout/PageToolbar.tsx
'use client';
import { resetToolbar, setToolbar, ToolbarButton } from "@/lib/redux/store/slices/uiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface PageToolbarProps {
  title?: string;
  buttons?: ToolbarButton[];
  onAction?: (actionType: string) => void;
  hide?: boolean; // New prop to hide the toolbar
}

export default function PageToolbar({ title, buttons, onAction, hide = false }: PageToolbarProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set the toolbar state including visibility
    dispatch(setToolbar({ 
      title, 
      buttons, 
      isVisible: !hide 
    }));

    const listener = (e: any) => {
      if (onAction) onAction(e.type.replace('toolbar-action-', ''));
    };

    buttons?.forEach(btn => {
        window.addEventListener(`toolbar-action-${btn.actionType}`, listener);
    });

    return () => {
      dispatch(resetToolbar());
      buttons?.forEach(btn => {
        window.removeEventListener(`toolbar-action-${btn.actionType}`, listener);
      });
    };
  }, [dispatch, title, buttons, onAction, hide]);

  return null;
}