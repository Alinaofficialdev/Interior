const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slugify = require('slugify');

dotenv.config({ path: __dirname + '/../../.env' });

const User = require('../models/User');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Review = require('../models/Review');
const Partner = require('../models/Partner');
const DesignStyle = require('../models/DesignStyle');
const SiteSetting = require('../models/SiteSetting');
const Lead = require('../models/Lead');
const Quote = require('../models/Quote');

const servicesData = [
  { name: 'Villa Renovation', category: 'Renovation', shortDescription: 'Complete villa architectural redesign and interior transformations across Dubai.', description: 'Luxury villa fit-out, structural modification, pool deck integration, and high-end finishing tailored for Palm Jumeirah, Emirates Hills, and Dubai Hills.', features: ['Custom Joinery & Millwork', 'Structural Modifications', 'Smart Home Integration', 'Landscape & Pool Integration'], heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', displayOrder: 1 },
  { name: 'Full Home Renovation', category: 'Renovation', shortDescription: 'End-to-end residential fit-out and refurbishment for luxury apartments and penthouses.', description: 'Comprehensive apartment transformations including MEP, flooring, bespoke cabinetry, and ceiling lighting.', features: ['Turnkey Design & Execution', 'Bespoke Furniture', 'Spatial Planning', 'Authority Approvals (DDA / Dubai Municipality)'], heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', displayOrder: 2 },
  { name: 'Kitchen Renovation', category: 'Joinery & Fit-out', shortDescription: 'Custom German & Italian style kitchens with sintered stone worktops.', description: 'Ergonomic luxury kitchens with soft-close Blum hardware, integrated Miele appliances, and custom marble waterfalls.', features: ['Quartz & Marble Countertops', 'Custom Cabinetry', 'Integrated Lighting', 'Appliance Integration'], heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80', displayOrder: 3 },
  { name: 'Bathroom Renovation', category: 'Joinery & Fit-out', shortDescription: 'Spa-inspired master bathroom fit-outs with bookmatched Italian porcelain.', description: 'Transform your bathroom into a luxury retreat featuring freestanding tubs, concealed rain showers, and heated anti-fog mirrors.', features: ['Italian Large-Format Porcelain', 'Rain Showers & Concealed Valves', 'Custom Vanities', 'Waterproofing Certification'], heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80', displayOrder: 4 },
  { name: 'Bespoke Joinery', category: 'Joinery & Fit-out', shortDescription: 'In-house custom cabinetry, walk-in closets, and feature wood paneling.', description: 'Crafted in our Dubai factory with premium veneers, solid oak, brass inlay, and integrated LED accent lighting.', features: ['Custom Walk-in Wardrobes', 'TV & Media Wall Units', 'Fluted Wood Panels', 'Concealed Storage Solutions'], heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', displayOrder: 5 },
  { name: 'Microcement', category: 'Specialty Finishes', shortDescription: 'Seamless jointless microcement flooring and wall finishes for modern Japandi interiors.', description: 'Minimalist continuous microcement application ideal for bathrooms, living spaces, and commercial showrooms.', features: ['Seamless & Waterproof', 'Tactile Textured Finish', 'High Mechanical Resistance', 'Custom Color Palette'], heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', displayOrder: 6 },
  { name: 'Terrazzo', category: 'Specialty Finishes', shortDescription: 'Custom poured or tile terrazzo flooring for timeless elegance.', description: 'Artisanal terrazzo with marble aggregate and mother-of-pearl chips for luxury residential and retail spaces.', features: ['Custom Aggregate Blends', 'High Durability', 'Polished Satin Finish'], heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', displayOrder: 7 },
  { name: 'MEP & HVAC', category: 'Engineering', shortDescription: 'Complete Mechanical, Electrical & Plumbing ducting and AC upgrades.', description: 'DEWA-compliant electrical engineering, quiet linear diffuser AC ducting, and eco-smart climate control systems.', features: ['Linear Slot Diffusers', 'DEWA & Civil Defence Compliance', 'Smart Thermostat Integration'], heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80', displayOrder: 8 },
  { name: 'Property Inspection', category: 'Inspection', shortDescription: 'Comprehensive architectural and technical snagging inspections across Dubai.', description: 'Thermal imaging, acoustic testing, humidity analysis, and detailed PDF snagging report for handover properties.', features: ['Thermal Imaging Camera', 'MEP & HVAC Audit', 'Comprehensive PDF Snag List'], heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', displayOrder: 9 }
];

const projectsData = [
  {
    title: 'Palm Jumeirah Signature Villa',
    category: 'Residential',
    location: 'Palm Jumeirah, Dubai',
    scope: 'Full Villa Structural Renovation & Bespoke Joinery',
    duration: '16 Weeks',
    description: 'A complete architectural transformation of a Frond villa on Palm Jumeirah featuring open-plan living, custom walnut joinery, microcement master suite, and infinity pool view windows.',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImages: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
    afterImages: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
    isFeatured: true,
    isPublished: true
  },
  {
    title: 'Downtown Dubai Executive Penthouse',
    category: 'Residential',
    location: 'Downtown Dubai',
    scope: 'Turnkey Penthouse Interior & Smart Automation',
    duration: '12 Weeks',
    description: 'Ultra luxury modern minimalist penthouse facing Burj Khalifa with bookmatched Calacatta marble walls, concealed linear AC diffusers, and Lutron lighting control.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImages: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'],
    afterImages: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'],
    isFeatured: true,
    isPublished: true
  },
  {
    title: 'Dubai Hills Estate Modern Residence',
    category: 'Residential',
    location: 'Dubai Hills Estate',
    scope: 'Japandi Style Interior Fit-out & Garden Lounge',
    duration: '14 Weeks',
    description: 'Warm Japandi aesthetics combining oak slatted walls, microcement floors, and custom curved furniture created for a modern Dubai family.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImages: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'],
    afterImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    isFeatured: true,
    isPublished: true
  },
  {
    title: 'DIFC Financial Tower Corporate HQ',
    category: 'Commercial',
    location: 'DIFC Gate Precinct',
    scope: 'Commercial Fit-out & Executive Boardrooms',
    duration: '10 Weeks',
    description: 'High-performance commercial office space featuring acoustic glass partitions, brass accents, custom reception counter, and ergonomic lounge stations.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'],
    isFeatured: true,
    isPublished: true
  }
];

const designStylesData = [
  { name: 'Japandi', description: 'Harmonious blend of Japanese wabi-sabi functionalism and Scandinavian hygge warmth, characterized by clean lines, natural wood, and muted earthy textures.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', characteristics: ['Natural Oak & Bamboo', 'Microcement & Lime Wash', 'Low-profile Furniture', 'Organic Earthy Tones'] },
  { name: 'Arabian Modern', description: 'Contemporary interpretation of traditional Middle Eastern motifs, featuring mashrabiya geometric screens, warm brass inlay, and rich velvet accents.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', characteristics: ['Mashrabiya Geometry', 'Warm Brass & Copper', 'Plush Silk & Velvet', 'Ambient Recessed Lighting'] },
  { name: 'Neoclassical', description: 'Timeless luxury with ornate wall moldings, crystal chandeliers, symmetric paneling, and polished marble flooring.', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', characteristics: ['Wainscoting & Moldings', 'Italian Marble', 'Symmetrical Layouts', 'Gold Accent Detailing'] },
  { name: 'Contemporary', description: 'Sleek, current aesthetic featuring bold architectural lines, open floor plans, integrated LED strip lights, and neutral palettes.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', characteristics: ['Open Concept Layouts', 'Monochromatic Base', 'Concealed Tech Integration', 'Glass & Metal Elements'] },
  { name: 'Mediterranean', description: 'Sun-drenched villa styling with arched doorways, terracotta tiles, whitewashed walls, and wrought-iron detailing.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', characteristics: ['Arch Architectural Entrances', 'Terracotta & Stone', 'Textured Plaster Walls', 'Verdant Indoor Plants'] }
];

const reviewsData = [
  { customerName: 'Tareq Al-Maktoum', rating: 5, reviewText: 'Aura Interiors transformed our Palm Jumeirah villa beyond expectations. Their joinery work and attention to detail during the 16-week project was flawless.', source: 'Google Review', isFeatured: true, isPublished: true },
  { customerName: 'Sophie Van Der Berg', rating: 5, reviewText: 'The Japandi renovation of our penthouse in Downtown Dubai was handled with utmost professionalism. Highly recommended for turnkey Dubai fit-outs.', source: 'Google Review', isFeatured: true, isPublished: true },
  { customerName: 'Marcus Sterling', rating: 5, reviewText: 'Exceptional property inspection and renovation execution. They managed all DDA approvals seamlessly without delay.', source: 'Google Review', isFeatured: true, isPublished: true }
];

const partnersData = [
  { name: 'Emaar Properties', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80', displayOrder: 1, isActive: true },
  { name: 'Nakheel', logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=300&q=80', displayOrder: 2, isActive: true },
  { name: 'Sobha Realty', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80', displayOrder: 3, isActive: true },
  { name: 'Meraas', logo: 'https://images.unsplash.com/photo-1542744100-8478652476fd?auto=format&fit=crop&w=300&q=80', displayOrder: 4, isActive: true }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interior_db');
    console.log('Database connected for seeding...');

    await User.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await Review.deleteMany();
    await Partner.deleteMany();
    await DesignStyle.deleteMany();
    await SiteSetting.deleteMany();

    // Create Default Admin & Editor
    const adminUser = await User.create({
      name: 'Dubai Admin Specialist',
      email: 'admin@interior.ae',
      password: 'Admin@2026!',
      role: 'admin',
      status: 'active'
    });

    await User.create({
      name: 'Fatima Al-Sayed (Lead Editor)',
      email: 'editor@interior.ae',
      password: 'Editor@2026!',
      role: 'editor',
      status: 'active'
    });

    console.log('Created Admin User: admin@interior.ae / Admin@2026!');

    // Seed Services
    for (const item of servicesData) {
      item.slug = slugify(item.name, { lower: true, strict: true });
      await Service.create(item);
    }
    console.log(`Seeded ${servicesData.length} Services.`);

    // Seed Projects
    for (const proj of projectsData) {
      proj.slug = slugify(proj.title, { lower: true, strict: true });
      await Project.create(proj);
    }
    console.log(`Seeded ${projectsData.length} Projects.`);

    // Seed Design Styles
    for (const style of designStylesData) {
      style.slug = slugify(style.name, { lower: true, strict: true });
      await DesignStyle.create(style);
    }
    console.log(`Seeded ${designStylesData.length} Design Styles.`);

    // Seed Reviews & Partners & Settings
    await Review.insertMany(reviewsData);
    await Partner.insertMany(partnersData);
    await SiteSetting.create({});

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
