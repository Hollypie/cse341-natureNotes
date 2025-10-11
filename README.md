# Nature Notes API 🌲

A RESTful API for managing hiking trails, outdoor gear, and wildlife sightings. Perfect for outdoor enthusiasts who want to track their adventures and share their experiences with the community.

## Data Models 📊

### Users 👤
Track user profiles and preferences for a personalized outdoor experience.

| Field | Type | Description |
|-------|------|-------------|
| `username` | string | Unique identifier for the user |
| `email` | string | Unique email address |
| `passwordHash` | string | Secured password (OAuth/bcrypt) |
| `experienceLevel` | string | User's hiking expertise (beginner/intermediate/advanced) |
| `preferredTerrain` | array | Types of trails preferred (forest, mountain, paved, etc.) |
| `favoriteTrails` | array | References to favorite trail IDs |
| `createdAt` | date | Account creation timestamp |

### Trails 🏃‍♂️
Comprehensive trail information for hikers and cyclists.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Trail name |
| `location` | string | Geographic location or coordinates |
| `type` | string | Trail type (hiking/cycling/multi-use) |
| `difficulty` | string | Trail difficulty (easy/moderate/hard) |
| `length` | number | Trail length in miles/kilometers |
| `elevationGain` | number | Total elevation gain |
| `description` | string | Detailed trail description |

### Gear 🎒
Keep track of your outdoor equipment.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Equipment name |
| `type` | string | Category (hiking/cycling/camping) |
| `purchaseDate` | date | When the item was acquired |
| `lastUsed` | date | Most recent usage date |
| `condition` | string | Current state (new/good/worn/broken) |
| `ownerId` | reference | Link to user who owns the gear |
| `notes` | string | Additional information |

### Wildlife Sightings 🦌
Document wildlife encounters during your outdoor adventures.

| Field | Type | Description |
|-------|------|-------------|
| `trailId` | reference | Link to trail where sighting occurred |
| `species` | string | Animal species name |
| `quantity` | number | Number of animals spotted |
| `date` | date | Sighting date |
| `location` | string | Specific location (coordinates/description) |
| `notes` | string | Additional observations |
| `photoUrl` | string | Link to wildlife photo |

## API Documentation 📘

For detailed API documentation and testing, visit the `http://localhost:3000/api-docs` endpoint when running the application.

### Features ✨

- RESTful endpoints for all resources
- OAuth authentication
- Swagger/OpenAPI documentation
- Input validation
- Proper error handling
- MongoDB integration

### Authentication 🔐

- OAuth implementation for secure user authentication
- Protected routes for data modification
- Public access for read operations

## Development 🛠️

### Prerequisites

- Node.js
- MongoDB
- npm, pnpm or yarn

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (.env)
4. Start the development server: `npm run dev`
5. Browse to `http://localhost:3000/` to authenticate

## License 📜

This project is licensed under the MIT License - see the LICENSE file for details.
