import { useRef, useState } from "react";
import CartDialog from "./components/CartDialog";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { products, type Product } from "./data/products";
import { addToCart, countItems, removeFromCart, updateQuantity, type CartItem } from "./utils/cart";
import { filterProducts, getCategories, searchByPriceRange } from "./utils/product";
import "./App.css";

const categories = ["Tất cả", ...getCategories(products)];
const featuredSections = [
  { id: "dien-tu", title: "Đồ điện tử", items: filterProducts(products, { category: "Điện tử" }) },
  { id: "sap-het-hang", title: "Sản phẩm sắp hết hàng", items: products.filter(({ stock }) => stock >= 1 && stock <= 5) },
];

function App() {
  const [category, setCategory] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartDialog = useRef<HTMLDialogElement>(null);
  const quantities = Object.fromEntries(cart.map(({ product, quantity }) => [product.id, quantity]));
  const count = countItems(cart);
  const min = minPrice === "" ? 0 : Number(minPrice);
  const max = maxPrice === "" ? Infinity : Number(maxPrice);
  const invalidRange = min < 0 || max < 0 || min > max;
  const categoryProducts = filterProducts(products, { category: category === "Tất cả" ? undefined : category });
  const visibleProducts = invalidRange ? [] : searchByPriceRange(categoryProducts, min, max);

  function addProduct(product: Product) {
    setCart((current) => {
      const quantity = current.find((item) => item.product.id === product.id)?.quantity ?? 0;
      return quantity < product.stock ? addToCart(current, product) : current;
    });
  }

  function decreaseQuantity(productId: number) {
    setCart((current) => {
      const item = current.find(({ product }) => product.id === productId);
      return item ? updateQuantity(current, productId, item.quantity - 1) : current;
    });
  }

  return (
    <>
      <Header count={count} onCartOpen={() => cartDialog.current?.showModal()} />
      <main id="trang-chu" className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Đồ hay cho <span>mỗi ngày.</span></h1>
            <p>Tìm đồ đi học, đi làm và dùng hằng ngày, từ áo thun cơ bản đến phụ kiện công nghệ.</p>
            <a className="hero-link" href="#san-pham">Xem sản phẩm <span aria-hidden="true">↓</span></a>
          </div>
          <img
            className="hero-image"
            src={import.meta.env.BASE_URL + "images/shopzx-hero.jpg"}
            alt="Tai nghe tím, balo và bình giữ nhiệt trong studio tông tím"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
        </section>
        <nav className="collection-links" aria-label="Các khu sản phẩm">
          <a href="#san-pham">Sản phẩm nổi bật <span aria-hidden="true">↘</span></a>
          {featuredSections.map(({ id, title }) => (
            <a key={id} href={`#${id}`}>{title} <span aria-hidden="true">↘</span></a>
          ))}
        </nav>
        <section id="san-pham" className="catalog" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <h2 id="catalog-title">Sản phẩm nổi bật</h2>
            <p aria-live="polite">{visibleProducts.length} sản phẩm</p>
          </div>
          <div className="filters" role="group" aria-label="Lọc theo danh mục">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={item === category} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <fieldset className="price-filter">
            <legend>Lọc theo giá</legend>
            <label>
              Từ (đ)
              <input type="number" inputMode="numeric" min="0" placeholder="0" value={minPrice}
                aria-invalid={invalidRange} aria-describedby={invalidRange ? "price-error" : undefined}
                onChange={(event) => setMinPrice(event.target.value)} />
            </label>
            <label>
              Đến (đ)
              <input type="number" inputMode="numeric" min="0" placeholder="Không giới hạn" value={maxPrice}
                aria-invalid={invalidRange} aria-describedby={invalidRange ? "price-error" : undefined}
                onChange={(event) => setMaxPrice(event.target.value)} />
            </label>
            <button type="button" disabled={minPrice === "" && maxPrice === ""} onClick={() => { setMinPrice(""); setMaxPrice(""); }}>
              Xóa lọc giá
            </button>
            {invalidRange && <p id="price-error" role="alert">Nhập giá từ 0 đ trở lên và giá đến ít nhất bằng giá từ.</p>}
          </fieldset>
          {visibleProducts.length > 0
            ? <ProductList items={visibleProducts} quantities={quantities} onAdd={addProduct} />
            : !invalidRange && <p className="catalog-empty">Không có sản phẩm phù hợp với bộ lọc.</p>}
        </section>
        {featuredSections.map(({ id, title, items }) => (
          <section key={id} className="catalog" aria-labelledby={id}>
            <div className="catalog-heading">
              <h2 id={id}>{title}</h2>
              <p>{items.length} sản phẩm</p>
            </div>
            <ProductList items={items} quantities={quantities} onAdd={addProduct} />
          </section>
        ))}
      </main>
      <Footer />
      <CartDialog
        dialogRef={cartDialog}
        cart={cart}
        onAdd={addProduct}
        onDecrease={decreaseQuantity}
        onRemove={(id) => setCart((current) => removeFromCart(current, id))}
        onComplete={() => setCart([])}
      />
    </>
  );
}

export default App;
