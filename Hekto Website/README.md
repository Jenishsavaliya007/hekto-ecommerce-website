# Hekto E-Commerce Website

Welcome to the **Hekto E-Commerce** frontend platform. This project is a fully functional, interactive, and beautifully designed web application built entirely using **HTML5, Vanilla CSS, and JavaScript**. 

The goal of this project is to provide a seamless e-commerce experience without heavily relying on backend architecture by maximizing the native capabilities of modern web browsers.

## 🚀 Key Features

* **Dynamic Product Navigation**: Clicking on any product across the store intelligently captures its unique data (Title, Price, Image) and routes you to a dynamic `product details.html` view securely.
* **Persistent Shopping Cart**: A fully functional cart system powered by `localStorage`. Items remain in your cart even if you close the browser or refresh pages. Real-time subtotal calculations are maintained automatically.
* **Streamlined Checkout Flow**: Moving from the cart into the `checkout.html` page carries over your data seamlessly, providing a clean Billing & Shipping Address form before successfully completing the order.
* **Wishlist Integration**: Users can favorite items by clicking the heart icons floating on product cards, saving them automatically into their distinct `wishlist.html` menu.
* **Unified UI State**: The entire multi-page application is driven utilizing a heavily standardized global Navigation Header and Footer to ensure identical behavior globally.

## 📂 Project Structure

* `/css/` - Contains all the highly modular styling code, extracted specifically from inline styles to promote extreme reusability and cache support.
* `/js/` - Contains the isolated processing logic for the entire store:
  * `main.js`: Global handlers, Add-to-Cart logic, Wishlist saving, and Mobile navigation states.
  * `product-nav.js`: Listens globally for product clicks and writes them to local memory.
  * `product-details.js`: Hydrates `product details.html` dynamically based on what was clicked.
  * `cart.js`: Renders and configures the active shopping cart layout and math logic.
  * `checkout.js`: Empties the cart successfully and simulates order completion post-validation.
  * `wishlist.js`: Renders favorited items into the exact framework of a tabular grid.
* `*.html` - E-commerce page templates including `index.html`, `shop list.html`, `Grid Default`, and more.

## ⚙️ How to Run Locally

You do not need an extensive software engineering environment to run this site. Because it uses client-side rendering and `localStorage`, there are two very easy ways to run it:

### Method 1: Direct File Access (Easiest)
Simply open the main folder (`d:\1.Internship Project\Hekto Website`) securely within your operating system's File Explorer, and **double-click `index.html`** to launch it inside your default web browser (like Chrome, Edge, or Safari).

### Method 2: Local Web Server (Recommended)
If you prefer running a true localhost to eliminate any potential cross-origin file blocking by your browser, establish a fast Python web server:
1. Open up your computer's Command Prompt or Terminal inside the `Hekto Website` directory.
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate perfectly to: [http://localhost:8000](http://localhost:8000)

## 🛠 Built With
* **HTML5** 
* **Vanilla CSS3**
* **Vanilla JavaScript (ES6)**
* **Browser LocalStorage API**
