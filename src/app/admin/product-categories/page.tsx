'use client'
import { useRouter } from "next/navigation";
import DataTable from "../../../components/admin/masters-datatable";
import { mockProducts } from "@/lib/api/ecommerce/mockdata/mock-product-data";
import { createColumnHelper } from "@/components/admin/createColumnHelper";
import { ProductCategoryType } from "@/lib/api/ecommerce/types/product-categories";
import { mockProductCategories } from "@/lib/api/ecommerce/mockdata/mock-product-data";


export default function AdminProductCategoriesListPage(){
const router = useRouter();
const h = createColumnHelper<ProductCategoryType>();

const columns = [
  h.imageText("Product Category", "name", "coverImageUrl"),
  h.text("Cat", "name_code"),
  h.badge("Active", "isActive", (val) => 
    val ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
  ),
];

  return (
    <div className="space-y-6">
      <DataTable 
        data={mockProductCategories} // Replace with your ASP.NET API fetch
        columns={columns}
        onAdd={() => router.push('/products/new')}
        onEdit={(p) => router.push(`/products/${p.id}`)}
        onDelete={(p) => confirm(`Delete ${p.name}?`)}
        searchPlaceholder="Search by name or SKU..."
      />
    </div>
  );
}