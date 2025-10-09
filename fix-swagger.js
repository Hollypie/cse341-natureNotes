const fs = require('fs');
const path = require('path');

// Read the swagger output file
const swaggerPath = path.join(__dirname, 'swagger_output.json');
const swagger = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

// Update Trail definition with example
swagger.definitions.Trail = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Y Mountain Trail"
    },
    location: {
      type: "string",
      example: "Provo, UT"
    },
    distance_miles: {
      type: "number",
      example: 3.5
    },
    difficulty: {
      type: "string",
      example: "Moderate"
    },
    type: {
      type: "string",
      example: "Hiking"
    },
    elevation_gain_ft: {
      type: "number",
      example: 800
    },
    rating: {
      type: "number",
      example: 4.5
    }
  }
};

// Update WildlifeSighting definition with example
swagger.definitions.WildlifeSighting = {
  type: "object",
  properties: {
    species: {
      type: "string",
      example: "Mule Deer"
    },
    location: {
      type: "string",
      example: "Rock Canyon, Provo, UT"
    },
    date: {
      type: "string",
      example: "2025-10-07"
    },
    time: {
      type: "string",
      example: "08:30"
    },
    observer: {
      type: "string",
      example: "hollyb"
    },
    count: {
      type: "number",
      example: 3
    },
    trailId: {
      type: "string",
      example: "68e6abc12e7ccecfab50a123"
    }
  }
};

// Add Gear definition with example
swagger.definitions.Gear = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Osprey Daylite Backpack"
    },
    type: {
      type: "string",
      example: "Backpack"
    },
    brand: {
      type: "string",
      example: "Osprey"
    },
    weightOz: {
      type: "number",
      example: 16
    },
    category: {
      type: "string",
      example: "Hiking"
    },
    condition: {
      type: "string",
      example: "Excellent"
    },
    owner: {
      type: "string",
      example: "hollyb"
    },
    purchaseDate: {
      type: "string",
      example: "2024-03-15"
    },
    favorite: {
      type: "boolean",
      example: true
    },
    notes: {
      type: "string",
      example: "Lightweight and comfortable for short day hikes."
    }
  }
};

// Add Hiker definition with example
swagger.definitions.Hiker = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      example: "Holly"
    },
    lastName: {
      type: "string",
      example: "Briggs"
    },
    username: {
      type: "string",
      example: "hollyb"
    },
    email: {
      type: "string",
      example: "holly.briggs@example.com"
    },
    location: {
      type: "string",
      example: "Orem, Utah"
    },
    memberSince: {
      type: "string",
      example: "2024-03-05"
    },
    isAdmin: {
      type: "boolean",
      example: true
    },
    trailCount: {
      type: "number",
      example: 12
    },
    bio: {
      type: "string",
      example: "Software engineering student who loves hiking and board games."
    }
  }
};

// Add tags for all collections
if (!swagger.tags) {
  swagger.tags = [];
}

const requiredTags = [
  { name: "Trails", description: "Endpoints to manage hiking and cycling trails" },
  { name: "Wildlife", description: "Endpoints to manage wildlife sightings" },
  { name: "Gear", description: "Endpoints to manage hiking and camping gear" },
  { name: "Hikers", description: "Endpoints to manage hiker profiles" }
];

requiredTags.forEach(requiredTag => {
  const tagExists = swagger.tags.some(tag => tag.name === requiredTag.name);
  if (!tagExists) {
    swagger.tags.push(requiredTag);
  }
});

// Write the updated swagger file
fs.writeFileSync(swaggerPath, JSON.stringify(swagger, null, 2));

console.log('Swagger file updated successfully with all definitions (Trails, Wildlife, Gear, and Hikers)!');