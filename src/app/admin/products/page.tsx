'use client'
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { useRouter } from "next/navigation";
import DataTable from "../../../components/admin/masters-datatable";
import { mockProducts } from "@/lib/api/ecommerce/mockdata/mock-product-data";
import { createColumnHelper } from "@/components/admin/createColumnHelper";



export default function AdminProductListPage(){
const router = useRouter();
const h = createColumnHelper<ProductType>();

const columns = [
  h.imageText("Product", (p) => p.name, (p) => p.media.coverImageUrl),
  h.text("SKU", (p) => p.product_id),
  h.currency("Price", (p) => p.pricing.base_price, (p) => p.pricing.currency_code),
  h.badge("Status", (p) => p.taxonomy.isAvailable, 
    (val) => val ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'),
  h.text("Last Updated", (p) => new Date(p.audit.updatedAt).toLocaleDateString())
];

  return (
    <div className="space-y-6">
      <DataTable 
        data={mockProducts}
        columns={columns}
        onAdd={() => router.push('/products/new')}
        onEdit={(p) => router.push(`/products/${p.id}`)}
        onDelete={(p) => confirm(`Delete ${p.name}?`)}
        searchPlaceholder="Search by name or SKU..."
      />
    </div>
  );
}

