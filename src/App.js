import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ShoppingCart, Trash } from "lucide-react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";  // Import the Error Boundary
import CategoryFilter from "./CategoryFilter";
import PaymentForm from "./PaymentForm.js";

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
    return this.props.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  render() {
    const { cart, removeFromCart, updateQuantity, proceedToPayment } = this.props;
    const total = this.calculateTotal();

    return (
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        {cart.length > 0 ? (
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                </div>
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
        console.log("Fetched data:", data); 
        setProducts(data.foods || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);
  

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = (index, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((_, i) => i !== index);
      }
      return prevCart.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const proceedToPayment = () => setShowPayment(true);
  const goBack = () => setShowPayment(false);

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
            <ProductList products={products} addToCart={addToCart} />
            <ShoppingCartClass cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} proceedToPayment={proceedToPayment} />
          </>
        )}
      </div>
    </div>
  );
}