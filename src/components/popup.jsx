import React from 'react';

function Popup({ onClose, selectedProducts, subTotal, vat, discount }) {
    const saleNumber = generateSaleNumber();
    const currentDate = getCurrentDate();
    return (
        <div className="popup">
            <div className="popup-content">
                <div className='header'><h2>Receipt</h2></div>

                <div className='saleno'>
                    <p>Sale Number :: {saleNumber}</p>
                </div>
                <div className='date'>
                    <p>Date: {currentDate}</p>
                </div>
                <table className="receipt-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>${(product.quantity * product.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className='bottom'>
                    <tr>
                        <td>Total Amounts</td>
                        <td>Sub Total: ${subTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Discount: ${discount ? discount.toFixed(2) : '0'}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>VAT Tax: ${vat ? vat.toFixed(2) : '0'}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Total: ${(subTotal && vat && discount) ? (subTotal + vat - discount).toFixed(2) : 'INR 000'}</td>
                    </tr>
                </table>
                <div className='closebutton'><button onClick={onClose}>Close</button></div>
            </div>
        </div>
    );
}

export default Popup;

function generateSaleNumber() {
    return '00102';
}

function getCurrentDate() {
    const now = new Date();
    return now.toLocaleString();
}
