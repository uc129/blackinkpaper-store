

// components/admin/DataTable.tsx
'use client';

import { Search, Plus, MoreVertical, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../_ui/primitives/button";

export interface DataColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataColumn<T>[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
  searchPlaceholder?: string;
}

export default function DataTable<T extends { id: number | string }>({ 
  data, columns, 
  onAdd, onEdit, onDelete, 
  isLoading,
  searchPlaceholder = "Search records..." 
}: DataTableProps<T>) {
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden px-8">

      {/* Table Header / Actions */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full max-w-md pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        
        {onAdd && (
          <Button variant={'icon'} 
            onClick={onAdd}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={18} /> Add New
          </Button>
        )}
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider ${col.className}`}>
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              // Loading Skeleton
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={columns.length + 1} className="px-6 py-4 bg-slate-50/30 h-16"></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-400">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  {columns.map((col, idx) => (
                    <td key={idx} className={`px-6 py-4 text-sm text-slate-600 ${col.className}`}>
                      {typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor] as ReactNode)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEdit && (
                        <button onClick={() => onEdit(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                          <Edit2 size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(item)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
        <p className="text-xs text-slate-500">Showing {data.length} results</p>
        <div className="flex gap-2">
          <button className="p-1 border rounded hover:bg-white disabled:opacity-50"><ChevronLeft size={16}/></button>
          <button className="p-1 border rounded hover:bg-white disabled:opacity-50"><ChevronRight size={16}/></button>
        </div>
      </div>
    </div>
  );
}