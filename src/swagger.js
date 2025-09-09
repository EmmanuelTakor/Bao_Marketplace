
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bao Marketplace API",
      version: "1.0.0",
      description:
        "Backend API for Bao Technologies & Travels marketplace platform. Supports user authentication and product management.",
      contact: {
        name: "Bao Technologies & Travels"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local Dev Server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/routes/*.js"], // paths to scan for annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
