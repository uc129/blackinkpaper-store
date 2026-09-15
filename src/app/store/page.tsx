import { redirect } from "next/navigation";

export default async function StoreLandingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const incomingQuery = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(incomingQuery)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        query.append(key, entry);
      });
    } else {
      query.set(key, value);
    }
  }

  const serialized = query.toString();
  redirect(`/store/shop/category/prints${serialized ? `?${serialized}` : ""}`);
}
