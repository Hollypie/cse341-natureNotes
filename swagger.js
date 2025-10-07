const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/trails.js',
  './routes/wildlife.js'
];

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
    }
  ],
  definitions: {
    Trail: {
      name: "Y Mountain Trail",
      type: "Hiking",
      difficulty: "Moderate",
      length: 3.5,       // miles
      elevationGain: 800, // feet
      location: "Provo, UT",
      description: "Popular trail with great views of Provo and BYU."
    },
    WildlifeSighting: {
      species: "Mule Deer",
      count: 3,
      location: "Rock Canyon, Provo, UT",
      date: "2025-10-07",
      notes: "Saw a small group near the trailhead early morning."
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
