const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const PORT = process.env.PORT || 5001;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'M7 RestApi',
      version: '1.0.0',
      description: 'API documentation for M7 RestApi',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}/api-docs/`);
    });
  })
  .catch(err => console.error(err));

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('nombre_de_tu_coleccion').find({}).toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from MongoDB Atlas' });
  }
});