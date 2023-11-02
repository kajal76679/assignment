import React, { useState } from 'react';
import './css/app.css';
import productData from './products.json';
import Popup from './components/popup';
import { useEffect,useCallback } from 'react';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vatPercentage, setVatPercentage] = useState(10);
  const [discountPercentage, setDiscountPercentage] = useState(5);
  const [total, setTotal] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

 
  const handleProcessSale = () => {
    setPopupOpen(true);
    setOverlayVisible(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setOverlayVisible(false);
  };

  const handleProductClick = (product) => {
    const productIndex = selectedProducts.findIndex((p) => p.name === product.name);
    if (productIndex === -1) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    } else {
      const updatedProducts = [...selectedProducts];
      updatedProducts[productIndex].quantity += 1;
      setSelectedProducts(updatedProducts);
    }
  
    calculateTotal();
  };
  
  const handleDeleteProduct = (product) => {
    const updatedProducts = selectedProducts.filter((p) => p.name !== product.name);
    setSelectedProducts(updatedProducts);
    calculateTotal();
  };
  

  const calculateTotal = useCallback(() => {
    const subTotal = selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    const vatAmount = (subTotal * vatPercentage) / 100;
    const discountAmount = (subTotal * discountPercentage) / 100;
    const calculatedTotal = subTotal + vatAmount - discountAmount;
    setSubTotal(subTotal);
    setTotal(calculatedTotal);
    setVat(vatAmount);
    setDiscount(discountAmount);
  }, [selectedProducts, vatPercentage, discountPercentage]);
  
  useEffect(() => {
    calculateTotal();
  }, [selectedProducts, vatPercentage, discountPercentage, calculateTotal]);
  
  const handleVatChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      setVatPercentage(inputValue);
      calculateTotal();
    }
  };
  const handleDiscountChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      setDiscountPercentage(inputValue);
      calculateTotal();
    }
  };
  const handleCancelSale = () => {
    setSelectedProducts([]);
    setVat(0);
    setDiscount(0);
    setVatPercentage(10);
    setDiscountPercentage(5);
    setSubTotal(0);
    setTotal(0);
  };

  const handleIncrementQuantity = (product) => {
    const updatedProducts = [...selectedProducts];
    const productIndex = updatedProducts.findIndex((p) => p.name === product.name);
    if (productIndex !== -1) {
      updatedProducts[productIndex].quantity++;
      setSelectedProducts(updatedProducts);
      calculateTotal();
    }
  };

  const handleDecrementQuantity = (product) => {
    const updatedProducts = [...selectedProducts];
    const productIndex = updatedProducts.findIndex((p) => p.name === product.name);
    
    if (productIndex !== -1) {
      if (updatedProducts[productIndex].quantity === 1) {
        updatedProducts.splice(productIndex, 1);
      } else {
        updatedProducts[productIndex].quantity--;
      }
  
      setSelectedProducts(updatedProducts);
      calculateTotal();
    }
  };
  



  return (
    <div className="pos-container">
      {isOverlayVisible && <div className="overlay"></div>}
      <div className="action-buttons">
        <div className="receipt">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index} className="selected-product">
                  <td><button
                  className="delete-button"
                  onClick={() => handleDeleteProduct(product)}><i class="fa fa-times" aria-hidden="true"></i></button>{product.name}</td>
                  <td>${product.price}</td>
                  <td><button
                    className="quantity-button"
                    onClick={() => handleDecrementQuantity(product)}> - </button>{product.quantity}
                    <button className="quantity-button" onClick={() => handleIncrementQuantity(product)}> + </button></td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedProducts.length === 0 ? (
            <div className="no-products-message">
              <p>THERE ARE NO PRODUCTS</p>
            </div>
          ):null}
        </div>
          
  
        <div className="total-fields">
          <p>Sub Total: ${subTotal.toFixed(2)}</p>
          <p>
            VAT Tax (%):
            <input
              type="number"
              value={vatPercentage}
              onChange={handleVatChange}
            />
            (${vat.toFixed(2)})
          </p>
          <p>
            Discount (%):
            <input
              type="number"
              value={discountPercentage}
              onChange={handleDiscountChange}
            />
            (${discount.toFixed(2)})
          </p>
          <p>Total: ${(total).toFixed(2)}</p>
        </div>
        <div className="button_section">
          <ul>
            <li><button onClick={handleCancelSale}>CANCEL SALE</button></li>
            <li><button onClick={handleProcessSale}>PROCESS SALE</button></li>
          </ul>
          {isPopupOpen && (
            <div className="popup-container">
            <Popup
              onClose={closePopup}
              selectedProducts={selectedProducts}
              subTotal={subTotal}
              vat={vat}
              discount={discount}
            />
          </div>
          )}

        </div>
      </div>
      <div className="product-list">
        {productData.map((product, index) => (
          <div
            key={index}
            className="product-item"
            onClick={() => handleProductClick(product)}
          >
            <div className="product-image">
              <img src={`/images/${product.image}`} alt={product.name} />
              <div className="product-info">
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-description">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div >
  );
}

export default App;

