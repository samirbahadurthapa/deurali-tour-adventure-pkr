import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import TrekPackage from '../models/TrekPackage.js';
import Vehicle from '../models/Vehicle.js';
import Testimonial from '../models/Testimonial.js';
import Gallery from '../models/Gallery.js';
import Booking from '../models/Booking.js';
import Inquiry from '../models/Inquiry.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

const samplePackages = [
  {
    name: 'Muktinath Tour',
    shortDescription: 'A 1 Night 2 Days pilgrimage & mountain road trip to the sacred Muktinath Temple.',
    description: 'Travel by private jeep from Pokhara through the dramatic Kali Gandaki gorge, the deepest gorge in the world, up to the sacred Muktinath Temple (3,710m) in Mustang. This route is best covered by a 4x4 jeep given the rugged mountain roads. Along the way you will pass Jomsom, Marpha\'s apple orchards, and stark high-altitude desert scenery before reaching the temple, revered by both Hindus and Buddhists.',
    duration: 2,
    price: 14500,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    location: 'Mustang, via Jomsom',
    difficulty: 'Jeep (Mahindra Scorpio)',
    highlights: [
      'Private Scorpio jeep with an experienced mountain driver',
      'Drive through the world\'s deepest gorge, Kali Gandaki',
      'Visit the sacred 108 water spouts and eternal flame at Muktinath Temple',
      'Stop in Jomsom and Marpha for apple orchards and local brandy',
      'Overnight stay included in Jomsom/Muktinath'
    ],
    itinerary: [
      { day: 1, title: 'Pokhara to Muktinath by Jeep', description: 'Early morning departure from Pokhara. Drive along the Kali Gandaki riverbed via Beni, Tatopani, Jomsom, and Kagbeni, arriving in Muktinath by afternoon. Visit the temple complex and overnight near Muktinath.' },
      { day: 2, title: 'Muktinath to Pokhara', description: 'Morning temple visit for those who missed it the day before, then drive back to Pokhara, stopping at scenic viewpoints and Marpha village along the way.' }
    ],
    maxGroupSize: 7,
    bestSeason: ['Spring', 'Autumn'],
    rating: 4.9
  },
  {
    name: 'Pokhara Sightseeing Tour',
    shortDescription: 'A full-day private car tour covering Pokhara\'s best lakes, caves, and viewpoints.',
    description: 'Explore Pokhara at your own pace in a comfortable private car. This full-day sightseeing tour covers the city\'s most-loved spots including Phewa Lake, the Peace Pagoda, Davis Falls, Gupteshwor Cave, and the International Mountain Museum, with a sunrise option at Sarangkot for panoramic Annapurna views.',
    duration: 1,
    price: 4500,
    image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=1200&q=80',
    location: 'Pokhara Valley',
    difficulty: 'Sedan (Hyundai Creta)',
    highlights: [
      'Sunrise mountain views from Sarangkot (optional add-on)',
      'Boating on the serene Phewa Lake',
      'Visit the World Peace Pagoda',
      'Explore Davis Falls and Gupteshwor Mahadev Cave',
      'Comfortable AC sedan with a local driver-guide'
    ],
    itinerary: [
      { day: 1, title: 'Full Day Pokhara City & Lake Tour', description: 'Pickup from your hotel, drive up to Sarangkot for mountain views, then visit Phewa Lake, World Peace Pagoda, Davis Falls, Gupteshwor Cave, and the International Mountain Museum before drop-off in the evening.' }
    ],
    maxGroupSize: 4,
    bestSeason: ['Autumn', 'Spring', 'Winter'],
    rating: 4.8
  },
  {
    name: 'Kathmandu City Explorer',
    shortDescription: 'A full-day guided car tour through Kathmandu\'s UNESCO World Heritage sites.',
    description: 'Discover the cultural heart of Nepal with a private car tour of Kathmandu Valley\'s most iconic UNESCO World Heritage Sites, including Kathmandu Durbar Square, the Boudhanath Stupa, Pashupatinath Temple, and Swayambhunath (Monkey Temple). Ideal for visitors with a stopover in Kathmandu or looking to explore the capital in a single day.',
    duration: 1,
    price: 6500,
    image: 'https://images.unsplash.com/photo-1582578598191-c12185749f06?auto=format&fit=crop&w=1200&q=80',
    location: 'Kathmandu Valley',
    difficulty: 'Sedan (Hyundai Creta)',
    highlights: [
      'Kathmandu Durbar Square, a UNESCO World Heritage Site',
      'Boudhanath Stupa, one of the largest stupas in the world',
      'Pashupatinath Temple, the holiest Hindu shrine in Nepal',
      'Swayambhunath Stupa (Monkey Temple) with panoramic valley views',
      'Knowledgeable driver familiar with the valley\'s history'
    ],
    itinerary: [
      { day: 1, title: 'Kathmandu Valley Heritage Tour', description: 'Pickup from your hotel, visit Swayambhunath, Kathmandu Durbar Square, Pashupatinath Temple, and Boudhanath Stupa, with stops for lunch and shopping in Thamel before drop-off.' }
    ],
    maxGroupSize: 4,
    bestSeason: ['Autumn', 'Spring', 'Winter'],
    rating: 4.7
  },
  {
    name: 'Chitwan Tour',
    shortDescription: 'A 2 Days 1 Night jungle safari getaway to Chitwan National Park.',
    description: 'Escape to the subtropical lowlands of Chitwan National Park, a UNESCO World Heritage Site and one of Asia\'s best wildlife destinations. Travel by private jeep from Pokhara, enjoy jungle activities like canoeing, jungle walks, and wildlife spotting (one-horned rhinos, deer, and if lucky, Bengal tigers), and experience Tharu village culture.',
    duration: 2,
    price: 13500,
    image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1200&q=80',
    location: 'Chitwan National Park',
    difficulty: 'Both Available',
    highlights: [
      'Jungle safari in search of one-horned rhinos and wildlife',
      'Canoe ride on the Rapti River',
      'Guided jungle walk with a naturalist',
      'Tharu village and cultural stick dance show',
      'Comfortable resort stay with meals included'
    ],
    itinerary: [
      { day: 1, title: 'Pokhara to Chitwan', description: 'Morning departure from Pokhara, arrive in Chitwan by midday, check in to your resort. Afternoon canoe ride and guided jungle walk followed by a Tharu cultural show in the evening.' },
      { day: 2, title: 'Jungle Safari & Return to Pokhara', description: 'Early morning jeep or elephant-back jungle safari to spot wildlife. After breakfast, drive back to Pokhara, arriving by evening.' }
    ],
    maxGroupSize: 7,
    bestSeason: ['Autumn', 'Winter', 'Spring'],
    rating: 4.8
  }
];

