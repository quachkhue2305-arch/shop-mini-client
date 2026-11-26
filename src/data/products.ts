export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};
const baseUrl = import.meta.env?.BASE_URL ?? "/";

export const products: Product[] = [
  { id: 1, name: "Áo thun basic", price: 150000, image: baseUrl + "images/ao-thun.jpg", category: "Thời trang", stock: 12 },
  { id: 2, name: "Quần jean slim", price: 420000, image: baseUrl + "images/quan-jean.jpg", category: "Thời trang", stock: 5 },
  { id: 3, name: "Tai nghe Bluetooth", price: 690000, image: baseUrl + "images/tai-nghe.jpg", category: "Điện tử", stock: 0 },
  { id: 4, name: "Bình giữ nhiệt 500ml", price: 185000, image: baseUrl + "images/binh-giu-nhiet.jpg", category: "Gia dụng", stock: 20 },
  { id: 5, name: "Balo laptop 15 inch", price: 550000, image: baseUrl + "images/balo.jpg", category: "Phụ kiện", stock: 8 },
  { id: 6, name: "Chuột không dây", price: 245000, image: baseUrl + "images/chuot.jpg", category: "Điện tử", stock: 15 },
  { id: 7, name: "Mũ lưỡi trai cotton", price: 129000, image: baseUrl + "images/mu-luoi-trai.jpg", category: "Phụ kiện", stock: 18 },
  { id: 8, name: "Túi tote canvas", price: 159000, image: baseUrl + "images/tui-tote.jpg", category: "Phụ kiện", stock: 14 },
];
