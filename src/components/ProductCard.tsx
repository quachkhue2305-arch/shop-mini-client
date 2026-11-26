import type { Product } from "../data/products";
import { formatPrice } from "../utils/format";

type Props = {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, quantity, onAdd }: Props) {
  const outOfStock = product.stock === 0;
  const atStockLimit = quantity >= product.stock;
  const buttonLabel = atStockLimit && !outOfStock ? "Đã thêm tối đa" : "Thêm vào giỏ";

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" width="512" height="512" />
      {outOfStock && <span className="badge-out">Hết hàng</span>}
      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button type="button" className="btn" disabled={atStockLimit} onClick={() => onAdd(product)}>
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}
