const shopName = "ShopMini";
let visitCount = 0;
visitCount += 1;

console.log(`Chào mừng đến ${shopName}! Lượt xem: ${visitCount}`);

const discount = (price: number, percent = 10) => price - (price * percent) / 100;
console.log("Giá sau giảm:", discount(200000), discount(200000, 25));

const product = { id: 1, name: "Áo thun", price: 150000, tags: ["mới", "hot"] };
const { name: productName, price } = product;
const [firstTag] = product.tags;
console.log(productName, price, firstTag);

const updated = { ...product, price: 120000 };
console.log(product.price, "->", updated.price);
const moreTags = [...product.tags, "giảm giá"];
console.log(moreTags);

const sum = (...numbers: number[]) => numbers.reduce((a, b) => a + b, 0);
console.log("Tổng:", sum(1, 2, 3, 4));

const prices = [150000, 420000, 690000, 185000];
const vnd = prices.map((price) => price.toLocaleString("vi-VN") + " đ");
const cheap = prices.filter((price) => price < 300000);
const firstExpensive = prices.find((price) => price > 400000);
const total = prices.reduce((acc, price) => acc + price, 0);
console.log({ vnd, cheap, firstExpensive, total });

type User = { name: string; address?: { city?: string } };
const guest: User = { name: "Khách" };
console.log(guest.address?.city ?? "Chưa có địa chỉ");

const fakeFetchProducts = (): Promise<string[]> =>
  new Promise((resolve) => setTimeout(() => resolve(["Áo thun", "Quần jean"]), 500));

async function main() {
  console.log("Đang tải sản phẩm...");
  console.log("Đã tải:", await fakeFetchProducts());
}

void main();
