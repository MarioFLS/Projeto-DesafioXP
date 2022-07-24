const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API de Investimento - Desafio XP',
      description: 'Uma Api que busca simular uma empresa de investimentos. Feito para o Desafio da XP',
      version: '1.0'
    },
    servers: [{
      url: 'http://localhost:3000',
      description: 'Servidor Local'
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/route.client.ts', './src/routes/route.asset.ts', './src/routes/route.investiment.ts']
};

export default swaggerConfig;