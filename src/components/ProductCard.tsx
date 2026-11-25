import type { Product } from "../data/products";

type Props = {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, quantity, onAdd }: Props) {
  const buttonLabel = product.stock === 0 ? "Hết hàng" : quantity >= product.stock ? "Đã thêm tối đa" : "Thêm vào giỏ";

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" width="512" height="512" />
      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-price">{product.price.toLocaleString("vi-VN")} ₫</p>
        <button type="button" className="btn" disabled={quantity >= product.stock} onClick={() => onAdd(product)}>
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}
