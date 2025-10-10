const fs = require('fs');

// Read the swagger output file
const swaggerFile = './swagger_output.json';
const swagger = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

// Define proper examples for Trail fields
const trailExamples = {
  name: "Y Mountain Trail",
  location: "Provo, UT",
  distance_miles: 3.5,
  difficulty: "Moderate",
  type: "Hiking",
  elevation_gain_ft: 800,
  rating: 4.5
};

// Define proper examples for Wildlife Sighting fields
const wildlifeExamples = {
  species: "Mule Deer",
  location: "Rock Canyon, Provo, UT",
  date: "2025-10-07",
  time: "07:30",
  observer: "John Doe",
  count: 3,
  trailId: "507f1f77bcf86cd799439011"
};

// Function to replace "any" examples in parameters
function fixParameters(path, method) {
  const operation = swagger.paths[path][method];
  
  if (operation.parameters) {
    operation.parameters.forEach(param => {
      if (param.in === 'body' && param.schema && param.schema.properties) {
        const props = param.schema.properties;
        
        // Determine which example set to use based on the properties
        let examples = {};
        if (props.species || props.observer) {
          examples = wildlifeExamples;
        } else if (props.name || props.difficulty) {
          examples = trailExamples;
        }
        
        // Replace "any" with actual examples
        Object.keys(props).forEach(key => {
          if (props[key].example === "any" && examples[key]) {
            props[key].example = examples[key];
          }
        });
      }
    });
  }
}

// Iterate through all paths and methods to fix parameters
Object.keys(swagger.paths).forEach(path => {
  Object.keys(swagger.paths[path]).forEach(method => {
    fixParameters(path, method);
  });
});

// Write the fixed swagger file back
fs.writeFileSync(swaggerFile, JSON.stringify(swagger, null, 2));

console.log('✓ Swagger file fixed successfully!');
console.log('✓ All "any" examples replaced with proper values.');