import React, { useState } from "react";

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
    console.log("Payment Submitted:", formData);
    alert("Payment processed successfully!");
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Name on Card:</label>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

        <label>Card Number:</label>
        <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />

        <label>Expiry Date:</label>
        <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required />

        <label>CVV:</label>
        <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />

        <label>Billing Address:</label>
        <input type="text" name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} required />

        <button type="submit">Submit Payment</button>
      </form>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default PaymentForm;
