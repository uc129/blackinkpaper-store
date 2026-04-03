

// app/(admin)/product-categories/[id]/CategoryForm.tsx
'use client';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import PageToolbar from "@/app/page-toolbar";

export default function ProductCategoryForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: initialData || {
      isActive: true,
      isFeatured: false,
    }
  });

  // Logic to auto-generate slug from print_name
  const name = watch("print_name");
  const generateSlug = () => {
    if (name) {
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setValue("slug", slug);
      setValue("name_code", name.toUpperCase().replace(/ /g, '_'));
    }
  };

  const onSubmit = (data: any) => {
    console.log("Sending to ASP.NET API:", data);
    // router.push('/admin/product-categories');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-6">
      <PageToolbar 
        title={initialData ? `Edit Category: ${initialData.print_name}` : "Create Category"} 
        buttons={[{ id: 'save', label: 'Save Category', actionType: 'submit', variant: 'primary' }]}
        onAction={(type) => type === 'submit' && handleSubmit(onSubmit)()}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border shadow-sm">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Display Name (Print Name)</label>
            <input {...register("print_name")} onBlur={generateSlug} className="mt-1 w-full border rounded-lg p-2" placeholder="e.g. Black & White" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Internal Name Code</label>
            <input {...register("name_code")} className="mt-1 w-full border bg-slate-50 rounded-lg p-2"  />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">URL Slug</label>
            <input {...register("slug")} className="mt-1 w-full border rounded-lg p-2" />
          </div>
        </div>

        {/* Configuration & Image */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea {...register("description")} rows={4} className="mt-1 w-full border rounded-lg p-2" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register("isActive")} className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Is Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register("isFeatured")} className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Is Featured</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}