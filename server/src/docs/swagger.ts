import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

interface SwaggerOptions {
  swaggerDefinition: any;
  definition: any;
  apis: string[];
  encoding: string;
  failOnErrors: boolean;
  verbose: boolean;
  format: string;
}

export default function setupSwagger(app: Express) {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation - Super Store',
      version: '1.0.0',
    },
    components: {
      schemas: {
        UserInput: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
            avatar: { type: 'string' },
            role: { type: 'string' },
            isActive: { type: 'boolean' },
          },
          required: ['name', 'email', 'password', 'role'],
        },
      },
    },
  };

  const options: SwaggerOptions = {
    swaggerDefinition,
    definition: {},
    apis: ['./src/**/*.ts'],
    encoding: 'utf-8',
    failOnErrors: false,
    verbose: false,
    format: 'yaml',
  };

  const specs = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
