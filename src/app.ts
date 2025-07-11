import Fastify from 'fastify';

const app = Fastify();

app.get('/', async (request, reply) => {
  return { message: 'Hello, World!' };
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor está rodando em http://localhost:3000');
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};
start();


