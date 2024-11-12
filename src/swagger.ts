import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from './config.ts';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'YAJSC API',
      description: 'API endpoints for YAJSC app service documented on swagger',
      version: '0.0.1',
    },
    servers: [
      {
        url: `http://localhost:${config.port}/`,
        description: 'Local server',
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ['**/routes/*.ts'],
};
export const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express) {
  // Swagger Page
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  // Documentation in JSON format
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
