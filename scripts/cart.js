// cart.js
/* styles specific to cart page (cart.html) */
// Logic to manage the shopping cart
// Responsibilities:
// - Load items added to the cart (from localStorage or backend)
// - Display cart items dynamically: image, name, price, quantity
// - Update totals automatically when quantity changes
// - Handle removing items from the cart
// - Apply discounts, promo codes, or taxes if applicable
// - Handle "Proceed to Checkout" button click
// write your code below
// cart.js


// scripts/cart.js
// Logic to manage the shopping cart

// --- 1. DUMMY DATA (Simulates Loading Items) ---
const cartData = [
    { 
        model: "Mercedes-Benz S-Class 2022", 
        price: 115000, 
        quantity: 1, 
        // 🚨 REPLACE THIS WITH YOUR IMAGE PATH 
        image: "https://i.pinimg.com/1200x/3e/44/a2/3e44a2ae429c533371add5dae7a85163.jpg" 
    },
    { 
        model: "BMW X7 M50i 2023", 
        price: 105000, 
        quantity: 1, 
        // 🚨 REPLACE THIS WITH YOUR IMAGE PATH
        image: "https://i.pinimg.com/736x/b5/38/91/b538913e20b55b100615d259622ce7ef.jpg" 
    },
    { 
        model: "Audi RS7 Sportback 2021", 
        price:125000 , 
        quantity: 1, 
        // 🚨 REPLACE THIS WITH YOUR IMAGE PATH
        image: "https://i.pinimg.com/736x/b3/21/bd/b321bd09d3f8580b248d1d87f2fcf39d.jpg" 
    },
    { 
        model: "Lexus RX 500h 2022", 
        price: 70000, 
        quantity: 1, 
        // 🚨 REPLACE THIS WITH YOUR IMAGE PATH
        image: "https://i.pinimg.com/736x/f9/23/5c/f9235ca1a91c153c834bed446b5532fa.jpg" 
    },
    { 
        model: "Porche 911 Carrera 2021", 
        price: 99000, 
        quantity: 1, 
        // 🚨 REPLACE THIS WITH YOUR IMAGE PATH
        image: "https://i.pinimg.com/736x/1c/30/96/1c309666cafc8c1b8c5f4ebbf3b157c2.jpg" 
    }
];

// --- Global Variables/Constants ---
const TAX_RATE = 0.10; // 10% tax
let promoDiscount = 0; // Placeholder for promo code discount amount

// Helper function to format currency (KshX,XXX,XXX)
function formatCurrency(amount) {
    const numericAmount = isNaN(amount) || !isFinite(amount) ? 0 : amount;
    return 'Ksh' + Math.round(numericAmount).toLocaleString();
}

/**
 * Creates the HTML markup for a single cart item row.
 */
function createCartRow(item) {
    const subtotal = item.price * item.quantity;
    return `
        <tr data-price="${item.price}" data-model="${item.model}">
            <td><img src="${item.image}" alt="${item.model}" class="cart-item-image"></td>
            <td data-label="Car Model" class="cart-item-title">${item.model}</td>
            <td data-label="Price" class="cart-item-price">${formatCurrency(item.price)}</td>
            <td data-label="Quantity">
                <div class="quantity-controls d-flex justify-content-center align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="changeQuantity(this, -1)">-</button>
                    <span class="quantity fw-bold">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="changeQuantity(this, 1)">+</button>
                </div>
            </td>
            <td data-label="Subtotal" class="subtotal-cell">${formatCurrency(subtotal)}</td>
            <td><button class="btn btn-sm btn-danger remove-btn-custom" onclick="removeItem(this)"><i class="fas fa-trash-alt"></i> Remove</button></td>
        </tr>
    `;
}

/**
 * Loads and displays the items dynamically by injecting HTML into the table body.
 */
function loadCartItems() {
    const tbody = document.querySelector('#cart-table tbody');
    if (tbody) {
        tbody.innerHTML = ''; // Clear existing static content
        const rowsHTML = cartData.map(createCartRow).join('');
        tbody.innerHTML = rowsHTML;
    }
    updateTotals(); // Initial total calculation
}

// --- Cart Manipulation Logic ---

function changeQuantity(button, delta) {
    const row = button.closest('tr');
    if (!row) return;

    const quantitySpan = row.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent);
    
    quantity += delta;
    if (quantity < 1) quantity = 1; 

    quantitySpan.textContent = quantity;
    
    updateSubtotal(row);
    updateTotals();
}

function updateSubtotal(row) {
    const price = parseFloat(row.getAttribute('data-price')) || 0;
    const quantity = parseInt(row.querySelector('.quantity').textContent) || 0;
    const subtotal = price * quantity;
    
    const subtotalCell = row.querySelector('.subtotal-cell');
    if (subtotalCell) {
        subtotalCell.textContent = formatCurrency(subtotal);
    }
}

function removeItem(button) {
    const row = button.closest('tr');
    if (row) {
        row.remove();
        updateTotals();
        
        // Check for empty cart logic here if needed
        // if (document.querySelectorAll('#cart-table tbody tr').length === 0) { ... }
    }
}


// --- Main Totals Calculation (Includes Dynamic Tax/Discount) ---

function updateTotals() {
    const rows = document.querySelectorAll('#cart-table tbody tr');
    let subtotal = 0;

    // 1. Calculate the Grand Subtotal
    rows.forEach(row => {
        const price = parseFloat(row.getAttribute('data-price')) || 0;
        const quantity = parseInt(row.querySelector('.quantity').textContent) || 0;
        subtotal += price * quantity;
    });

    // 2. Apply Taxes and Discounts
    
    // Example Discount Logic: 50,000 Ksh off if subtotal is >= 800,000
    promoDiscount = (subtotal >= 800000) ? 50000 : 0; 
    
    const taxableAmount = subtotal - promoDiscount;
    const tax = taxableAmount > 0 ? taxableAmount * TAX_RATE : 0;
    const total = subtotal - promoDiscount + tax;

    // 3. Update the Summary fields
    document.getElementById('summary-subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('summary-discount').textContent = formatCurrency(-promoDiscount); // Display as negative
    document.getElementById('summary-tax').textContent = formatCurrency(tax);
    document.getElementById('summary-total').textContent = formatCurrency(total);
}

// --- Checkout Handler ---
function handleCheckout(e) {
    const totalItems = document.querySelectorAll('#cart-table tbody tr').length;
    if (totalItems === 0) {
        e.preventDefault(); // Stop redirection
        alert("Your cart is empty. Please add items before proceeding to checkout.");
    } 
    // If cart is not empty, let the default link behavior (redirecting to checkout.html) proceed.
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    
    // Attach event listener to the checkout button
    const checkoutButton = document.querySelector('.cart-button--checkout');
    if (checkoutButton) {
        // Use a click listener to run the validation check
        checkoutButton.addEventListener('click', handleCheckout);
    }
});