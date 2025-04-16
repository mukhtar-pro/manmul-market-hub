
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
  image: [
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // earbuds
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // tv
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // t-shirt
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // yoga leggings
    "https://images.unsplash.com/photo-1593618656894-100eb9b551c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // knife set
    "https://images.unsplash.com/photo-1559525839-55fdb54e81d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // coffee beans
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // gaming mouse
    "https://images.unsplash.com/photo-1594248356692-ed114ae30f56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // cutting board
    "https://images.unsplash.com/photo-1608571423539-e951a27585f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // oil diffuser
    "https://images.unsplash.com/photo-1602702123311-bccacb2a3084?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // plant pot
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // bluetooth speaker
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // face cream
    "https://images.unsplash.com/photo-1610465299993-e6675c9f9efa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // laptop stand
    "https://images.unsplash.com/photo-1631887071901-a87e7b6fb38d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // bed sheets
    "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // fitness tracker
  ][i % 15],
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
  avatar: [
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // tech store
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // fashion
    "https://images.unsplash.com/photo-1584771145729-0bd9fda6529b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // home
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // kitchen
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // beauty
    "https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // sports
    "https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // books
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // pet supplies
    "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // garden
    "https://images.unsplash.com/photo-1642984061426-3cdee2629e63?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // kids
  ][i % 10],
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
  image: [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // paracetamol
    "https://images.unsplash.com/photo-1626716893600-936c621b8fdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // ibuprofen
    "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // vitamin C
    "https://images.unsplash.com/photo-1631374190925-e7583657060c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // allergy
    "https://images.unsplash.com/photo-1607006946971-d8a01b0b8150?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // cough syrup
    "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // multivitamin
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // calcium
    "https://images.unsplash.com/photo-1583241739086-1106b8be565b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // antiseptic cream
    "https://images.unsplash.com/photo-1600954268372-b291d362d035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // cold & flu
    "https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"  // digestive health
  ][i % 10],
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
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
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

// Add medicine feedback
export const medicineFeedback = Array.from({ length: 15 }, (_, i) => ({
  id: `medicine-feedback-${i + 1}`,
  medicineId: `medicine-${Math.floor(Math.random() * 30) + 1}`,
  userId: `user-${Math.floor(Math.random() * 10) + 1}`,
  userName: ["Jane Smith", "John Doe", "Alice Johnson", "Bob Brown", "Charlie Davis"][Math.floor(Math.random() * 5)],
  rating: Math.floor(Math.random() * 5) + 1,
  comment: [
    "This medication worked very well for me!",
    "Great value for the price, helped with my symptoms.",
    "Effective but had some minor side effects.",
    "I've been using this for years, highly recommend.",
    "Did not work as well as expected.",
    "Fast relief, exactly as described.",
    "Good medicine but the taste is unpleasant.",
    "This helped my condition significantly.",
    "Better than other similar medications I've tried.",
    "Doctor recommended this and it's been excellent."
  ][Math.floor(Math.random() * 10)],
  date: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
}));
