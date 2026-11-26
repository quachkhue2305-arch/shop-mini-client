import { products } from "../src/data/products.ts";
import { addToCart, calcTotal, countItems, removeFromCart, updateQuantity } from "../src/utils/cart.ts";
import type { CartItem } from "../src/utils/cart.ts";
import { formatPrice } from "../src/utils/format.ts";
import { filterProducts, getCategories, groupByCategory, searchByPriceRange } from "../src/utils/product.ts";

const shirt = products[0];
const bottle = products[3];
let cart: CartItem[] = [];
cart = addToCart(cart, shirt);
cart = addToCart(cart, shirt, 2);
cart = addToCart(cart, bottle);
console.log("Số sản phẩm:", countItems(cart));
console.log("Tổng tiền:", formatPrice(calcTotal(cart)));

cart = updateQuantity(cart, shirt.id, 1);
cart = removeFromCart(cart, bottle.id);
console.log(cart.map(({ product, quantity }) => `${product.name} x${quantity}`));
console.log("Danh mục:", getCategories(products));
console.log("Điện tử, giá tăng dần:", filterProducts(products, { category: "Điện tử", sort: "asc" }).map((product) => product.name));
console.log("Tìm 'áo', tối đa 300k:", filterProducts(products, { keyword: "áo", maxPrice: 300000 }).map((product) => product.name));
console.log("Giá từ 150.000 đến 200.000 đ:", searchByPriceRange(products, 150000, 200000).map((product) => product.name));
console.log("Số sản phẩm theo danh mục:", groupByCategory(products));
