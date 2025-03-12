import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ShoppingCart, Trash } from "lucide-react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";  // Import the Error Boundary

const categories = ["All", "Italian", "American", "Japanese", "Indian", "Chinese", "Mexican", "Middle Eastern", "Dessert", "Healthy"];

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

class ShoppingCartClass extends React.Component {
  calculateTotal = () => {
    return this.props.cart.reduce((acc, item) => acc + item.price, 0);
  };

  render() {
    const { cart, removeFromCart, proceedToPayment } = this.props;
    const total = this.calculateTotal();

    return (
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        {cart.length > 0 ? (
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">${item.price}</span>
                <button className="remove-item" onClick={() => removeFromCart(index)}>
                  <Trash size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-cart">Cart is empty.</p>
        )}
        <Checkout total={total} cart={cart} proceedToPayment={proceedToPayment} />
      </div>
    );
  }
}

const Checkout = ({ total, cart, proceedToPayment }) => (
  <div className="checkout-section">
    <span className="total-price">Total: ${total.toFixed(2)}</span>
    <button className="checkout-btn" disabled={cart.length === 0} onClick={proceedToPayment}>
      <ShoppingCart size={16} className="checkout-icon" /> Checkout
    </button>
  </div>
);

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category">Filter:</label>
      <select id="category" value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

const PaymentForm = ({ goBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., call API to process payment
    console.log("Payment Submitted:", formData);
    alert("Payment processed successfully!");
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Name on Card:</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />

        <label>Expiry Date:</label>
        <input
          type="text"
          name="expiryDate"
          placeholder="MM/YY"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />

        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={formData.cvv}
          onChange={handleChange}
          required
        />

        <label>Billing Address:</label>
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          value={formData.billingAddress}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Payment</button>
      </form>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default function ShoppingCartApp() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/mounika1507/web-app/main/db.json");
        const data = await response.json();
        setProducts(data.foods);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }, []);

  const proceedToPayment = () => setShowPayment(true);
  const goBack = () => setShowPayment(false);

  const filteredProducts = useMemo(() => {
    return selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <div className="app-container">
      <h1 className="title">Tasty Eats</h1>
      {!showPayment && (
        <div className="filter-container">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>
      )}
      <div className="main-layout">
        {showPayment ? (
          <ErrorBoundary>
            <PaymentForm goBack={goBack} />
          </ErrorBoundary>
        ) : (
          <>
            <ProductList products={filteredProducts} addToCart={addToCart} />
            <ShoppingCartClass cart={cart} removeFromCart={removeFromCart} proceedToPayment={proceedToPayment} />
          </>
        )}
      </div>
    </div>
  );
}
