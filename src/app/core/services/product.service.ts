import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductType } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.example.com/products';

  private mockProducts: Product[] = [
    // Auction Items
    {
      id: '1',
      title: 'Vintage Rolex Watch',
      description: 'A rare 1956 Rolex Submariner in excellent condition with original box and papers.',
      type: 'bid',
      price: 500000,
      currentBid: 550000,
      imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
      location: 'Mumbai, Maharashtra',
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      seller: {
        id: 'seller1',
        name: 'Luxury Timepieces'
      },
      category: 'Watches',
      condition: 'Excellent',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Antique Mahogany Cabinet',
      description: 'Handcrafted 19th-century cabinet with intricate carvings and brass handles.',
      type: 'bid',
      price: 250000,
      currentBid: 280000,
      imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500',
      location: 'Delhi, NCR',
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller2',
        name: 'Antique Collection'
      },
      category: 'Furniture',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Classic Car - 1967 Mustang',
      description: 'Fully restored Ford Mustang with original parts and custom paint job.',
      type: 'bid',
      price: 1500000,
      currentBid: 1650000,
      imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500',
      location: 'Bangalore, Karnataka',
      endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller3',
        name: 'Classic Cars India'
      },
      category: 'Vehicles',
      condition: 'Restored',
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Rare Coin Collection',
      description: 'Set of 50 rare coins from British India era, including some gold coins.',
      type: 'bid',
      price: 750000,
      currentBid: 800000,
      imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500',
      location: 'Chennai, Tamil Nadu',
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller4',
        name: 'Numismatic Collection'
      },
      category: 'Collectibles',
      condition: 'Excellent',
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Vintage Camera Collection',
      description: 'Collection of 10 vintage cameras including Leica, Nikon, and Canon models.',
      type: 'bid',
      price: 450000,
      currentBid: 480000,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      location: 'Kolkata, West Bengal',
      endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller5',
        name: 'Vintage Cameras'
      },
      category: 'Cameras',
      condition: 'Good',
      createdAt: new Date()
    },
    // Buy Now Items
    {
      id: '6',
      title: 'Smartphone - iPhone 15 Pro',
      description: 'Brand new iPhone 15 Pro 256GB with warranty and accessories.',
      type: 'resell',
      price: 95000,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
      location: 'Hyderabad, Telangana',
      seller: {
        id: 'seller6',
        name: 'Tech Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '7',
      title: 'Gaming Laptop',
      description: 'High-performance gaming laptop with RTX 4080, 32GB RAM, 1TB SSD.',
      type: 'resell',
      price: 125000,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
      location: 'Pune, Maharashtra',
      seller: {
        id: 'seller7',
        name: 'Gaming Zone'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '8',
      title: 'Professional Camera Kit',
      description: 'Sony A7III with 3 premium lenses and accessories.',
      type: 'resell',
      price: 180000,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      location: 'Ahmedabad, Gujarat',
      seller: {
        id: 'seller8',
        name: 'Camera World'
      },
      category: 'Cameras',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '9',
      title: 'Mountain Bike',
      description: 'Premium mountain bike with 21 gears and hydraulic brakes.',
      type: 'resell',
      price: 45000,
      imageUrl: 'https://images.unsplash.com/photo-1532294220147-279399e7e00b?w=500',
      location: 'Jaipur, Rajasthan',
      seller: {
        id: 'seller9',
        name: 'Sports Zone'
      },
      category: 'Sports',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '10',
      title: 'Smart Watch',
      description: 'Latest Apple Watch Series 9 with cellular connectivity.',
      type: 'resell',
      price: 45000,
      imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
      location: 'Chandigarh, Punjab',
      seller: {
        id: 'seller10',
        name: 'Tech Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    // Donation Items
    {
      id: '11',
      title: 'Children\'s Books Collection',
      description: 'Set of 50 educational books for children aged 5-12 years.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500',
      location: 'Mumbai, Maharashtra',
      seller: {
        id: 'seller11',
        name: 'Education Foundation'
      },
      category: 'Books',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '12',
      title: 'School Bags',
      description: '50 new school bags with water bottles and lunch boxes.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      location: 'Delhi, NCR',
      seller: {
        id: 'seller12',
        name: 'Care Foundation'
      },
      category: 'School Supplies',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '13',
      title: 'Winter Clothing',
      description: '100 pieces of warm winter clothing including jackets and sweaters.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500',
      location: 'Bangalore, Karnataka',
      seller: {
        id: 'seller13',
        name: 'Warm Hearts'
      },
      category: 'Clothing',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '14',
      title: 'Medical Supplies',
      description: 'First aid kits and basic medical supplies for community health centers.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092092a831?w=500',
      location: 'Chennai, Tamil Nadu',
      seller: {
        id: 'seller14',
        name: 'Health Foundation'
      },
      category: 'Medical',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '15',
      title: 'Sports Equipment',
      description: 'Various sports equipment including balls, bats, and protective gear.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500',
      location: 'Kolkata, West Bengal',
      seller: {
        id: 'seller15',
        name: 'Sports Foundation'
      },
      category: 'Sports',
      condition: 'Good',
      createdAt: new Date()
    },
    // More Auction Items
    {
      id: '16',
      title: 'Vintage Vinyl Records',
      description: 'Collection of 100 rare vinyl records from the 60s and 70s.',
      type: 'bid',
      price: 35000,
      currentBid: 38000,
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
      location: 'Hyderabad, Telangana',
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller16',
        name: 'Music Collectors'
      },
      category: 'Music',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '17',
      title: 'Antique Jewelry Set',
      description: 'Complete set of traditional Indian jewelry from the royal era.',
      type: 'bid',
      price: 850000,
      currentBid: 900000,
      imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7e030031d8?w=500',
      location: 'Pune, Maharashtra',
      endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller17',
        name: 'Royal Heritage'
      },
      category: 'Jewelry',
      condition: 'Excellent',
      createdAt: new Date()
    },
    {
      id: '18',
      title: 'Vintage Typewriter',
      description: 'Fully functional 1950s typewriter with original case.',
      type: 'bid',
      price: 15000,
      currentBid: 16500,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      location: 'Ahmedabad, Gujarat',
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller18',
        name: 'Vintage Collectors'
      },
      category: 'Collectibles',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '19',
      title: 'Classic Motorcycle',
      description: 'Restored 1970s Royal Enfield Bullet with original parts.',
      type: 'bid',
      price: 95000,
      currentBid: 100000,
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500',
      location: 'Jaipur, Rajasthan',
      endTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller19',
        name: 'Classic Bikes'
      },
      category: 'Vehicles',
      condition: 'Restored',
      createdAt: new Date()
    },
    {
      id: '20',
      title: 'Antique Furniture Set',
      description: 'Complete set of teak wood furniture from colonial era.',
      type: 'bid',
      price: 120000,
      currentBid: 125000,
      imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500',
      location: 'Chandigarh, Punjab',
      endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller20',
        name: 'Antique Collection'
      },
      category: 'Furniture',
      condition: 'Good',
      createdAt: new Date()
    },
    // More Buy Now Items
    {
      id: '21',
      title: 'Smart TV',
      description: '55-inch 4K Smart TV with built-in streaming apps.',
      type: 'resell',
      price: 65000,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      location: 'Mumbai, Maharashtra',
      seller: {
        id: 'seller21',
        name: 'Electronics Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '22',
      title: 'Gaming Console',
      description: 'Latest PlayStation 5 with 2 controllers and 3 games.',
      type: 'resell',
      price: 55000,
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86a9b56b911?w=500',
      location: 'Delhi, NCR',
      seller: {
        id: 'seller22',
        name: 'Gaming Zone'
      },
      category: 'Gaming',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '23',
      title: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
      type: 'resell',
      price: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      location: 'Bangalore, Karnataka',
      seller: {
        id: 'seller23',
        name: 'Tech Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '24',
      title: 'Tablet',
      description: '12.9-inch iPad Pro with Apple Pencil and keyboard case.',
      type: 'resell',
      price: 85000,
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      location: 'Chennai, Tamil Nadu',
      seller: {
        id: 'seller24',
        name: 'Tech Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '25',
      title: 'Smart Home System',
      description: 'Complete smart home system with voice control and automation.',
      type: 'resell',
      price: 75000,
      imageUrl: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500',
      location: 'Kolkata, West Bengal',
      seller: {
        id: 'seller25',
        name: 'Smart Home Solutions'
      },
      category: 'Smart Home',
      condition: 'New',
      createdAt: new Date()
    },
    // More Donation Items
    {
      id: '26',
      title: 'Educational Toys',
      description: 'Collection of educational toys and learning materials for children.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500',
      location: 'Hyderabad, Telangana',
      seller: {
        id: 'seller26',
        name: 'Education Foundation'
      },
      category: 'Toys',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '27',
      title: 'Art Supplies',
      description: 'Complete set of art supplies for school art programs.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
      location: 'Pune, Maharashtra',
      seller: {
        id: 'seller27',
        name: 'Art Foundation'
      },
      category: 'Art Supplies',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '28',
      title: 'Computer Lab Setup',
      description: '10 refurbished computers with basic software for educational institutions.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
      location: 'Ahmedabad, Gujarat',
      seller: {
        id: 'seller28',
        name: 'Tech Education'
      },
      category: 'Electronics',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '29',
      title: 'Library Books',
      description: '500 books covering various subjects for community library.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500',
      location: 'Jaipur, Rajasthan',
      seller: {
        id: 'seller29',
        name: 'Education Foundation'
      },
      category: 'Books',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '30',
      title: 'Musical Instruments',
      description: 'Set of basic musical instruments for school music programs.',
      type: 'donation',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
      location: 'Chandigarh, Punjab',
      seller: {
        id: 'seller30',
        name: 'Music Foundation'
      },
      category: 'Music',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '31',
      title: 'Luxury Handbag',
      description: 'Designer handbag made from premium leather.',
      type: 'resell',
      price: 120000,
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500',
      location: 'Mumbai, Maharashtra',
      seller: {
        id: 'seller31',
        name: 'Fashion Boutique'
      },
      category: 'Fashion',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '32',
      title: 'Electric Guitar',
      description: 'High-quality electric guitar with amplifier and accessories.',
      type: 'resell',
      price: 75000,
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
      location: 'Delhi, NCR',
      seller: {
        id: 'seller32',
        name: 'Music Store'
      },
      category: 'Music',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '33',
      title: 'Mountain Tent',
      description: 'Durable and spacious tent for mountain expeditions.',
      type: 'resell',
      price: 30000,
      imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500',
      location: 'Bangalore, Karnataka',
      seller: {
        id: 'seller33',
        name: 'Outdoor Gear'
      },
      category: 'Outdoor',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '34',
      title: 'Designer Sunglasses',
      description: 'Stylish sunglasses with UV protection.',
      type: 'resell',
      price: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500',
      location: 'Chennai, Tamil Nadu',
      seller: {
        id: 'seller34',
        name: 'Fashion Boutique'
      },
      category: 'Fashion',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '35',
      title: 'Fitness Tracker',
      description: 'Advanced fitness tracker with heart rate monitor and GPS.',
      type: 'resell',
      price: 10000,
      imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
      location: 'Hyderabad, Telangana',
      seller: {
        id: 'seller35',
        name: 'Tech Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '36',
      title: 'Leather Jacket',
      description: 'Premium leather jacket with a stylish design.',
      type: 'resell',
      price: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500',
      location: 'Pune, Maharashtra',
      seller: {
        id: 'seller36',
        name: 'Fashion Boutique'
      },
      category: 'Fashion',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '37',
      title: 'Smartphone - Samsung Galaxy S21',
      description: 'Brand new Samsung Galaxy S21 with 128GB storage.',
      type: 'resell',
      price: 70000,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
      location: 'Ahmedabad, Gujarat',
      seller: {
        id: 'seller37',
        name: 'Tech Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '38',
      title: 'Gaming Chair',
      description: 'Ergonomic gaming chair with adjustable features.',
      type: 'resell',
      price: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
      location: 'Jaipur, Rajasthan',
      seller: {
        id: 'seller38',
        name: 'Gaming Zone'
      },
      category: 'Furniture',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '39',
      title: 'Digital Camera',
      description: 'High-resolution digital camera with 4K video recording.',
      type: 'resell',
      price: 60000,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      location: 'Chandigarh, Punjab',
      seller: {
        id: 'seller39',
        name: 'Camera World'
      },
      category: 'Cameras',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '40',
      title: 'Electric Scooter',
      description: 'Eco-friendly electric scooter with a range of 50 km.',
      type: 'resell',
      price: 40000,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      location: 'Mumbai, Maharashtra',
      seller: {
        id: 'seller40',
        name: 'Eco Rides'
      },
      category: 'Vehicles',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '41',
      title: 'Luxury Watch',
      description: 'High-end luxury watch with diamond accents.',
      type: 'bid',
      price: 500000,
      currentBid: 550000,
      imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
      location: 'Delhi, NCR',
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller41',
        name: 'Luxury Timepieces'
      },
      category: 'Watches',
      condition: 'Excellent',
      createdAt: new Date()
    },
    {
      id: '42',
      title: 'Antique Vase',
      description: 'Beautiful antique vase from the Ming dynasty.',
      type: 'bid',
      price: 200000,
      currentBid: 220000,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      location: 'Bangalore, Karnataka',
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller42',
        name: 'Antique Collection'
      },
      category: 'Collectibles',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '43',
      title: 'Classic Car - 1969 Camaro',
      description: 'Fully restored 1969 Chevrolet Camaro with original parts.',
      type: 'bid',
      price: 1500000,
      currentBid: 1650000,
      imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500',
      location: 'Chennai, Tamil Nadu',
      endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller43',
        name: 'Classic Cars India'
      },
      category: 'Vehicles',
      condition: 'Restored',
      createdAt: new Date()
    },
    {
      id: '44',
      title: 'Rare Book Collection',
      description: 'Set of 100 rare books from the 18th century.',
      type: 'bid',
      price: 750000,
      currentBid: 800000,
      imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500',
      location: 'Kolkata, West Bengal',
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller44',
        name: 'Rare Books'
      },
      category: 'Books',
      condition: 'Excellent',
      createdAt: new Date()
    },
    {
      id: '45',
      title: 'Vintage Bicycle',
      description: 'Restored vintage bicycle with original parts.',
      type: 'bid',
      price: 45000,
      currentBid: 48000,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      location: 'Hyderabad, Telangana',
      endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller45',
        name: 'Vintage Bikes'
      },
      category: 'Vehicles',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '46',
      title: 'Antique Clock',
      description: 'Beautiful antique clock from the Victorian era.',
      type: 'bid',
      price: 150000,
      currentBid: 165000,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      location: 'Pune, Maharashtra',
      endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller46',
        name: 'Antique Collection'
      },
      category: 'Collectibles',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '47',
      title: 'Vintage Motorcycle',
      description: 'Restored 1970s Harley Davidson with original parts.',
      type: 'bid',
      price: 95000,
      currentBid: 100000,
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500',
      location: 'Ahmedabad, Gujarat',
      endTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller47',
        name: 'Classic Bikes'
      },
      category: 'Vehicles',
      condition: 'Restored',
      createdAt: new Date()
    },
    {
      id: '48',
      title: 'Antique Furniture Set',
      description: 'Complete set of teak wood furniture from colonial era.',
      type: 'bid',
      price: 120000,
      currentBid: 125000,
      imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500',
      location: 'Chandigarh, Punjab',
      endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'seller48',
        name: 'Antique Collection'
      },
      category: 'Furniture',
      condition: 'Good',
      createdAt: new Date()
    },
    {
      id: '49',
      title: 'Smart TV',
      description: '55-inch 4K Smart TV with built-in streaming apps.',
      type: 'resell',
      price: 65000,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      location: 'Mumbai, Maharashtra',
      seller: {
        id: 'seller49',
        name: 'Electronics Store'
      },
      category: 'Electronics',
      condition: 'New',
      createdAt: new Date()
    },
    {
      id: '50',
      title: 'Gaming Console',
      description: 'Latest PlayStation 5 with 2 controllers and 3 games.',
      type: 'resell',
      price: 55000,
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86a9b56b911?w=500',
      location: 'Delhi, NCR',
      seller: {
        id: 'seller50',
        name: 'Gaming Zone'
      },
      category: 'Gaming',
      condition: 'New',
      createdAt: new Date()
    }
  ];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts); // Use mock data for development
  }

  getProduct(id: string): Observable<Product | undefined> {
    return of(this.mockProducts.find(product => product.id === id));
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?search=${query}`);
  }
}