# manmulshop MVP (Online Shopping Platform)

Welcome to **manmulshop**, a powerful and modern online shopping platform designed to provide a seamless shopping experience. Built with the latest technologies, our platform offers intuitive navigation, fast interactions, and robust features that make online shopping enjoyable for all users.

![screencapture-preview-manmul-market-hub-lovable-app-2025-04-18-02_13_52](https://github.com/user-attachments/assets/d71fd47e-ec0e-4fd7-885f-b67986834994)

---

## Table of Contents

- [manmulshop MVP (Online Shopping Platform)](#manmulshop-mvp-online-shopping-platform)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Technology Stack](#technology-stack)
  - [Features](#features)
  - [Pages](#pages)
    - [Products Page](#products-page)
    - [Product Detail Page](#product-detail-page)
    - [Shops Page](#shops-page)
    - [Shop Detail Page](#shop-detail-page)
    - [Healthcare Page](#healthcare-page)
    - [Medicine Detail Page](#medicine-detail-page)
    - [Cart Page](#cart-page)
    - [History Page](#history-page)
    - [User Profile Page](#user-profile-page)
    - [Settings Page](#settings-page)
  - [Layout](#layout)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)

---

## Project Overview

**manmulshop** is an online shopping platform where users can browse and purchase a wide variety of products, shop from different sellers, and explore healthcare products. The platform is designed to be user-friendly, responsive, and highly interactive, ensuring an excellent shopping experience.

---

## Technology Stack

- **Frontend**: 
  - React
  - TypeScript
  - Vite
  - Radix UI
  - Tailwind CSS
  - React Hook Form
  - Zod (for validation)
  - Supabase

---

## Features

- **Product Browsing**: Users can explore a variety of product categories and apply filters for a tailored shopping experience.
- **Cart & Checkout**: Users can add products to their cart, review them, and proceed to payment.
- **Shop Exploration**: Users can browse shops, view shop details, and discover products from different sellers.
- **Healthcare Products**: A section dedicated to browsing healthcare-related products and medicines.
- **User Profile**: Users can manage their profile, view purchase history, and update settings.
- **Settings**: Customizable themes, preferred contact methods, and other preferences.

---

## Pages

### Products Page
- **Product Category Tree**: A collapsible and selectable tree to filter products by category.
- **Product Filter Bar**: Filter products by price, rating, and more.
- **Product List**: Display a list of products with product name, image, price, upvotes, and a clickable cart icon.
- **Pagination**: Navigate through product pages with pagination.

### Product Detail Page
- Displays detailed information about a product: images, name, description, price, ratings, and stock availability.
- Users can add products to their cart with a defined quantity.

### Shops Page
- **Area Selector**: Select cities in Australia to filter shops by location.
- **Shop List**: Display shops with their avatars, names, addresses, number of products, and follower count.

### Shop Detail Page
- Displays detailed information about a shop including area, avatars, and a list of products sold by the shop.
- Users can browse products and check client feedback.

### Healthcare Page
- **Healthcare Area Selector**: Filter healthcare products by location.
- **Medicine List**: Display a list of medicines with essential details.

### Medicine Detail Page
- Displays detailed information about a specific medicine, its use, dosage, and available stock.

### Cart Page
- Displays all products and medicines in the cart.
- Proceed to payment functionality.

### History Page
- Users can view their past orders and purchase history.

### User Profile Page
- Display user details and allow them to update their information.
- Users can recharge their balance via card payment.

### Settings Page
- **Theme Customizer**: Change app color, font, and font size.
  - Default theme: Green
  - Default font: Roboto
- Preferred contact method (email notifications)
- Reset password functionality

---

## Layout

- **Header**: Includes app avatar, search input, and a user profile dropdown menu with options for profile, cart, and logout (sign in).
- **Topbar**: Displays navigation links to Products, Shops, Healthcare, History, Cart, and Settings.
- **Main Container**: Displays the content of each page dynamically.
- **Navbar**: Includes copyright information and the DAE (Developed And Executed) logo.

---

## Setup Instructions

To run this project locally, follow the steps below:

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/manmulshop.git
   cd manmulshop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

---