const sampleVehicles = [
  {
    name: 'Hyundai Creta',
    type: 'Sedan',
    seats: 4,
    luggage: '2 Large Bags',
    driverIncluded: true,
    ac: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    features: ['Ideal for city & valley sightseeing', 'Comfortable for up to 4 passengers', 'Experienced local driver']
  },
  {
    name: 'Toyota Rav4',
    type: 'SUV',
    seats: 5,
    luggage: '3 Large Bags',
    driverIncluded: true,
    ac: true,
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1000&q=80',
    features: ['Extra ground clearance for hill roads', 'Great for family & group travel', 'Comfortable for up to 5 passengers']
  },
  {
    name: 'Mahindra Scorpio',
    type: 'Jeep',
    seats: 7,
    luggage: '4 Large Bags',
    driverIncluded: true,
    ac: true,
    image: 'https://images.unsplash.com/photo-1710225358761-4f5891df657d?auto=format&fit=crop&w=1000&q=80',
    features: ['Built for mountain & off-road terrain', 'Ideal for Muktinath & Chitwan routes', 'Comfortable for up to 7 passengers']
  },
  {
    name: 'Toyota Hiace',
    type: 'Hiace',
    seats: 12,
    luggage: '8 Large Bags',
    driverIncluded: true,
    ac: true,
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
    features: ['Best for group tours & corporate travel', 'Spacious cabin with ample legroom', 'Comfortable for up to 12 passengers']
  },
  {
    name: 'Premium Sedan',
    type: 'Luxury Vehicle',
    seats: 4,
    luggage: '3 Large Bags',
    driverIncluded: true,
    ac: true,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    features: ['Premium interior & extra comfort', 'Ideal for VIP & business travel', 'Professional uniformed driver']
  }
];

