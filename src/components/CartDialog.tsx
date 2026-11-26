import { useState, type FormEvent, type Ref } from "react";
import type { Product } from "../data/products";
import { calcTotal, countItems, type CartItem } from "../utils/cart";
import { formatPrice } from "../utils/format";

type Props = {
  dialogRef: Ref<HTMLDialogElement>;
  cart: CartItem[];
  onAdd: (product: Product) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onComplete: () => void;
};

export default function CartDialog({ dialogRef, cart, onAdd, onDecrease, onRemove, onComplete }: Props) {
  const [checkout, setCheckout] = useState(false);
  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const count = countItems(cart);
  const total = calcTotal(cart);

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cart.length === 0 || orderTotal !== null) return;
    setOrderTotal(total);
    onComplete();
  }

  function resetView() {
    setCheckout(false);
    setOrderTotal(null);
  }

  return (
    <dialog ref={dialogRef} className="cart-dialog" aria-labelledby="cart-title" onClose={resetView}>
      <header className="cart-heading">
        <div>
          <h2 id="cart-title">{orderTotal !== null ? "Xác nhận đơn hàng" : checkout ? "Thanh toán" : "Giỏ hàng"}</h2>
          {orderTotal === null && <p>{count} sản phẩm</p>}
        </div>
        <form method="dialog"><button className="close-button" aria-label="Đóng giỏ hàng">×</button></form>
      </header>
      {orderTotal !== null ? (
        <div className="cart-empty">
          <span className="cart-status" aria-hidden="true">✓</span>
          <h3>Đã hoàn tất đơn hàng</h3>
          <p>Tổng đơn {formatPrice(orderTotal)} · Thanh toán khi nhận hàng</p>
          <form method="dialog"><button className="cart-primary">Tiếp tục mua sắm</button></form>
        </div>
      ) : cart.length === 0 ? (
        <div className="cart-empty">
          <h3>Giỏ hàng đang trống</h3>
          <p>Thêm sản phẩm vào giỏ để bắt đầu đặt hàng.</p>
          <form method="dialog"><button className="cart-primary">Tiếp tục mua sắm</button></form>
        </div>
      ) : checkout ? (
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Thông tin giao hàng</h3>
          <div className="checkout-fields">
            <label>Họ và tên<input name="name" autoComplete="name" required pattern=".*\S.*" /></label>
            <label>Số điện thoại<input name="phone" type="tel" autoComplete="tel-national" inputMode="tel" required pattern="0[0-9]{9}" title="Nhập số điện thoại gồm 10 chữ số, bắt đầu bằng 0" /></label>
            <label className="checkout-address">Địa chỉ giao hàng<input name="address" autoComplete="street-address" required pattern=".*\S.*" /></label>
          </div>
          <div className="checkout-method">
            <strong>Thanh toán khi nhận hàng</strong>
          </div>
          <div className="cart-total"><span>Tổng đơn</span><strong>{formatPrice(total)}</strong></div>
          <div className="checkout-actions">
            <button type="button" className="cart-secondary" onClick={() => setCheckout(false)}>Quay lại</button>
            <button type="submit" className="cart-primary">Đặt hàng</button>
          </div>
        </form>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {cart.map(({ product, quantity }) => (
              <li key={product.id}>
                <img src={product.image} alt="" width="72" height="72" />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>{formatPrice(product.price)}</p>
                  <button type="button" className="cart-remove" aria-label={`Xóa ${product.name}`} onClick={() => onRemove(product.id)}>Xóa</button>
                </div>
                <div className="cart-item-actions">
                  <strong>{formatPrice(product.price * quantity)}</strong>
                  <div className="quantity">
                    <button type="button" aria-label={`Giảm số lượng ${product.name}`} onClick={() => onDecrease(product.id)}>−</button>
                    <span>{quantity}</span>
                    <button type="button" aria-label={`Tăng số lượng ${product.name}`} disabled={quantity >= product.stock} onClick={() => onAdd(product)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <section className="cart-summary" aria-label="Tóm tắt đơn hàng">
            <div className="cart-total"><span>Tạm tính</span><strong>{formatPrice(total)}</strong></div>
            <button type="button" className="cart-primary" onClick={() => setCheckout(true)}>Tiến hành thanh toán <span aria-hidden="true">→</span></button>
          </section>
        </div>
      )}
    </dialog>
  );
}
