const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API de Investimento - Desafio XP',
      description: 'Uma Api que busca simular uma empresa de investimentos. Feito para o Desafio da XP',
      version: '1.0'
    },
    server: [{
      url: 'http://localhost:3000',
      description: 'Servidor Local'
    }]
  },
  apis: ['./src/routes/route.client', './src/routes/route.asset', './src/routes/route.investiment']
};

export default swaggerConfig;