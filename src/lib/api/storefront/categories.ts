export const storefrontCategories = [
  {
    slug: "black-and-white",
    label: "Black & White",
    categoryId: 1,
  },
  {
    slug: "cityscapes",
    label: "CityScapes",
    categoryId: 2,
  },
  {
    slug: "commissions",
    label: "Commissions",
    categoryId: 3,
  },
  {
    slug: "travel-art",
    label: "Travel Art",
    categoryId: 4,
  },
] as const;

export function getStorefrontCategory(slug: string) {
  return storefrontCategories.find((category) => category.slug === slug);
}
