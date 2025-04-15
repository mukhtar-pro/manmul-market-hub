
// Mock data for products
export const products = Array.from({ length: 60 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: [
    "Premium Wireless Earbuds",
    "Ultra HD Smart TV 55\"",
    "Men's Casual Cotton T-Shirt",
    "Women's Yoga Leggings",
    "Stainless Steel Kitchen Knife Set",
    "Organic Coffee Beans",
    "Professional Gaming Mouse",
    "Bamboo Cutting Board",
    "Essential Oil Diffuser",
    "Ceramic Plant Pot",
    "Bluetooth Wireless Speaker",
    "Anti-Aging Face Cream",
    "Adjustable Laptop Stand",
    "Cotton Bed Sheets",
    "Fitness Activity Tracker",
  ][i % 15],
  image: `/placeholder.svg`,
  price: Math.floor(Math.random() * 200) + 10,
  rating: (Math.random() * 3 + 2).toFixed(1),
  upvotes: Math.floor(Math.random() * 1000),
  stock: Math.floor(Math.random() * 50) + 1,
  description: "This is a high-quality product designed for maximum performance and comfort. Made with premium materials and built to last.",
  category: ["Electronics", "Fashion", "Home", "Kitchen", "Beauty"][Math.floor(Math.random() * 5)],
}));

// Mock data for shops
export const shops = Array.from({ length: 20 }, (_, i) => ({
  id: `shop-${i + 1}`,
  name: [
    "TechHub Store",
    "Fashion Outlet",
    "Home Essentials",
    "Kitchen Paradise",
    "Beauty Secrets",
    "Sports Center",
    "Book Haven",
    "Pet Supplies Plus",
    "Garden World",
    "Kids Wonderland",
  ][i % 10],
  avatar: `/placeholder.svg`,
  address: `${Math.floor(Math.random() * 100) + 1} Main St, Sydney, Australia`,
  city: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"][Math.floor(Math.random() * 5)],
  productCount: Math.floor(Math.random() * 100) + 10,
  followers: Math.floor(Math.random() * 1000) + 100,
  rating: (Math.random() * 3 + 2).toFixed(1),
  description: "We are a leading retailer specializing in high-quality products at competitive prices. Our mission is to provide excellent customer service and satisfaction.",
}));

// Mock data for medicines
export const medicines = Array.from({ length: 30 }, (_, i) => ({
  id: `medicine-${i + 1}`,
  name: [
    "Paracetamol Tablets",
    "Ibuprofen Pain Relief",
    "Vitamin C Supplements",
    "Allergy Relief Capsules",
    "Cough Syrup",
    "Multivitamin Tablets",
    "Calcium & Vitamin D Tablets",
    "First Aid Antiseptic Cream",
    "Cold & Flu Tablets",
    "Digestive Health Capsules"
  ][i % 10],
  image: `/placeholder.svg`,
  price: Math.floor(Math.random() * 30) + 5,
  description: "High-quality healthcare product for your wellbeing. Always read the label and follow the instructions.",
  category: ["Pain Relief", "Vitamins", "Cold & Flu", "First Aid", "Digestive Health"][Math.floor(Math.random() * 5)],
  inStock: Math.random() > 0.1, // 90% of items in stock
  requiresPrescription: Math.random() > 0.7, // 30% require prescription
}));

// Mock data for user orders
export const orders = Array.from({ length: 10 }, (_, i) => ({
  id: `order-${i + 1}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  status: ["Delivered", "Shipped", "Processing", "Cancelled"][Math.floor(Math.random() * 4)],
  totalAmount: Math.floor(Math.random() * 200) + 20,
  items: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, j) => ({
    id: `item-${j + 1}`,
    productId: `product-${Math.floor(Math.random() * 60) + 1}`,
    name: products[Math.floor(Math.random() * products.length)].name,
    price: Math.floor(Math.random() * 100) + 10,
    quantity: Math.floor(Math.random() * 3) + 1,
  })),
}));

// Mock user data
export const user = {
  id: "user-1",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  avatar: `/placeholder.svg`,
  address: "123 Main St, Sydney NSW 2000, Australia",
  phoneNumber: "+61 2 1234 5678",
  balance: 250.75,
};

// Mock feedback data
export const productFeedback = Array.from({ length: 20 }, (_, i) => ({
  id: `feedback-${i + 1}`,
  userId: `user-${Math.floor(Math.random() * 10) + 1}`,
  userName: ["Jane Smith", "John Doe", "Alice Johnson", "Bob Brown", "Charlie Davis"][Math.floor(Math.random() * 5)],
  rating: Math.floor(Math.random() * 5) + 1,
  comment: [
    "Great product, exactly as described!",
    "Shipping was fast, product quality is excellent.",
    "Good value for money, would recommend.",
    "Not quite what I expected, but still decent quality.",
    "Amazing product! Will definitely buy again.",
    "Average quality, but works as expected.",
    "Excellent customer service and product quality.",
    "Slightly disappointed with the durability.",
    "Perfect! Exactly what I needed.",
    "Good product but took too long to arrive."
  ][Math.floor(Math.random() * 10)],
  date: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
}));

// Mock shop feedback
export const shopFeedback = Array.from({ length: 15 }, (_, i) => ({
  id: `shop-feedback-${i + 1}`,
  userId: `user-${Math.floor(Math.random() * 10) + 1}`,
  userName: ["Jane Smith", "John Doe", "Alice Johnson", "Bob Brown", "Charlie Davis"][Math.floor(Math.random() * 5)],
  rating: Math.floor(Math.random() * 5) + 1,
  comment: [
    "Excellent shop with great customer service!",
    "Fast shipping and good communication.",
    "Good selection of products at fair prices.",
    "Shop has high-quality items but could improve on response time.",
    "Very satisfied with my purchase from this shop.",
    "Average experience, nothing exceptional.",
    "Great shop, will definitely buy from them again!",
    "Some items were out of stock, but overall good experience.",
    "Love this shop, always reliable and fast delivery.",
    "Good shop but limited product range."
  ][Math.floor(Math.random() * 10)],
  date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
}));
