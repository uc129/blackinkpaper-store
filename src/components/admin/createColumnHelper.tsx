import { formatPriceToIntl } from "@/lib/utils";


export const createColumnHelper = <T,>() => ({
  // Simple text/key accessor
  text: (header: string, key: keyof T, className?: string) => ({
    header,
    accessor: key,
    className
  }),

  // Image + Text (Avatar pattern)
  imageText: (header: string, nameKey: keyof T, imgKey: keyof T, className?: string) => ({
    header,
    accessor: (item: T) => (
      <div className="flex items-center gap-3">
        <img src={item[imgKey] as string} className="w-10 h-10 rounded shadow-sm object-cover" alt="" />
        <span className="font-medium text-slate-900">{item[nameKey] as string}</span>
      </div>
    ),
    className
  }),

  // Status Badge pattern
  badge: (header: string, key: keyof T, colorMap: (val: any) => string) => ({
    header,
    accessor: (item: T) => {
      const val = item[key];
      return (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${colorMap(val)}`}>
          {String(val)}
        </span>
      );
    }
  }),

  // Currency pattern
  currency: (header: string, priceKey: keyof T, currencyKey: keyof T) => ({
    header,
    accessor: (item: T) => formatPriceToIntl(item[priceKey] as number, item[currencyKey] as string)
  })
});