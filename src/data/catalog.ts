import rawProducts from "./products.json";

export type Product = {
  PName: string;
  PCode: string;
  CategoryName: string;
  Title: string;
  Description: string;
  ProductImage: string;
  ProductId: number;
  Id: number;
  DP: number;
  IsHotSellingProduct: boolean;
  MRP: number;
  BV: number;
  CategoryIds: number[];
  IsSpecialProduct: boolean;
};

export type Category = {
  id: number;
  name: string;
  shortName: string;
  image?: string;
};

export const products = rawProducts as Product[];

export const categories: Category[] = [
  { id: 0, name: "All Categories", shortName: "All Categories" },
  { id: 1, name: "Hot Selling Products", shortName: "Hot Selling" },
  { id: 3, name: "Personal Care Products", shortName: "Personal Care", image: "/images/skbanner/category/personal-care.jpg" },
  { id: 6, name: "Food & FMCG Products", shortName: "Food & FMCG", image: "/images/skbanner/category/food-fmcg.jpg" },
  { id: 7, name: "Household Products", shortName: "Household", image: "/images/skbanner/category/household-products.jpg" },
  { id: 8, name: "Agro & Veterinary", shortName: "Agro & Veterinary", image: "/images/skbanner/category/agro-inventary.jpg" },
  { id: 15, name: "Auto Products", shortName: "Auto Products", image: "/images/skbanner/category/auto-products.jpg" },
  { id: 16, name: "Ayurvedic & Healthcare Range", shortName: "Ayurvedic & Healthcare", image: "/images/skbanner/category/ayurvedic.jpg" },
  { id: 17, name: "Fashion & Lifestyle", shortName: "Fashion & Lifestyle", image: "/images/skbanner/category/fashion-life.jpg" },
];

export const categoryShowcase = [
  categories.find((category) => category.id === 8)!,
  categories.find((category) => category.id === 16)!,
  categories.find((category) => category.id === 17)!,
  categories.find((category) => category.id === 6)!,
  categories.find((category) => category.id === 3)!,
  categories.find((category) => category.id === 7)!,
  categories.find((category) => category.id === 15)!,
];

export const heroSlides = [
  { image: "/images/skbanner/healthcare_mainbanner.jpg", category: 16, label: "Ayurvedic & Healthcare" },
  { image: "/images/skbanner/fmcg_mainbanner.jpg", category: 6, label: "Food & FMCG" },
  { image: "/images/skbanner/agro_mainbanner.jpg", category: 8, label: "Agro & Veterinary" },
  { image: "/images/skbanner/moorxmoro_main.jpg", category: 17, label: "Fashion & Lifestyle" },
];

export const promoBanners = [
  { image: "/images/skbanner/sub_healthcare.jpg", category: 16, label: "Healthcare products" },
  { image: "/images/skbanner/sub_fmcg.jpg", category: 6, label: "FMCG products" },
  { image: "/images/skbanner/sub_agro.jpg", category: 8, label: "Agro products" },
];

export const hotProducts = products.filter((product) => product.IsHotSellingProduct).slice(0, 10);
export const specialProducts = products.filter((product) => product.IsSpecialProduct);

export function getProduct(id: number | string) {
  return products.find((product) => product.Id === Number(id));
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function displayProductName(value: string) {
  return value
    .toLocaleLowerCase("en-IN")
    .replace(/\b\w/g, (letter) => letter.toLocaleUpperCase("en-IN"));
}

export function getCategoryName(id: number) {
  return categories.find((category) => category.id === id)?.name ?? "Our Products";
}
