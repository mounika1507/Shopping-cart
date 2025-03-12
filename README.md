# **Tasty Eats**   
A **Shopping Cart Website** is an essential feature of e-commerce applications, allowing users to **browse products, add items to their cart, manage cart contents, and proceed to checkout**. This project is built using **React.js**, ensuring a **dynamic, interactive, and user-friendly shopping experience** with real-time updates and smooth navigation.  

---  

## **Objectives**  
✔️ Create an **interactive shopping cart** where users can add/remove items dynamically.  
✔️ Implement **category-based filtering** for easy product discovery.  
✔️ Display **real-time price calculations** based on cart contents.  
✔️ Provide a **secure payment form** for checkout.  
✔️ Use **React components, state management, and hooks** for seamless UI interactions.  

---  

## **Technologies Used**  
- **React.js** – Component-based architecture for dynamic UI updates.  
- **CSS (External or Styled Components)** – Enhances design and responsiveness.  
- **React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)** – Manages cart operations efficiently.  
- **Error Boundary (Class Component)** – Catches and handles JavaScript errors without breaking the application.  

---  

## **How It Works (Step by Step)**  

### **1️⃣ Product Listing & Filtering**  
- The website displays a list of products fetched from a **JSON file or API**.  
- Users can filter products by **categories** such as **Italian, Indian, Desserts, etc.**  
- Each product shows **name, price, and an "Add to Cart" button**.  

### **2️⃣ Adding Items to the Cart**  
- Clicking **"Add to Cart"** stores the selected product in **React state**.  
- The cart updates dynamically to reflect:  
  - **Item name, price, and quantity**  
  - **Total price calculation**  

### **3️⃣ Managing the Cart**  
- Users can:  
  - **Increase/decrease item quantity**  
  - **Remove an item from the cart**  
  - **View real-time cart updates**  

### **4️⃣ Checkout & Payment Processing**  
- Clicking **"Checkout"** opens a **payment form** where users enter:  
  - **Name on Card**  
  - **Card Number**  
  - **Expiry Date & CVV**  
  - **Billing Address**  
- The form uses **state management and validation** to ensure correct input.  

### **5️⃣ Error Handling with Error Boundaries**  
- The **Error Boundary component** prevents the app from crashing by displaying a fallback UI if any error occurs during rendering.  

---  

## **Key Features**  
✔️ **Real-Time Cart Updates** – Total price and item list update instantly.  
✔️ **Category-Based Filtering** – Makes product selection easier.  
✔️ **Secure Payment Form** – Ensures correct billing details.  
✔️ **Error Boundary Handling** – Prevents app crashes.  
✔️ **Component Reusability** – Uses modular components for scalability.  

---  

## **Conclusion**  
The **Shopping Cart Website** built with **React.js** provides a smooth and efficient shopping experience. By leveraging **state management, component-based design, and error handling**, the project serves as a **solid foundation for e-commerce applications**. Future improvements could include **backend integration, order tracking, and user authentication** for a complete online shopping system.  
