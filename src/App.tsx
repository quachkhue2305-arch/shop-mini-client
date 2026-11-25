import { useRef, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { products } from "./data/products";
import "./App.css";

const categories = ["Tất cả", ...new Set(products.map((product) => product.category))];
const formatPrice = (price: number) => price.toLocaleString("vi-VN") + " ₫";

function App() {
  const [category, setCategory] = useState("Tất cả");
  const [cart, setCart] = useState<Record<number, number>>({});
  const cartDialog = useRef<HTMLDialogElement>(null);
  const cartItems = products.filter((product) => cart[product.id] > 0);
  const count = cartItems.reduce((total, product) => total + cart[product.id], 0);
  const total = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const visibleProducts = category === "Tất cả"
    ? products
    : products.filter((product) => product.category === category);

  function changeQuantity(id: number, amount: number, stock: number) {
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(stock, (current[id] ?? 0) + amount)),
    }));
  }

  return (
    <>
      <Header count={count} onCartOpen={() => cartDialog.current?.showModal()} />
      <main id="trang-chu" className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Đồ dùng hay <span>cho mỗi ngày.</span></h1>
            <p>Từ áo thun cơ bản đến phụ kiện công nghệ, chọn món đồ hợp với bạn.</p>
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
          <ProductList items={visibleProducts} quantities={cart} onAdd={(product) => changeQuantity(product.id, 1, product.stock)} />
        </section>
      </main>
      <Footer />
      <dialog ref={cartDialog} className="cart-dialog" aria-labelledby="cart-title">
        <div className="cart-heading">
          <h2 id="cart-title">Giỏ hàng</h2>
          <form method="dialog"><button className="close-button" aria-label="Đóng giỏ hàng">×</button></form>
        </div>
        {count === 0 ? <p>Giỏ hàng đang trống.</p> : (
          <>
            <ul className="cart-items">
              {cartItems.map((product) => (
                <li key={product.id}>
                  <div><strong>{product.name}</strong><p>{formatPrice(product.price)}</p></div>
                  <div className="quantity">
                    <button type="button" aria-label={`Giảm số lượng ${product.name}`} onClick={() => changeQuantity(product.id, -1, product.stock)}>−</button>
                    <span>{cart[product.id]}</span>
                    <button type="button" aria-label={`Tăng số lượng ${product.name}`} disabled={cart[product.id] >= product.stock} onClick={() => changeQuantity(product.id, 1, product.stock)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="cart-total">Tổng cộng <strong>{formatPrice(total)}</strong></p>
          </>
        )}
      </dialog>
    </>
  );
}

export default App;
