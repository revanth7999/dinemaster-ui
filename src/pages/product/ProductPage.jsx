import "./ProductPage.css";

const products = [
  {
    id: 1,
    name: "Remote Control Car",
    category: "Remote Control",
    age: "6+",
    price: 1299,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500",
  },
  {
    id: 2,
    name: "Building Blocks",
    category: "Educational",
    age: "4+",
    price: 899,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
  },
  {
    id: 3,
    name: "Teddy Bear",
    category: "Soft Toy",
    age: "3+",
    price: 699,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500",
  },
  {
    id: 4,
    name: "Toy Train",
    category: "Vehicles",
    age: "5+",
    price: 1099,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500",
  },
  {
    id: 5,
    name: "Kids Kitchen Set",
    category: "Pretend Play",
    age: "4+",
    price: 1499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1599623560574-39d485900c95?w=500",
  },
  {
    id: 6,
    name: "Puzzle Game",
    category: "Educational",
    age: "6+",
    price: 499,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500",
  },
];

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="product-details">
          <span>Age {product.age}</span>
          <span>⭐ {product.rating}</span>
        </div>

        <div className="product-footer">
          <span className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button className="cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Toy Store</h1>
          <p>Find something fun for everyone</p>
        </div>

        <button className="cart">
          🛒 Cart <span>0</span>
        </button>
      </header>

      <main>
        <div className="page-heading">
          <div>
            <h2>Popular Toys</h2>
            <p>Explore our collection of toys</p>
          </div>

          <select className="sort">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
