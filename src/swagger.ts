import swaggerJsdoc from 'swagger-jsdoc'
// @ts-ignore
import swaggerUi from 'swagger-ui-express'
import {Express} from "express";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'YAJSC API',
      description: "API endpoints for YAJSC app service documented on swagger",
      contact: {
        name: "Pavlo Hlazkov",
        email: "anotherskulk@gmail.com",
        url: "https://github.com/hlazkov"
      },
      version: '0.0.1',
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local server"
      },
    ]
  },
  // looks for configuration in specified directories
  apis: ['./router/*.js'],
}
export const swaggerSpec = swaggerJsdoc(options)

export function swaggerDocs(app: Express) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}