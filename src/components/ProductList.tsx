import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

type Props = {
  items: Product[];
  quantities: Record<number, number>;
  onAdd: (product: Product) => void;
};

export default function ProductList({ items, quantities, onAdd }: Props) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} quantity={quantities[product.id] ?? 0} onAdd={onAdd} />
      ))}
    </div>
  );
}
