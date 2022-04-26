export interface HybrisCategory {
    id: string;
    name: string;
    url: string;
    subcategories: HybrisCategory[];
}
export interface HybrisProduct {
    availableForPickup: boolean;
    averageRating: number;
    code: string;
    configurable: boolean;
    configuratorType: string;
    description: string;
    firstVariantImage: string;
    images: Image[];
    manufacturer: string;
    multidimensional: boolean;
    name: string;
    price: Price;
    priceRange: PriceRange;
    stock: Stock;
    summary: string;
    url: string;
    volumePricesFlag: boolean;
}
export interface Image {
    format: string;
    imageType: string;
    url: string;
}
export interface Price {
    currencyIso: string;
    formattedValue: string;
    priceType: string;
    value: number;
}
export interface PriceRange {
}
export interface Stock {
    isValueRounded: boolean;
    stockLevelStatus: string;
}
