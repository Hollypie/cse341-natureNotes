const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
  info: {
    title: 'Nature Notes API',
    description: 'API for managing trails logs, gear, and wildlife sightings',
  },
  host: 'cse341-naturenotes.onrender.com',
  schemes: ['https'],
  tags: [
    {
      name: 'Trails',
      description: 'Endpoints to manage hiking and cycling trails'
    },
    {
      name: 'Wildlife',
      description: 'Endpoints to manage wildlife sightings'
    },
    {
      name: 'Gear',
      description: 'Endpoints to manage hiking and camping gear'
    },
    {
      name: 'Hikers',
      description: 'Endpoints to manage hiker profiles'
    }
  ],
  definitions: {
    Trail: {
      name: "Y Mountain Trail",
      location: "Provo, UT",
      distance_miles: 3.5,
      difficulty: "Moderate",
      type: "Hiking",
      elevation_gain_ft: 800,
      rating: 4.7
    },
    WildlifeSighting: {
      species: "Mule Deer",
      location: "Rock Canyon, Provo, UT",
      date: "2025-10-07",
      time: "10:30 am",
      observer: "hollyb",
      count: 3,
      trailId: 1
    },
    Gear: {
      name: "Osprey Daylite Backpack",
      type: "Backpack",
      brand: "Osprey",
      weightOz: 16.2,
      category: "Hiking",
      condition: "Excellent",
      owner: "hollyb",
      purchaseDate: "2024-03-15",
      favorite: true,
      notes: "Lightweight and comfortable for short day hikes."
    },
    Hiker: {
      firstName: "Holly",
      lastName: "Briggs",
      username: "hollyb",
      email: "holly.briggs@example.com",
      location: "Orem, Utah",
      memberSince: "2024-03-05",
      isAdmin: true,
      trailCount: 12,
      bio: "Software engineering student who loves hiking and board games."
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
