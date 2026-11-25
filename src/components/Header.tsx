type Props = {
  count: number;
  onCartOpen: () => void;
};

export default function Header({ count, onCartOpen }: Props) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#trang-chu" className="logo">Shop<span>ZX</span></a>
        <nav className="nav" aria-label="Điều hướng chính">
          <a href="#trang-chu">Trang chủ</a>
          <a href="#san-pham">Sản phẩm</a>
          <a href="#gioi-thieu">Giới thiệu</a>
        </nav>
        <button type="button" className="cart-link" onClick={onCartOpen}>
          Giỏ hàng <span aria-live="polite">{count}</span>
        </button>
      </div>
    </header>
  );
}