const sampleTestimonials = [
  {
    clientName: 'Sarah Jenkins',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Booked the Muktinath jeep tour with Deurali on very short notice and they picked us up within the hour. The Scorpio was clean, the driver knew every turn of the mountain road, and the whole trip felt completely safe.',
    trekName: 'Muktinath Tour',
    country: 'United Kingdom'
  },
  {
    clientName: 'David Mueller',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'We used the Pokhara Sightseeing Tour for our stopover and it covered everything we wanted to see. The Creta was spotless and air-conditioned, and our driver adjusted the route for us without any hassle.',
    trekName: 'Pokhara Sightseeing Tour',
    country: 'Germany'
  },
  {
    clientName: 'Elena Rostova',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Called for an instant cab at 11pm to get to the airport and a car showed up in fifteen minutes. Also did the Chitwan tour with them the week before, great value for the safari and the drive both.',
    trekName: 'Chitwan Tour',
    country: 'Russia'
  }
];

const sampleGallery = [
  {
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    title: 'Kali Gandaki Gorge on the way to Muktinath',
    category: 'sightseeing',
    location: 'Mustang'
  },
  {
    url: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=800&q=80',
    title: 'Mountain road near Jomsom',
    category: 'adventure',
    location: 'Mustang Region'
  },
  {
    url: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=800&q=80',
    title: 'Phewa Lake Pokhara',
    category: 'sightseeing',
    location: 'Pokhara'
  },
  {
    url: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80',
    title: 'Chitwan National Park Safari',
    category: 'wildlife',
    location: 'Chitwan'
  },
  {
    url: 'https://images.unsplash.com/photo-1582578598191-c12185749f06?auto=format&fit=crop&w=800&q=80',
    title: 'Boudhanath Stupa',
    category: 'culture',
    location: 'Kathmandu'
  },
  {
    url: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80',
    title: 'Prayer Flags in Mountains',
    category: 'culture',
    location: 'Manang'
  },
  {
    url: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80',
    title: 'Himalayan Panorama',
    category: 'nature',
    location: 'Annapurna Region'
  },
  {
    url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    title: 'Annapurna Foothills Drive',
    category: 'nature',
    location: 'Annapurna Region'
  }
];

const writeSeedDataToJSONFiles = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const pkgWithIds = samplePackages.map((p, idx) => ({ _id: `pkg_${idx + 1}`, ...p }));
  const vehicleWithIds = sampleVehicles.map((v, idx) => ({ _id: `vehicle_${idx + 1}`, ...v }));
  const testWithIds = sampleTestimonials.map((t, idx) => ({ _id: `test_${idx + 1}`, ...t }));
  const galWithIds = sampleGallery.map((g, idx) => ({ _id: `gal_${idx + 1}`, ...g }));

  fs.writeFileSync(path.join(DATA_DIR, 'trekpackages.json'), JSON.stringify(pkgWithIds, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'vehicles.json'), JSON.stringify(vehicleWithIds, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'testimonials.json'), JSON.stringify(testWithIds, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'gallerys.json'), JSON.stringify(galWithIds, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'bookings.json'), JSON.stringify([], null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'inquirys.json'), JSON.stringify([], null, 2));
  
  console.log('Successfully seeded local JSON files under backend/data/');
};

const runSeeder = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deurali_db';
    console.log(`Attempting connection to seed MongoDB at: ${connStr}`);
    
    // Connect with a fast timeout
    await mongoose.connect(connStr, { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB Connected. Clearing and seeding database...');

    // Clear existing data
    await TrekPackage.deleteMany({});
    await Vehicle.deleteMany({});
    await Testimonial.deleteMany({});
    await Gallery.deleteMany({});
    await Booking.deleteMany({});
    await Inquiry.deleteMany({});

    // Mongoose Seeding
    await TrekPackage.insertMany(samplePackages);
    await Vehicle.insertMany(sampleVehicles);
    await Testimonial.insertMany(sampleTestimonials);
    await Gallery.insertMany(sampleGallery);

    console.log('Successfully seeded MongoDB collections.');
    mongoose.connection.close();
  } catch (error) {
    console.log(`\n⚠️  MongoDB connection failed: ${error.message}`);
    console.log('🟢 Seeding JSON files under backend/data/ for local standalone dev mode...');
    writeSeedDataToJSONFiles();
  }
};

runSeeder();
