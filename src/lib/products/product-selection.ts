import type {
  ProductSummaryDto,
  ProductVariantDto,
  ProductVariantOptionDto,
} from "@/lib/api/storefront/types";

export type ProductVariantSelection = {
  variant: ProductVariantDto;
  option: ProductVariantOptionDto;
};

export type SelectedOptionIds = Record<number, number>;

export type VariantSelectionMode = NonNullable<
  ProductSummaryDto["selectionMode"]
>;

const DEFAULT_SELECTION_MODE: VariantSelectionMode = "single-configuration";

export function isVariantOptionAvailable(
  variant: ProductVariantDto,
  option: ProductVariantOptionDto,
) {
  const availableStock = option.stockQuantity ?? variant.stockQuantity;
  return (
    availableStock === null ||
    availableStock === undefined ||
    availableStock > 0
  );
}

export function createDefaultSelections(
  variants: ProductVariantDto[],
  defaultOptionId?: number,
  selectionMode: VariantSelectionMode = DEFAULT_SELECTION_MODE,
): SelectedOptionIds {
  if (selectionMode === "single-configuration") {
    const availableOptions = variants
      .flatMap((variant) =>
        (variant.options || [])
          .filter((option) => isVariantOptionAvailable(variant, option))
          .map((option) => ({ variant, option })),
      )
      .map((selection, sourceOrder) => ({ ...selection, sourceOrder }));
    const explicitDefault = availableOptions.find(
      ({ option }) =>
        option.id === defaultOptionId || option.isDefault === true,
    );
    const rankedDefault = availableOptions.sort((a, b) => {
      const rankDifference =
        (b.option.popularityRank ?? Number.NEGATIVE_INFINITY) -
        (a.option.popularityRank ?? Number.NEGATIVE_INFINITY);
      if (rankDifference !== 0) return rankDifference;
      const orderDifference =
        (a.option.displayOrder ?? a.sourceOrder) -
        (b.option.displayOrder ?? b.sourceOrder);
      return orderDifference || a.sourceOrder - b.sourceOrder;
    })[0];
    const selection = explicitDefault || rankedDefault;

    return selection ? { [selection.variant.id]: selection.option.id } : {};
  }

  return variants.reduce<SelectedOptionIds>((selections, variant) => {
    const availableOptions = (variant.options || []).filter((item) =>
      isVariantOptionAvailable(variant, item),
    );
    const explicitDefault = availableOptions.find(
      (item) => item.id === defaultOptionId || item.isDefault === true,
    );
    const rankedDefault = availableOptions
      .map((item, index) => ({ item, index }))
      .sort((a, b) => {
        const rankDifference =
          (b.item.popularityRank ?? Number.NEGATIVE_INFINITY) -
          (a.item.popularityRank ?? Number.NEGATIVE_INFINITY);
        if (rankDifference !== 0) return rankDifference;
        const orderDifference =
          (a.item.displayOrder ?? a.index) - (b.item.displayOrder ?? b.index);
        return orderDifference;
      })[0]?.item;
    const option = explicitDefault || rankedDefault;
    if (option) selections[variant.id] = option.id;
    return selections;
  }, {});
}

export function getSelectedOptions(
  variants: ProductVariantDto[],
  selectedOptionIds: SelectedOptionIds,
) {
  return variants.flatMap<ProductVariantSelection>((variant) => {
    const option = (variant.options || []).find(
      (item) => item.id === selectedOptionIds[variant.id],
    );
    return option ? [{ variant, option }] : [];
  });
}

export function hasCompleteVariantSelection(
  variants: ProductVariantDto[],
  selections: ProductVariantSelection[],
  selectionMode: VariantSelectionMode = DEFAULT_SELECTION_MODE,
) {
  if (variants.length === 0) return false;
  return selectionMode === "one-per-group"
    ? selections.length === variants.length
    : selections.length === 1;
}

export function getSelectedUnitPrice(
  productFinalPrice: number,
  selections: ProductVariantSelection[],
) {
  const absolutePrice = selections.find(
    ({ variant, option }) =>
      typeof option.absolutePrice === "number" ||
      typeof variant.absolutePrice === "number",
  );
  const selectedAbsolutePrice =
    absolutePrice?.option.absolutePrice ?? absolutePrice?.variant.absolutePrice;

  if (typeof selectedAbsolutePrice === "number") return selectedAbsolutePrice;

  return (
    productFinalPrice +
    selections.reduce(
      (total, { option }) => total + (option.priceModifier ?? 0),
      0,
    )
  );
}

export function getSelectedStockLimit(selections: ProductVariantSelection[]) {
  const trackedStock = selections.flatMap(({ variant, option }) => {
    const stock = option.stockQuantity ?? variant.stockQuantity;
    return typeof stock === "number" ? [stock] : [];
  });

  return trackedStock.length > 0 ? Math.min(...trackedStock) : null;
}

export function toCartVariantSelections(selections: ProductVariantSelection[]) {
  return selections.map(({ variant, option }) => ({
    productVariantId: variant.id,
    productVariantOptionId: option.id,
  }));
}
