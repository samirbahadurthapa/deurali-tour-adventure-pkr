import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import samplePackages from './data/packages.js';
import sampleVehicles from './data/vehicles.js';
import sampleTestimonials from './data/testimonials.js';
import sampleGallery from './data/gallery.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

export const writeSeedDataToJSONFiles = () => {
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

export default writeSeedDataToJSONFiles;
